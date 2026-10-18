import ProjectPage, { projectMetadata, projectViewport } from "@/components/ProjectPage";
import { theEstates } from "@/lib/projects/the-estates";

export const metadata = projectMetadata(theEstates);
export const viewport = projectViewport(theEstates);

export default function TheEstates() {
  return <ProjectPage p={theEstates} />;
}
