import{renderToStaticMarkup}from"@/test/render";import{describe,expect,it}from"vitest";import RealisationsPage,{generateMetadata}from"@/app/[locale]/realisations/page";
const metadata=await generateMetadata({params:Promise.resolve({locale:'fr'})});
import{portfolioProjects}from"@/lib/project-portfolio";const markup=renderToStaticMarkup(<RealisationsPage/>);
describe("index réalisations 002D",()=>{
it("rend un seul h1 et chaque concept publié",()=>{expect(markup.match(/<h1/g)).toHaveLength(1);for(const p of portfolioProjects){expect(markup).toContain(p.title);expect(markup).toContain(`href="${p.href}"`)}});
it("affiche un badge pour chaque projet",()=>{expect((markup.match(/Projet indépendant/g)??[])).toHaveLength(6)});
it("rend le CTA et les sections éditoriales",()=>{expect(markup).toContain('href="/fr/contact#devis"');expect(markup).toContain("Lecture par capacité");expect(markup).toContain("De l’hypothèse à une version vérifiable")});
it("publie une canonical et n’intègre ni Stitch ni résultats interdits",()=>{expect(metadata.alternates).toMatchObject({canonical:"/fr/realisations"});expect(markup).not.toMatch(/stitch|\+38|heures économisées|clients satisfaits/i)});
});
