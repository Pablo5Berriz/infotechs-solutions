import {notFound} from 'next/navigation';
import {ServiceDetail} from '@/components/service-experience';
import {getServiceOffering,getServiceOfferings} from '@/lib/service-offerings';
import {isLocale} from '@/i18n/paths';
import {localizedMetadata,notFoundMetadata} from '@/i18n/metadata';
type Props={params:Promise<{locale:string;slug:string}>};
export function generateStaticParams({params}:{params:{locale:string}}){if(!isLocale(params.locale))return [];return getServiceOfferings(params.locale).map(({slug})=>({slug}));}
export async function generateMetadata({params}:Props){const {locale,slug}=await params;if(!isLocale(locale))notFound();const item=getServiceOffering(slug,locale);return item?localizedMetadata(locale,item.href,item.seo):notFoundMetadata(locale);}
export default async function ServiceDetailPage({params}:Props){const {locale,slug}=await params;if(!isLocale(locale))notFound();const item=getServiceOffering(slug,locale);if(!item)notFound();return <ServiceDetail service={item}/>;}
