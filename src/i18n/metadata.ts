import type {Metadata} from 'next';
import type {AppLocale} from './routing';
import {localizedPath} from './paths';
import {site} from '@/lib/site-config';
import fr from '../../messages/fr/metadata.json';
import en from '../../messages/en/metadata.json';
import frErrors from '../../messages/fr/errors.json';
import enErrors from '../../messages/en/errors.json';

export function alternates(path:string,locale:AppLocale) {
  return {canonical:localizedPath(path,locale),languages:{'fr-CA':localizedPath(path,'fr'),'en-CA':localizedPath(path,'en'),'x-default':localizedPath(path,'fr')}};
}
export function localizedMetadata(locale:AppLocale,path:string,content:{title:string;description:string;ogTitle?:string;ogDescription?:string}):Metadata {
  const m=locale==='en'?en:fr;
  const title=content.title.replace(/ \| Infotechs Solutions$/,'');
  return {title,description:content.description,keywords:m.keywords,alternates:alternates(path,locale),
    openGraph:{type:'website',title:content.ogTitle||`${title} | ${site.name}`,description:content.ogDescription||content.description,url:localizedPath(path,locale),siteName:site.name,locale:locale==='fr'?'fr_CA':'en_CA',alternateLocale:locale==='fr'?'en_CA':'fr_CA',images:[{url:'/images/hero-technology-workspace.png',width:1536,height:1024,alt:locale==='fr'?'Interfaces numériques modernes pour PME':'Modern digital interfaces for small businesses'}]},
    twitter:{card:'summary_large_image',title,description:content.description,images:['/images/hero-technology-workspace.png']}};
}
export function pageMetadata(locale:AppLocale,path:string,key:keyof typeof fr.pages):Metadata {
  const m=locale==='en'?en:fr;
  return localizedMetadata(locale,path,{description:m.siteDescription,...m.pages[key]});
}
export function notFoundMetadata(locale:AppLocale):Metadata {
  const m=(locale==='en'?enErrors:frErrors).notFound;
  return {title:{absolute:`${m.title.absolute.replace(/ \| Infotechs Solutions$/,'')} | ${site.name}`},description:m.description,alternates:{canonical:null,languages:{}},openGraph:{title:m.title.absolute,description:m.description},robots:{index:false,follow:true}};
}
