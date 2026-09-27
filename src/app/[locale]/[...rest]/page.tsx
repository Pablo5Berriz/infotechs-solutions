import {notFound} from 'next/navigation';
import {isLocale} from '@/i18n/paths';
import {notFoundMetadata} from '@/i18n/metadata';
export async function generateMetadata({params}:{params:Promise<{locale:string}>}){const {locale}=await params;return notFoundMetadata(isLocale(locale)?locale:'fr');}
export default function UnknownPage(){notFound();}
