import Link from 'next/link';
import {BrandMark} from '@/components/brand/BrandMark';
import './page-loading.css';

/** Structural placeholders only. Never render protected content in a loading state. */
export function PageLoading({full=false,admin=false,label='Loading your next page'}:{full?:boolean;admin?:boolean;label?:string}){
 return <div className={'camp-page-loading'+(full?' camp-page-loading-full':'')+(admin?' camp-page-loading-admin':'')} role="status" aria-live="polite" aria-busy="true"><div className="camp-route-progress" aria-hidden="true"/>
  {full&&<header className="camp-loading-brand"><Link href="/" aria-label="EnglishCamp home"><BrandMark size={34}/><strong>EnglishCamp</strong></Link><span>{admin?'Admin workspace':'Your learning space'}</span></header>}
  <div className="camp-loading-body"><span className="sr-only">{label}</span><div className="camp-loading-heading" aria-hidden="true"><i/><i/><i/></div><div className="camp-loading-cards" aria-hidden="true">{[0,1,2].map(n=><div key={n}><i className="camp-loading-art"/><i/><i/><i/></div>)}</div><div className="camp-loading-content" aria-hidden="true"><div><i/><i/><i/></div>{[0,1,2].map(n=><div key={n}><i/><i/></div>)}</div><p className="camp-loading-caption" aria-hidden="true"><span/>{label}</p></div>
 </div>;
}
