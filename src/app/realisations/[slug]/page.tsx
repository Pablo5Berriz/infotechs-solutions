import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/project-experience";
import { getPortfolioProject, portfolioProjects } from "@/lib/project-portfolio";
type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return portfolioProjects.map(({slug})=>({slug}))}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const project=getPortfolioProject(slug);if(!project)return{};return{title:project.seo.title,description:project.seo.description,alternates:{canonical:project.href},openGraph:{title:`${project.seo.title} | Infotechs Solutions`,description:project.seo.description,url:project.href}}}
export default async function ProjectDetailPage({params}:Props){const {slug}=await params;const project=getPortfolioProject(slug);if(!project)notFound();return <ProjectDetail project={project}/>}
