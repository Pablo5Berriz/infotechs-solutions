import {pageMetadata} from '@/i18n/metadata';
import {isLocale} from '@/i18n/paths';
import {notFound} from 'next/navigation';
export async function generateMetadata({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();return pageMetadata(locale,'/mentions-legales','legalNotice');}
import {LegalContent} from '@/components/legal-content';
export default function LegalPage(){return <LegalContent kind='legalNotice'/>;}
