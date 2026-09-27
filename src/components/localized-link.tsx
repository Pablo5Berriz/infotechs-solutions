import NextLink from 'next/link';
import type {ComponentProps} from 'react';
import {useAppLocale} from '@/i18n/content';
import {localizedPath} from '@/i18n/paths';

export default function LocalizedLink({href, ...props}: Omit<ComponentProps<typeof NextLink>, 'href'> & {href:string}) {
  const locale=useAppLocale();
  return <NextLink {...props} href={localizedPath(href, locale)} />;
}
