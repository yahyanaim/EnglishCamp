require('./register.cjs');
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {publicAccessPath}=require('../cloudflare/access.ts');
const read=f=>fs.readFileSync(f,'utf8');

test('F07/#36: the app runs on Next.js 16 and React 19, and dependency audits block pull requests',()=>{
 const pkg=require('../package.json');
 assert.match(pkg.dependencies.next,/^\^16\./);
 assert.match(pkg.dependencies.react,/^\^19\./);
 assert.match(pkg.dependencies['react-dom'],/^\^19\./);
 assert.equal(pkg.scripts.lint,'eslint src');
 assert.ok(fs.existsSync('eslint.config.mjs')&&!fs.existsSync('.eslintrc.json'),'ESLint flat config replaces next lint');
 assert.ok(!read('next.config.mjs').includes('eslint:'),'Next.js 16 no longer reads an eslint option');
 const checks=read('.github/workflows/pull-request-checks.yml');
 assert.match(checks,/- name: Audit production dependencies\n\s+run: npm audit --omit=dev --audit-level=high/);
 assert.ok(!checks.includes('continue-on-error'));
});

test('dynamic routes await their params, as Next.js 15+ requires',()=>{
 for(const [file,names] of [['src/app/levels/[id]/page.tsx','{ id }'],['src/app/levels/[id]/lessons/[lessonId]/page.tsx','{ id, lessonId }'],['src/app/exercises/[lessonId]/page.tsx','{ lessonId }']]){
  const s=read(file);
  assert.match(s,/params: Promise</,file);
  assert.equal((s.match(new RegExp(`const ${names.replace(/[{}]/g,'\\$&')} = await params;`,'g'))||[]).length,2,file);
 }
 assert.match(read('src/app/quiz/[levelId]/page.tsx'),/params instanceof Promise \? use\(params\) : params/);
 assert.match(read('scripts/build-cloudflare.cjs'),/export default async function Page\(props:\{params:Promise<\{levelId:string\}>\}\)\{const params=await props\.params;return <QuizPage params=\{params\}\/>;\}/);
});

test('per-segment RSC files follow their page: public pages stay public, learner pages stay gated',()=>{
 for(const path of ['/__next._tree.txt','/__next.__PAGE__.txt','/invite/__next._tree.txt','/invite/__next.invite.__PAGE__.txt','/membership/__next._full.txt','/admin/login/__next._tree.txt'])assert.equal(publicAccessPath(path),true,path);
 for(const path of ['/dashboard/__next._tree.txt','/levels/band4-5/__next._full.txt','/admin/dashboard/__next._tree.txt','/invite/../dashboard/__next._tree.txt','/invite%2f..%2fdashboard/__next._tree.txt','/__next._tree.txt/x'])assert.equal(publicAccessPath(path),false,path);
});
