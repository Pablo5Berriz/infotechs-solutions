import type {MetadataRoute} from 'next';
import {site} from '@/lib/site-config';
import {publicPaths,localizedPath} from '@/i18n/paths';
import {alternates} from '@/i18n/metadata';
export default function sitemap():MetadataRoute.Sitemap {return publicPaths.flatMap(path=>(['fr','en'] as const).map(locale=>({url:site.url+localizedPath(path,locale),changeFrequency:path==='/'?'weekly' as const:'monthly' as const,priority:path==='/'?1:0.7,alternates:{languages:Object.fromEntries(Object.entries(alternates(path,locale).languages).map(([language,url])=>[language,site.url+url]))}})));}
