import {useMessages, useLocale} from 'next-intl';
import type common from '../../messages/fr/common.json';
import type navigation from '../../messages/fr/navigation.json';
import type home from '../../messages/fr/home.json';
import type services from '../../messages/fr/services.json';
import type portfolio from '../../messages/fr/portfolio.json';
import type about from '../../messages/fr/about.json';
import type contact from '../../messages/fr/contact.json';
import type legal from '../../messages/fr/legal.json';
import type errors from '../../messages/fr/errors.json';
import type metadata from '../../messages/fr/metadata.json';
import {isLocale} from './paths';

export type Content = {common:typeof common;navigation:typeof navigation;home:typeof home;services:typeof services;portfolio:typeof portfolio;about:typeof about;contact:typeof contact;legal:typeof legal;errors:typeof errors;metadata:typeof metadata};

// next-intl supplies request-scoped messages in Server Components and context
// in interactive components. JSON content is typed without shipping type imports.
export function useContent(): Content { return useMessages() as unknown as Content; }
export function useAppLocale() { const locale=useLocale(); if (!isLocale(locale)) throw new Error('Unsupported locale'); return locale; }
