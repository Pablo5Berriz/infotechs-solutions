// Production runtime evidence. No valid Contact POST and no external email.
import {writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
// Match the hostname passed to `next start --hostname localhost`.
// NextURL normalizes loopback IPs to localhost; a numeric listen hostname
// makes Next 16.3.4 classify same-server rewrites as external requests.
const base=process.env.I18N_QA_ORIGIN || 'http://localhost:3012';
const sitemap=await (await fetch(`${base}/sitemap.xml`)).text();
const urls=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
assert.equal(urls.length,34);
const records=[];
const meta=(html,key,value)=>[...html.matchAll(/<(?:meta|link)\b[^>]*>/g)].map(m=>m[0]).find(tag=>tag.includes(`${key}="${value}"`));
for(const path of urls){
  const response=await fetch(base+path,{redirect:'manual'}),html=await response.text();
  const locale=path.split('/')[1];
  const canonical=meta(html,'rel','canonical')?.match(/href="([^"]*)"/)?.[1];
  const description=meta(html,'name','description')?.match(/content="([^"]*)"/)?.[1];
  const title=html.match(/<title>(.*?)<\/title>/)?.[1];
  const h1=html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1].replace(/<[^>]*>/g,'');
  const lang=html.match(/<html[^>]*lang="([^"]*)"/)?.[1];
  const location=response.headers.get('location');
  assert.ok(!location || new URL(location,base).href!==new URL(path,base).href,`Canonical self-redirect: ${path}`);
  assert.equal(response.status,200,path);
  assert.equal(lang,`${locale}-CA`,path);
  assert.equal(new URL(canonical).pathname,path,path);
  assert.ok(description&&title&&h1,path);
  const alternates=[...html.matchAll(/<link\b[^>]*hrefLang="([^"]*)"[^>]*href="([^"]*)"[^>]*>/g)].map(m=>({lang:m[1],path:new URL(m[2]).pathname}));
  assert.equal(alternates.length,3,path);
  for(const alternate of alternates)assert.ok(urls.includes(alternate.path),JSON.stringify(alternate));
  const og=meta(html,'property','og:locale');
  assert.ok(og?.includes(`content="${locale}_CA"`),path);
  const anchors=[...html.matchAll(/<a\b[^>]*href="([^"]*)"[^>]*>/g)].map(m=>m[1]);
  const badLinks=anchors.filter(href=>href.startsWith('/')&&!href.startsWith(`/${locale}`)&&!alternates.some(a=>a.path===href));
  assert.deepEqual(badLinks,[],path);
  records.push({path,status:response.status,lang,title,description,h1,canonical,alternates,links:anchors.length});
}
const redirects=[];
for(const path of urls.filter(p=>p.startsWith('/fr/'))){
  const legacy=path.slice(3),r=await fetch(base+legacy,{redirect:'manual'});
  assert.equal(r.status,308,legacy);assert.equal(new URL(r.headers.get('location'),base).pathname,path,legacy);
  const final=await fetch(base+path,{redirect:'manual'});
  assert.equal(final.status,200,legacy);
  redirects.push({from:legacy,status:r.status,to:path,finalStatus:final.status});
}
const negotiation=[];
for(const [language,cookie,locale] of [['fr-CA','','fr'],['en-CA','','en'],['en','NEXT_LOCALE=fr','fr'],['fr','NEXT_LOCALE=en','en'],['','','fr']]){
  const r=await fetch(base+'/',{headers:{'accept-language':language,cookie},redirect:'manual'});
  assert.equal(r.status,307);assert.equal(new URL(r.headers.get('location'),base).pathname,`/${locale}`);
  negotiation.push({language,cookie,status:r.status,to:`/${locale}`});
}
const notFound=[];
for(const locale of ['fr','en'])for(const suffix of ['missing-i18n','missing.txt','services/missing-service']){
  const path=`/${locale}/${suffix}`,r=await fetch(base+path),html=await r.text();
  assert.equal(r.status,404,path);assert.ok(html.includes(`lang="${locale}-CA"`));
  // Serialized Flight messages are not proof of server-rendered page content.
  const initialHtml=html.replace(/<script\b[\s\S]*?<\/script>/gi,'');
  const heading=initialHtml.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1].replace(/<[^>]*>/g,'');
  assert.ok(heading?.includes(locale==='fr'?'Page introuvable':'Page not found'),`Missing localized SSR H1: ${path}`);
  assert.ok(!meta(html,'rel','canonical'));assert.ok(meta(html,'name','robots')?.includes('noindex'));
  notFound.push({path,status:r.status});
}
const api=await fetch(base+'/api/contact',{redirect:'manual'});assert.equal(api.status,405);
const invalid=await fetch(base+'/api/contact',{method:'POST',headers:{'content-type':'application/json','accept-language':'en'},body:'{}'});assert.equal(invalid.status,400);
const invalidPayload=await invalid.json();assert.equal(invalidPayload.message,'Check the information you entered.');
const robots=await fetch(base+'/robots.txt');assert.equal(robots.status,200);
const report={checkedAt:new Date().toISOString(),base,routes:records,redirects,negotiation,notFound,api:{get:api.status,invalidPost:invalid.status},robots:{status:robots.status,text:await robots.text()},sitemapUrls:urls.length};
writeFileSync(new URL('./runtime.json',import.meta.url),JSON.stringify(report,null,2));
console.log(`PASS: ${records.length} routes, ${redirects.length} legacy redirects, ${negotiation.length} root preferences, ${notFound.length} localized 404s, API and SEO.`);
