import * as rootParams from 'next/root-params';
import {notFound} from 'next/navigation';
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

// Chargement des bundles messages/<locale>/*.json par domaine fonctionnel.
// Un seul objet fusionné est exposé a next-intl (namespaces = noms de fichier).
async function loadMessages(locale: string) {
  const [
    common,
    navigation,
    home,
    services,
    portfolio,
    about,
    contact,
    legal,
    errors,
    metadata,
  ] = await Promise.all([
    import(`../../messages/${locale}/common.json`),
    import(`../../messages/${locale}/navigation.json`),
    import(`../../messages/${locale}/home.json`),
    import(`../../messages/${locale}/services.json`),
    import(`../../messages/${locale}/portfolio.json`),
    import(`../../messages/${locale}/about.json`),
    import(`../../messages/${locale}/contact.json`),
    import(`../../messages/${locale}/legal.json`),
    import(`../../messages/${locale}/errors.json`),
    import(`../../messages/${locale}/metadata.json`),
  ]);

  return {
    common: common.default,
    navigation: navigation.default,
    home: home.default,
    services: services.default,
    portfolio: portfolio.default,
    about: about.default,
    contact: contact.default,
    legal: legal.default,
    errors: errors.default,
    metadata: metadata.default,
  };
}

export default getRequestConfig(async ({ locale: override }) => {
  const requested = override ?? await rootParams.locale();
  if (!hasLocale(routing.locales, requested)) notFound();
  const locale = requested;

  return {
    locale,
    messages: await loadMessages(locale),
  };
});