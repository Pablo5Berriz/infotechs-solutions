import type { AppLocale } from '@/i18n/routing';
import fr from '../../messages/fr/about.json';
import en from '../../messages/en/about.json';
export type AboutPrinciple = {id:string;title:string;description:string};
export type AboutMethodStep = {number:string;title:string;description:string};
export function getAboutContent(locale:AppLocale='fr') { const m=locale==='en'?en:fr;return {aboutPrinciples:Object.entries(m.principles).map(([id,p])=>({id,...p})),aboutMethod:Object.entries(m.method).map(([number,p])=>({number,...p})),aboutScope:{canDo:m.canDo,needsScoping:m.needsScoping}}; }
export const {aboutPrinciples,aboutMethod,aboutScope}=getAboutContent();
