import {renderToStaticMarkup as render} from 'react-dom/server';
import {NextIntlClientProvider} from 'next-intl';
import type {ReactNode} from 'react';
import fr_common from '../../messages/fr/common.json';
import fr_navigation from '../../messages/fr/navigation.json';
import fr_home from '../../messages/fr/home.json';
import fr_services from '../../messages/fr/services.json';
import fr_portfolio from '../../messages/fr/portfolio.json';
import fr_about from '../../messages/fr/about.json';
import fr_contact from '../../messages/fr/contact.json';
import fr_legal from '../../messages/fr/legal.json';
import fr_errors from '../../messages/fr/errors.json';
import fr_metadata from '../../messages/fr/metadata.json';
import en_common from '../../messages/en/common.json';
import en_navigation from '../../messages/en/navigation.json';
import en_home from '../../messages/en/home.json';
import en_services from '../../messages/en/services.json';
import en_portfolio from '../../messages/en/portfolio.json';
import en_about from '../../messages/en/about.json';
import en_contact from '../../messages/en/contact.json';
import en_legal from '../../messages/en/legal.json';
import en_errors from '../../messages/en/errors.json';
import en_metadata from '../../messages/en/metadata.json';

export const testMessages={fr:{common:fr_common,navigation:fr_navigation,home:fr_home,services:fr_services,portfolio:fr_portfolio,about:fr_about,contact:fr_contact,legal:fr_legal,errors:fr_errors,metadata:fr_metadata},en:{common:en_common,navigation:en_navigation,home:en_home,services:en_services,portfolio:en_portfolio,about:en_about,contact:en_contact,legal:en_legal,errors:en_errors,metadata:en_metadata}};
export function renderToStaticMarkup(node:ReactNode,locale:'fr'|'en'='fr'){return render(<NextIntlClientProvider locale={locale} timeZone='America/Toronto' messages={testMessages[locale]}>{node}</NextIntlClientProvider>);}
