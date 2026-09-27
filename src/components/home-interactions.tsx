"use client";

import {useContent} from "@/i18n/content";
import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Bot, Code2, Workflow } from "lucide-react";
import Link from "@/components/localized-link";


const featuredIdentities = [{id:'web',icon:Code2,href:'/services/creation-sites-web'},{id:'automation',icon:Workflow,href:'/services/automatisation-ia'},{id:'custom',icon:Bot,href:'/services/applications-web-sur-mesure'}];
export const featuredServices = featuredIdentities;

export function nextServiceIndex(current: number, command: "next" | "previous" | "home" | "end" | number) {
  if (typeof command === "number") return Math.max(0, Math.min(featuredServices.length - 1, command));
  if (command === "home") return 0;
  if (command === "end") return featuredServices.length - 1;
  const offset = command === "next" ? 1 : -1;
  return (current + offset + featuredServices.length) % featuredServices.length;
}

export function ServiceTabs({ initialActive = 0 }: { initialActive?: number }) {
  const m = useContent();

  const featuredServices = featuredIdentities.map((item,index)=>({...item,...m.home.featured[index]}));
  const [active, setActive] = useState(nextServiceIndex(0, initialActive));
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduceMotion = useReducedMotion();

  function selectWithKeyboard(command: "next" | "previous" | "home" | "end") {
    const next = nextServiceIndex(active, command);
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
      <div role="tablist" aria-label={m.home.servicesSection.eyebrow} className="grid content-start gap-2">
        {featuredServices.map((item, index) => (
          <button
            key={item.id}
            ref={(node) => { tabRefs.current[index] = node; }}
            id={`service-tab-${item.id}`}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-controls={`service-panel-${item.id}`}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                event.preventDefault();
                selectWithKeyboard("next");
              }
              if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                event.preventDefault();
                selectWithKeyboard("previous");
              }
              if (event.key === "Home") { event.preventDefault(); selectWithKeyboard("home"); }
              if (event.key === "End") { event.preventDefault(); selectWithKeyboard("end"); }
            }}
            className="flex min-h-14 items-center justify-between rounded-sm border border-bg-800 px-5 py-4 text-left font-display text-base font-semibold text-text-400 transition-colors hover:border-purple-400 hover:text-text-100 aria-selected:border-purple-500 aria-selected:bg-bg-900 aria-selected:text-text-100"
          >
            <span>{item.label}</span>
            <span className="font-mono text-xs text-purple-300">0{index + 1}</span>
          </button>
        ))}
      </div>
      <div className="min-h-[340px] overflow-hidden rounded-sm border border-bg-800 bg-bg-900 p-6 sm:p-8">
        {featuredServices.map((panel, index) => {
          const PanelIcon = panel.icon;
          const isActive = active === index;
          return <motion.div
            key={panel.id}
            id={`service-panel-${panel.id}`}
            role="tabpanel"
            aria-labelledby={`service-tab-${panel.id}`}
            hidden={!isActive}
            aria-hidden={!isActive}
            initial={reduceMotion ? undefined : false}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
          >
            <PanelIcon className="h-7 w-7 text-purple-300" aria-hidden="true" />
            <h3 className="mt-8 max-w-2xl text-2xl font-semibold leading-tight sm:text-3xl">{panel.title}</h3>
            <p className="mt-4 max-w-2xl leading-7 text-text-400">{panel.text}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
              {panel.points.map((point) => <li key={point} className="border-t border-bg-800 pt-3 text-sm text-text-100">{point}</li>)}
            </ul>
            <Link href={panel.href} className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-purple-300 hover:text-text-100">
              {m.common.exploreService} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </motion.div>;
        })}
      </div>
    </div>
  );
}

export function ProcessTimeline() {
  const m = useContent();

  const processSteps = m.home.process.map((p,i)=>[String(i+1).padStart(2,"0"),p.title,p.text]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 75%", "end 70%"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={sectionRef} className="relative mt-12">
      <div className="absolute bottom-0 left-[23px] top-0 w-px bg-bg-800 md:hidden" aria-hidden="true">
        <motion.div className="h-full w-full origin-top bg-purple-600" style={{ scaleY: reduceMotion ? 1 : scale }} />
      </div>
      <div className="absolute left-0 right-0 top-[23px] hidden h-px bg-bg-800 md:block" aria-hidden="true">
        <motion.div className="h-full w-full origin-left bg-purple-600" style={{ scaleX: reduceMotion ? 1 : scale }} />
      </div>
      <ol className="relative grid gap-8 md:grid-cols-5 md:gap-4">
        {processSteps.map(([number, title, text]) => (
          <li key={number} className="grid grid-cols-[48px_1fr] gap-4 md:block">
            <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-purple-500 bg-bg-950 font-mono text-xs text-purple-300">{number}</span>
            <div className="md:mt-8">
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-text-400">{text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
