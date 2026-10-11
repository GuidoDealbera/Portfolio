import { portfolio } from "./portfolio";
import type { Project } from "./types";

/** El orden de este arreglo es el orden en la página. */
export const projects: readonly Project[] = [portfolio];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export type { Project, ProjectCopy } from "./types";
