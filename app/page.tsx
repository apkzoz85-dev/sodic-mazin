import ProjectPage, { projectMetadata, projectViewport } from "@/components/ProjectPage";
import { sodicEast } from "@/lib/projects/sodic-east";

export const metadata = projectMetadata(sodicEast);
export const viewport = projectViewport(sodicEast);

export default function Home() {
  return <ProjectPage p={sodicEast} />;
}
