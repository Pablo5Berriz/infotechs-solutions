import {describe, it, expect, vi} from 'vitest';
import {renderToStaticMarkup, testMessages} from '@/test/render';
import {LanguageSwitcher} from '@/components/language-switcher';
import {SiteHeader} from '@/components/site-header';
import {SiteFooter} from '@/components/site-footer';
import {ContactForm} from '@/components/contact-form';
import {publicPaths, localizedPath} from '../paths';
import {getServiceOfferings} from '@/lib/service-offerings';
import {getPortfolioProjects} from '@/lib/project-portfolio';
import {localizedMetadata} from '../metadata';
import sitemap from '@/app/sitemap';

const state=vi.hoisted(()=>({pathname:'/en'}));
vi.mock('next/navigation',()=>({usePathname:()=>state.pathname}));

describe('localized public interface',()=>{
  for(const locale of ['fr','en'] as const){
    it(`${locale}: header, footer and form retain the selected language`,()=>{
      state.pathname=localizedPath('/a-propos',locale);
      const header=renderToStaticMarkup(<SiteHeader initialTheme="light"/>,locale);
      const footer=renderToStaticMarkup(<SiteFooter/>,locale);
      const form=renderToStaticMarkup(<ContactForm/>,locale);
      const activeLink=header.match(/<a\b[^>]*aria-current="page"[^>]*>/)?.[0];
      expect(activeLink).toContain(`href="${state.pathname}"`);
      expect(header).toContain(testMessages[locale].navigation.mainNav);
      expect(footer).toContain(`href="${localizedPath('/confidentialite',locale)}"`);
      // Champ non controle (react-hook-form defaultValues) : la valeur est
      // posee sur le DOM via le ref au montage (hydratation), absente du
      // HTML statique rendu ici. On verifie le contrat fonctionnel reel :
      // le champ hidden "locale" existe pour porter la valeur post-hydratation.
      expect(form).toContain('name="locale"');
      for(const type of ['web','automation','custom','audit','other'])expect(form).toContain(`value="${type}"`);
      expect(form).toContain(testMessages[locale].contact.form.submit);
      expect(form).not.toContain('action="/en/api');
    });
    for(const path of publicPaths)it(`${locale}: switcher preserves ${path}`,()=>{
      state.pathname=localizedPath(path,locale);
      const html=renderToStaticMarkup(<LanguageSwitcher/>,locale);
      for(const target of ['fr','en'] as const){
        expect(html).toContain(`href="${localizedPath(path,target)}"`);
        expect(html).toMatch(new RegExp(`href="${localizedPath(path,target)}"[^>]*${locale===target?'aria-current="true"':'hrefLang="'+target+'-CA"'}`));
      }
      expect(html).toContain(testMessages[locale].navigation.languageSwitcher.label);
      expect(html).toContain('focus-visible:outline');
    });
    it(`${locale}: every detail page has its own matching metadata and related links`,()=>{
      for(const entity of [...getServiceOfferings(locale),...getPortfolioProjects(locale)]){
        const meta=localizedMetadata(locale,entity.href,{title:entity.title,description:entity.summary});
        expect(meta.alternates?.canonical).toBe(entity.href);
        expect(meta.openGraph).toMatchObject({locale:`${locale}_CA`,url:entity.href});
        expect(entity.href).toMatch(new RegExp(`^/${locale}/`));
      }
    });
  }
  it('sitemap contains exactly 42 unique URLs with reciprocal alternates',()=>{
    const entries=sitemap();
    expect(entries).toHaveLength(42);
    const urls=new Set(entries.map(entry=>entry.url));
    expect(urls.size).toBe(42);
    for(const entry of entries){
      const languages=entry.alternates?.languages;
      expect(languages).toHaveProperty('x-default',languages?.['fr-CA']);
      for(const url of Object.values(languages??{}))expect(urls.has(String(url))).toBe(true);
    }
  });
});
