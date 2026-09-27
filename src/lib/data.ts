import type {AppLocale} from '@/i18n/routing';
import fr from '../../messages/fr/home.json';
import en from '../../messages/en/home.json';
export function getHomeData(locale:AppLocale='fr') {const m=locale==='en'?en:fr;return {processSteps:m.process.map((p,i)=>[String(i+1).padStart(2,'0'),p.title,p.text] as const),whyUs:m.whyUs.map(p=>[p.title,p.text] as const)};}
export const {processSteps,whyUs}=getHomeData();
