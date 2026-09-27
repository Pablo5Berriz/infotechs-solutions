import {pageMetadata} from '@/i18n/metadata';
import {isLocale} from '@/i18n/paths';
import {notFound} from 'next/navigation';
export async function generateMetadata({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();return pageMetadata(locale,'/contact','contact');}
import {useContent, useAppLocale} from "@/i18n/content";

import Link from "@/components/localized-link";
import { ArrowDown, ArrowRight, Check, ClipboardList, MessageSquareText, Route } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import {getSiteConfig,site} from "@/lib/site-config";









export default function ContactPage() {
 const locale=useAppLocale();
 const siteConfig=getSiteConfig(locale);
  const m = useContent();

const preparationItems = [
  m.contact.page.prepItems["0"],
  m.contact.page.prepItems["1"],
  m.contact.page.prepItems["2"],
];
const nextSteps = [
  {
    number: "01",
    title: m.contact.page.nextSteps["0"].title,
    text: m.contact.page.nextSteps["0"].text,
    icon: ClipboardList,
  },
  {
    number: "02",
    title: m.contact.page.nextSteps["1"].title,
    text: m.contact.page.nextSteps["1"].text,
    icon: MessageSquareText,
  },
  {
    number: "03",
    title: m.home.cta.kicker,
    text: m.contact.page.nextSteps["2"].text,
    icon: Route,
  },
];
const contactFaq = [
  {
    question: m.contact.page.faq["0"].question,
    answer:
      m.contact.page.faq["0"].answer,
  },
  {
    question: m.contact.page.faq["1"].question,
    answer:
      m.contact.page.faq["1"].answer,
  },
  {
    question: m.contact.page.faq["2"].question,
    answer:
      m.contact.page.faq["2"].answer,
  },
  {
    question: m.contact.page.faq["3"].question,
    answer:
      m.contact.page.faq["3"].answer,
  },
];

  const { contact } = siteConfig;
  return (
    <>
      <section className="relative overflow-hidden border-b border-bg-800">
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(101,40,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(101,40,255,.08)_1px,transparent_1px)] [background-size:48px_48px]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-(--container-max) gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.12fr_.88fr] lg:items-end lg:px-8 lg:py-24">
          <div>
            <p className="font-mono text-xs uppercase tracking-[.2em] text-purple-300">{m.contact.page.eyebrow}</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-[-.035em] sm:text-5xl lg:text-6xl">
              {m.contact.page.title} </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-text-400">
              {m.contact.page.intro} </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#demande" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-purple-600 px-5 py-3 font-semibold text-[#f4f1ea]">
                {m.home.cta.submit} <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link href="/services" className="inline-flex min-h-11 items-center justify-center rounded-sm border border-bg-800 px-5 py-3 font-semibold hover:border-purple-400">
                {m.home.cta.explore} </Link>
            </div>
          </div>
          <aside className="border-l-2 border-purple-500 bg-bg-900/80 p-6 sm:p-8" aria-labelledby="contact-usage-title">
            <p className="font-mono text-xs uppercase tracking-[.2em] text-purple-300">{m.contact.page.usageEyebrow}</p>
            <h2 id="contact-usage-title" className="mt-4 text-2xl font-semibold">{m.contact.page.usageTitle}</h2>
            <p className="mt-4 leading-7 text-text-400">{m.contact.page.usageText}</p>
          </aside>
        </div>
      </section>

      <section id="demande" className="scroll-mt-24 border-b border-bg-800 py-16 sm:py-20">
        <div className="mx-auto grid max-w-(--container-max) gap-10 px-4 sm:px-6 lg:grid-cols-[.72fr_1.28fr] lg:px-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-[.2em] text-purple-300">{m.contact.page.prepEyebrow}</p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">{m.contact.page.prepTitle}</h2>
            <ul className="mt-7 space-y-4">
              {preparationItems.map((item) => (
                <li key={item} className="flex gap-3 leading-7 text-text-400">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-purple-300" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 border-t border-bg-800 pt-6 text-sm leading-6 text-text-400">
              <p className="font-semibold text-text-100">{site.name}</p>
              <dl className="mt-4 grid gap-4">
                <div><dt className="font-semibold text-text-100">{m.contact.page.businessAddressLabel}</dt><dd>{contact.address.streetAddress}<br />{contact.address.localityLabel}<br />{contact.address.natureLabel}</dd></div>
                <div><dt className="font-semibold text-text-100">{m.contact.page.phoneLabel}</dt><dd><a className="inline-flex min-h-11 items-center text-purple-300 hover:text-text-100" href={contact.phone.href}>{contact.phone.display}</a></dd></div>
                <div><dt className="font-semibold text-text-100">{m.contact.page.hoursLabel}</dt><dd>{contact.businessHours.daysLabel}<br />{contact.businessHours.hoursLabel}</dd></div>
              </dl>
              <p className="mt-4">{m.contact.page.channelNote}</p>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <section className="border-b border-bg-800 py-16 sm:py-20" aria-labelledby="after-request-title">
        <div className="mx-auto max-w-(--container-max) px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs uppercase tracking-[.2em] text-purple-300">{m.contact.page.afterEyebrow}</p>
          <h2 id="after-request-title" className="mt-4 text-3xl font-semibold sm:text-4xl">{m.contact.page.afterTitle}</h2>
          <div className="mt-10 grid gap-px bg-bg-800 lg:grid-cols-3">
            {nextSteps.map(({ number, title, text, icon: Icon }) => (
              <article key={number} className="bg-bg-950 p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-purple-300">{number}</span>
                  <Icon className="h-6 w-6 text-purple-300" aria-hidden="true" />
                </div>
                <h3 className="mt-8 text-xl font-semibold">{title}</h3>
                <p className="mt-3 leading-7 text-text-400">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-bg-800 py-16 sm:py-20" aria-labelledby="contact-faq-title">
        <div className="mx-auto grid max-w-(--container-max) gap-10 px-4 sm:px-6 lg:grid-cols-[.65fr_1.35fr] lg:px-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-[.2em] text-purple-300">{m.contact.page.faqEyebrow}</p>
            <h2 id="contact-faq-title" className="mt-4 text-3xl font-semibold sm:text-4xl">{m.contact.page.faqTitle}</h2>
          </div>
          <div className="divide-y divide-bg-800 border-y border-bg-800">
            {contactFaq.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-semibold marker:content-none">
                  {item.question}<span className="text-purple-300 group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="max-w-2xl pb-2 pr-8 leading-7 text-text-400">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-(--container-max) px-4 sm:px-6 lg:px-8">
          <div className="rounded-sm bg-purple-600 px-6 py-10 text-[#f4f1ea] sm:px-10 lg:px-12 lg:py-12">
            <p className="font-mono text-xs uppercase tracking-[.2em]">{m.contact.page.finalKicker}</p>
            <h2 className="mt-4 max-w-4xl text-3xl font-semibold sm:text-4xl">{m.contact.page.finalTitle}</h2>
            <p className="mt-4 max-w-2xl leading-7 text-white/85">{m.contact.page.finalText}</p>
            <a href="#demande" className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-sm bg-bg-950 px-5 py-3 font-semibold text-text-100">
              {m.navigation.primaryCta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
