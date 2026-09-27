import {describe,it,expect} from 'vitest';
import {NextRequest} from 'next/server';
import {unstable_doesMiddlewareMatch} from 'next/experimental/testing/server';
import proxy,{config} from '@/proxy';
import {publicPaths,localizedPath,switchLocalePath,isLocale} from '../paths';
import {serviceSlugs,projectSlugs} from '../slugs';
import {alternates} from '../metadata';
import {createContactSchema} from '@/lib/contact-schema';
import {buildContactEmail} from '@/lib/contact-delivery';
import {readFileSync} from 'node:fs';

describe('i18n foundations before App Router migration',()=>{
  it('only accepts FR and EN',()=>{expect(['fr','en'].every(isLocale)).toBe(true);expect(['FR','en-CA','de',null].some(isLocale)).toBe(false);});
  for(const table of [serviceSlugs,projectSlugs])it('has unique reversible entity slugs',()=>{
    for(const locale of ['fr','en'] as const)expect(new Set(Object.values(table).map(x=>x[locale])).size).toBe(Object.keys(table).length);
  });
  for(const path of publicPaths)it(`maps both ways: ${path}`,()=>{
    const fr=localizedPath(path,'fr'),en=localizedPath(path,'en');
    expect(switchLocalePath(fr,'en')).toBe(en);expect(switchLocalePath(en,'fr')).toBe(fr);
    expect(localizedPath(en,'en')).toBe(en);expect(en).not.toMatch(/\/en\/(fr|en)/);
    expect(alternates(path,'en')).toEqual({canonical:en,languages:{'fr-CA':fr,'en-CA':en,'x-default':fr}});
  });
  it('preserves fragments and queries',()=>expect(switchLocalePath('/fr/services/creation-sites-web?from=home#details','en')).toBe('/en/services/website-creation?from=home#details'));
  for(const url of ['/api/contact','/_next/static/x.js','/images/test.png','/favicon.ico','/sitemap.xml','/robots.txt'])it(`excludes ${url}`,()=>expect(unstable_doesMiddlewareMatch({config,nextConfig:{},url})).toBe(false));
  for(const url of ['/','/fr','/en','/en/about','/en/missing.txt'])it(`matches ${url}`,()=>expect(unstable_doesMiddlewareMatch({config,nextConfig:{},url})).toBe(true));
  for(const [language,cookie,expected] of [['fr-CA','','fr'],['en-CA','','en'],['en','NEXT_LOCALE=fr','fr'],['fr','NEXT_LOCALE=en','en'],['','','fr']])it(`root negotiation ${language} ${cookie}`,()=>{
    const response=proxy(new NextRequest('https://example.com/',{headers:{'accept-language':language,cookie}}));
    expect(response.status).toBe(307);expect(response.headers.get('location')).toBe(`https://example.com/${expected}`);
  });
  for(const locale of ['fr','en'])it(`explicit ${locale} wins`,()=>{
    const response=proxy(new NextRequest(`https://example.com/${locale}`,{headers:{'accept-language':locale==='fr'?'en':'fr',cookie:`NEXT_LOCALE=${locale==='fr'?'en':'fr'}`}}));
    expect(response.headers.get('location')).toBeNull();expect(response.headers.get('x-middleware-request-x-next-intl-locale')).toBe(locale);
  });
  it('has strict message key parity',()=>{
    function keys(value:unknown,prefix=''):string[]{return value&&typeof value==='object'?Object.entries(value).flatMap(([k,v])=>keys(v,prefix+'.'+k)):[prefix];}
    for(const name of ['common','navigation','home','services','portfolio','about','contact','legal','errors','metadata']){
      const load=(locale:string)=>JSON.parse(readFileSync(`messages/${locale}/${name}.json`,'utf8'));
      expect(keys(load('fr')).sort(),name).toEqual(keys(load('en')).sort());
    }
  });
  const valid={locale:'fr',projectType:'web',name:'Test user',email:'test@example.com',message:'A sufficiently detailed test request.',consent:true};
  it('requires an explicit valid locale and stable type',()=>{
    expect(createContactSchema().safeParse(valid).success).toBe(true);
    for(const locale of [undefined,'de','fr-CA'])expect(createContactSchema().safeParse({...valid,locale}).success).toBe(false);
    expect(createContactSchema().safeParse({...valid,projectType:'Site web'}).success).toBe(false);
  });
  it('localizes validation and email without inferring free text',()=>{
    expect(createContactSchema('en').safeParse({...valid,name:''}).error?.issues[0].message).toBe('Enter your name.');
    for(const locale of ['fr','en'] as const){const values=createContactSchema(locale).parse({...valid,locale});const email=buildContactEmail(values,'reference-test');expect(email.subject).toMatch(locale==='fr'?/^Nouvelle demande/:/^New request/);expect(email.text).toContain('reference-test');expect(email.text).toContain('web');expect(email.text).toContain(locale);expect(email.text).toContain(valid.message);}
  });
});
