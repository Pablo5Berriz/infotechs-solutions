import {renderToStaticMarkup} from "react-dom/server";import{describe,expect,it}from"vitest";import{ProjectBreadcrumb,ProjectCard,ProjectDetail}from"@/components/project-experience";import{portfolioProjects}from"@/lib/project-portfolio";
const project=portfolioProjects[0];
describe("expérience projets 002D",()=>{
it("rend le badge permanent et un lien explicite sur la carte",()=>{const m=renderToStaticMarkup(<ProjectCard project={project} index={0}/>);expect(m).toContain("CONCEPT DÉMONSTRATIF");expect(m).toContain(`href="${project.href}"`);expect(m).toContain("Explorer le concept")});
it("rend un breadcrumb accessible",()=>{const m=renderToStaticMarkup(<ProjectBreadcrumb project={project}/>);expect(m).toContain('aria-label="Fil d’Ariane"');expect(m).toContain('aria-current="page"');expect(m).toContain('href="/realisations"')});
it("rend un détail avec un h1, le statut, le CTA et les sections essentielles",()=>{const m=renderToStaticMarkup(<ProjectDetail project={project}/>);expect(m.match(/<h1/g)).toHaveLength(1);expect(m).toContain("CONCEPT DÉMONSTRATIF");expect(m).toContain('href="/contact#devis"');for(const text of ["Problèmes explorés","Approche proposée","Éléments démontrés","Limites connues","Concepts associés"])expect(m).toContain(text)});
it("rend deux projets associés sans auto-référence",()=>{const m=renderToStaticMarkup(<ProjectDetail project={project}/>);const section=m.slice(m.indexOf("Concepts associés"));expect((section.match(/Explorer le concept/g)??[])).toHaveLength(2);expect(section).not.toContain(`href="${project.href}"`)});
});
