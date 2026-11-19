"use client";
import {useMemo,useState} from 'react';
import {Button} from '@/components/ui/shadcn/button';
import {Input} from '@/components/ui/shadcn/input';
import {SelectField} from '@/components/ui/shadcn/select-field';
import {PageLoading} from '@/components/ui/PageLoading';
import {AdminHeading,MetricScope} from './AdminPresentation';
import {AdminFeedback,AdminRefresh,AdminStatus,adminRequest,useAdminResource} from './AdminControls';
import {CEFR_LEVELS} from '@/data/placement/cefr';

type Kind='reading'|'listening';
type LibraryRow={id:string;kind:Kind;title:string;level:string;defaultLevel:string;status:'published'|'hidden';defaultStatus:string;questions:number;completions:number};
type ItemRow={id:string;kind:Kind;status:'draft'|'published';payload:any;errors:string[];updatedAt:number;completions:number};
type Editing={id?:string;kind:Kind;text:string;errors:string[];notice:string};

const templates:Record<Kind,object>={
 reading:{title:'',level:'A2',category:'Daily life',paragraphs:['First English paragraph.','Second English paragraph.'],glossary:[{word:'paragraph',ar:'فقرة',def:'A group of sentences about one idea.'}],
  questions:[{type:'multiple-choice',skill:'main-idea',prompt:'What is the text mainly about?',choices:['Correct answer','Distractor','Distractor'],correct:0,evidence:'Copy exact words from the passage',feedback:'Why this answer is right.'},
   {type:'true-false',skill:'detail',prompt:'A statement to judge.',correct:false,evidence:'Copy exact words from the passage',feedback:'Why.'},
   {type:'short-answer',skill:'detail',prompt:'A question with a short answer?',answers:['answer'],evidence:'Copy exact words from the passage',feedback:'Why.'}]},
 listening:{title:'',description:'',level:'B1',topic:'',seconds:90,sourceUrl:'https://learningenglish.voanews.com/a/0000000.html',audioUrl:'https://voa-audio.voanews.eu/vle/2024/01/01/example.mp3',transcript:'Optional excerpt copied from the VOA lesson page.',words:[{word:'phrase',arabic:'عبارة',example:'An example sentence.'}],
  questions:[{type:'multiple-choice',skill:'main-idea',prompt:'What is the recording mainly about?',choices:['Correct answer','Distractor','Distractor'],correct:0,evidence:'What in the recording supports this',feedback:'Why.'},
   {type:'true-false',skill:'detail',prompt:'A statement to judge.',correct:true,evidence:'Supporting words',feedback:'Why.'},
   {type:'gap-fill',skill:'detail',prompt:'Complete: The speaker says ___ .',answers:['word'],evidence:'Supporting words',feedback:'Why.'}]},
};
const date=(seconds:number)=>new Date(seconds*1000).toLocaleString(undefined,{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'});

export function AdminContent(){
 const{data,error,busy,reload}=useAdminResource<{library:LibraryRow[];items:ItemRow[]}>('content');
 const[kind,setKind]=useState<'all'|Kind>('all'),[query,setQuery]=useState(''),[failure,setFailure]=useState(''),[working,setWorking]=useState('');
 const[url,setUrl]=useState(''),[importNote,setImportNote]=useState(''),[editing,setEditing]=useState<Editing|null>(null);
 const library=useMemo(()=>(data?.library||[]).filter(r=>(kind==='all'||r.kind===kind)&&(!query||r.title.toLowerCase().includes(query.toLowerCase()))),[data,kind,query]);
 const items=useMemo(()=>(data?.items||[]).filter(r=>kind==='all'||r.kind===kind),[data,kind]);
 async function run(id:string,action:string,body:object,after?:()=>void){
  if(working)return;setWorking(id);setFailure('');
  try{await adminRequest(action,{body});after?.();reload();}catch(e){setFailure((e as Error).message);}finally{setWorking('');}
 }
 const awaiting=(data?.library||[]).filter(r=>r.defaultStatus==='review'&&r.status!=='published');
 /** Publishes every bundled lesson still awaiting its first review, after the administrator has read them. */
 async function publishAwaiting(){
  if(working||!window.confirm(`Publish ${awaiting.length} lessons? Read them first: they become visible to every learner.`))return;setWorking('bulk');setFailure('');
  try{for(const r of awaiting)await adminRequest('content-state',{body:{id:r.id,kind:r.kind,status:'published',level:r.level===r.defaultLevel?null:r.level}});reload();}catch(e){setFailure((e as Error).message);reload();}finally{setWorking('');}
 }
 async function importVoa(e:React.FormEvent){
  e.preventDefault();if(working)return;setWorking('import');setFailure('');setImportNote('');
  try{const r=await adminRequest<{id:string;payload:object;audioFound:boolean}>('content-import',{body:{url}});setUrl('');
   setImportNote(r.audioFound?'Draft created with the VOA title, summary and MP3. Listen, add duration, level, words and questions, then publish.':'Draft created. No VOA MP3 was found automatically; add the audio address from the lesson page before publishing.');
   setEditing({id:r.id,kind:'listening',text:JSON.stringify(r.payload,null,2),errors:[],notice:''});reload();
  }catch(e){setFailure((e as Error).message);}finally{setWorking('');}
 }
 async function save(publish:boolean){
  if(!editing||working)return;let payload:unknown;
  try{payload=JSON.parse(editing.text);}catch{setEditing({...editing,errors:['The lesson is not valid JSON. Check commas and quotation marks.'],notice:''});return;}
  setWorking('editor');
  try{
   const saved=await adminRequest<{id:string;errors:string[]}>('content-save',{body:{...(editing.id?{id:editing.id}:{}),kind:editing.kind,payload}});
   if(publish){try{await adminRequest('content-publish',{body:{id:saved.id,published:true}});setEditing(null);reload();return;}catch(e){setEditing({...editing,id:saved.id,errors:[(e as Error).message],notice:''});reload();return;}}
   setEditing({...editing,id:saved.id,errors:saved.errors,notice:saved.errors.length?'Draft saved. Resolve the issues below before publishing.':'Draft saved and ready to publish.'});reload();
  }catch(e){const err=e as Error;setEditing({...editing,errors:[err.message],notice:''});}finally{setWorking('');}
 }
 return <div className="admin-stack admin-insights"><AdminHeading section="content"><AdminRefresh busy={busy} onClick={reload}/></AdminHeading><AdminFeedback error={error||failure}/>
  {!data?<PageLoading admin label={error?'Content is unavailable. Use Refresh to retry.':'Loading learning content'}/>:<>
   <div className="admin-filters"><Input aria-label="Search lessons" placeholder="Search lessons" value={query} onChange={e=>setQuery(e.target.value)}/>
    <SelectField aria-label="Lesson type" value={kind} onValueChange={v=>setKind(v as typeof kind)}><option value="all">Reading & listening</option><option value="reading">Reading</option><option value="listening">Listening</option></SelectField>
    <Button variant="outline" onClick={()=>setEditing({kind:'reading',text:JSON.stringify(templates.reading,null,2),errors:[],notice:''})}>New reading passage</Button>
   </div>
   <section className="admin-panel"><div className="admin-panel-heading"><div><h2>Import a VOA Learning English lesson</h2><p>Creates an unpublished draft from one article address. Nothing reaches learners until you review and publish it.</p></div></div>
    <form className="admin-filters" onSubmit={importVoa}><Input aria-label="VOA article address" placeholder="https://learningenglish.voanews.com/a/….html" value={url} onChange={e=>setUrl(e.target.value)} inputMode="url"/><Button type="submit" disabled={!url.trim()||!!working}>{working==='import'?'Importing…':'Import draft'}</Button></form>
    {importNote&&<p role="status">{importNote}</p>}
   </section>
   {editing&&<section className="admin-panel" aria-labelledby="content-editor"><div className="admin-panel-heading"><div><h2 id="content-editor">{editing.id?`Edit ${editing.id}`:`New ${editing.kind} lesson`}</h2><p>Plain text only. Every question needs evidence copied from the passage{editing.kind==='listening'?' or transcript':''}. Saving a published lesson returns it to draft for review.</p></div><Button variant="outline" onClick={()=>setEditing(null)}>Close</Button></div>
    <label className="sr-only" htmlFor="content-json">Lesson content</label>
    <textarea id="content-json" spellCheck={false} value={editing.text} onChange={e=>setEditing({...editing,text:e.target.value})} rows={22} style={{width:'100%',fontFamily:'var(--font-mono,monospace)',fontSize:12,lineHeight:1.6,padding:12,border:'1px solid var(--admin-border)',borderRadius:12,background:'var(--admin-soft)',color:'var(--color-text-primary)'}}/>
    {editing.notice&&<p role="status">{editing.notice}</p>}
    {editing.errors.length>0&&<ul role="alert" className="admin-feedback">{editing.errors.map(m=><li key={m}>{m}</li>)}</ul>}
    <div className="admin-title-actions" style={{marginTop:12}}><Button variant="outline" disabled={!!working} onClick={()=>void save(false)}>{working==='editor'?'Saving…':'Save draft'}</Button><Button disabled={!!working} onClick={()=>void save(true)}>Save & publish</Button></div>
   </section>}
   <section className="admin-panel"><div className="admin-panel-heading"><div><h2>Drafts & administrator lessons</h2><p>{items.length} lessons · imported and newly written content.</p></div></div>
    {items.length?<div className="admin-table-wrap"><table><thead><tr><th>Lesson</th><th>Type</th><th>Status</th><th>Review</th><th>Completions</th><th>Actions</th></tr></thead><tbody>{items.map(r=><tr key={r.id}>
     <td><strong>{r.payload?.title||r.id}</strong><small>{r.id} · updated {date(r.updatedAt)}</small></td><td>{r.kind}</td>
     <td><AdminStatus tone={r.status==='published'?'good':'quiet'}>{r.status==='published'?'Published':'Draft'}</AdminStatus></td>
     <td>{r.errors.length?<small>{r.errors.length} issue{r.errors.length>1?'s':''}: {r.errors[0]}</small>:<small>Ready</small>}</td><td>{r.completions}</td>
     <td><Button variant="outline" onClick={()=>setEditing({id:r.id,kind:r.kind,text:JSON.stringify(r.payload,null,2),errors:r.errors,notice:''})}>Edit</Button>
      <Button variant="outline" disabled={!!working||(r.status==='draft'&&r.errors.length>0)} onClick={()=>void run(r.id,'content-publish',{id:r.id,published:r.status!=='published'})}>{r.status==='published'?'Unpublish':'Publish'}</Button></td>
    </tr>)}</tbody></table></div>:<p>No drafts yet. Import a VOA lesson or write a new reading passage.</p>}
   </section>
   <section className="admin-panel"><div className="admin-panel-heading"><div><h2>Bundled library</h2><p>Lessons shipped with EnglishCamp. Publish, hide or re-level them without changing learner records.</p></div>{awaiting.length>0&&<Button disabled={!!working} onClick={()=>void publishAwaiting()}>{working==='bulk'?'Publishing…':`Publish ${awaiting.length} awaiting review`}</Button>}</div>
    <div className="admin-table-wrap"><table><thead><tr><th>Lesson</th><th>Type</th><th>Level</th><th>Status</th><th>Questions</th><th>Completions</th><th>Action</th></tr></thead><tbody>{library.map(r=><tr key={r.kind+r.id}>
     <td><strong>{r.title}</strong><small>{r.id}{r.defaultStatus==='review'?' · awaiting first review':''}</small></td><td>{r.kind}</td>
     <td><SelectField aria-label={`Level for ${r.title}`} value={r.level} onValueChange={level=>void run(r.id,'content-state',{id:r.id,kind:r.kind,status:r.status,level:level===r.defaultLevel?null:level})}>{CEFR_LEVELS.map(l=><option key={l} value={l}>{l}{l===r.defaultLevel?' (default)':''}</option>)}</SelectField></td>
     <td><AdminStatus tone={r.status==='published'?'good':'warning'}>{r.status==='published'?'Published':r.defaultStatus==='review'?'Awaiting review':'Hidden'}</AdminStatus></td><td>{r.questions}</td><td>{r.completions}</td>
     <td><Button variant="outline" disabled={!!working} onClick={()=>void run(r.id,'content-state',{id:r.id,kind:r.kind,status:r.status==='published'?'hidden':'published',level:r.level===r.defaultLevel?null:r.level})}>{working===r.id?'Saving…':r.status==='published'?'Hide':'Publish'}</Button></td>
    </tr>)}</tbody></table></div>
   </section>
   <MetricScope><p>Completions count online learners who finished a lesson’s questions at least once. Guest progress stays on the device.</p><p>VOA imports read only the canonical VOA article page and VOA’s podcast feed. Levels are your teaching judgement: VOA’s own level labels are not converted automatically.</p></MetricScope>
  </>}
 </div>;
}
