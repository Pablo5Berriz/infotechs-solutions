'use client';
import {usePathname} from 'next/navigation';
import {useAppLocale, useContent} from '@/i18n/content';
import {switchLocalePath} from '@/i18n/paths';
import {routing, type AppLocale} from '@/i18n/routing';

function rememberLocale(target:AppLocale) {
  document.cookie=`NEXT_LOCALE=${target}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol==='https:'?'; Secure':''}`;
}

export function LanguageSwitcher({onSelect}:{onSelect?:()=>void}) {
  const locale=useAppLocale(), pathname=usePathname();
  const {navigation}=useContent();
  return <nav aria-label={navigation.languageSwitcher.label} className='flex items-center gap-1'>
    {routing.locales.map(target=><a key={target} href={switchLocalePath(pathname,target)} lang={target==='fr'?'fr-CA':'en-CA'} hrefLang={target==='fr'?'fr-CA':'en-CA'}
      aria-current={locale===target?'true':undefined} onClick={event=>{
        rememberLocale(target);
        onSelect?.();
        // Query/fragment are browser state; retain them without a hydration-dependent href.
        event.currentTarget.href=switchLocalePath(pathname+location.search+location.hash,target);
      }}
      className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm px-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400 ${locale===target?'text-purple-300 underline underline-offset-4':'text-text-400 hover:text-text-100'}`}>
      {target.toUpperCase()}
    </a>)}
  </nav>;
}
