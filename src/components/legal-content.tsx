import {Fragment} from 'react';
import Link from '@/components/localized-link';
import {useContent} from '@/i18n/content';
import {site} from '@/lib/site-config';

type Section = {heading:string;paragraphs:string[];list?:string[];paragraphsAfterList?:string[]};
export function LegalContent({kind}:{kind:'legalNotice'|'privacy'}) {
  const {legal}=useContent();
  const page=legal[kind];
  const linkClass='font-semibold text-purple-300 underline underline-offset-4';
  function rich(text:string) {
    return text.split(/(\{\w+\}|\*\*[^*]+\*\*)/).map((part,index)=><Fragment key={index}>{
      part==='{siteName}' ? site.name :
      part==='{contactLink}' ? <Link className={linkClass} href='/contact#devis'>{page.contactLinkText}</Link> :
      part==='{privacyLink}' ? <Link className={linkClass} href='/confidentialite'>{legal.legalNotice.privacyLinkText}</Link> :
      part==='{caiLink}' ? <a className={linkClass} href='https://www.cai.gouv.qc.ca/' rel='noreferrer'>{legal.privacy.caiLinkText}</a> :
      part.startsWith('**') ? <strong className='text-text-100'>{part.slice(2,-2)}</strong> : part
    }</Fragment>);
  }
  return <div className='bg-bg-950 text-text-100'><article className='mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8'>
    <p className='font-mono text-xs uppercase tracking-[.2em] text-purple-300'>{page.eyebrow}</p>
    <h1 className='mt-4 text-4xl font-semibold tracking-tight sm:text-5xl'>{page.title}</h1>
    <p className='mt-5 max-w-3xl text-lg leading-8 text-text-400'>{rich(page.intro)}</p>
    {kind==='privacy' && <p className='mt-4 text-sm text-text-400'>{legal.privacy.effectiveDate}</p>}
    <div className='mt-12 space-y-10 leading-7 text-text-400'>{(page.sections as Section[]).map(section=><section key={section.heading} className='border-t border-bg-800 pt-8'>
      <h2 className='text-2xl font-semibold text-text-100'>{section.heading}</h2>
      {section.paragraphs.map((p,i)=><p className='mt-4' key={i}>{rich(p)}</p>)}
      {section.list && <ul className='mt-4 list-disc space-y-2 pl-6'>{section.list.map(p=><li key={p}>{p}</li>)}</ul>}
      {section.paragraphsAfterList?.map((p,i)=><p className='mt-4' key={i}>{rich(p)}</p>)}
    </section>)}</div>
  </article></div>;
}
