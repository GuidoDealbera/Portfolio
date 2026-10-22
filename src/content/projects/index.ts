import { durrieu } from "./durrieu";
import { esconecta } from "./esconecta";
import { grupoOesteSeguros } from "./grupo-oeste-seguros";
import { mecanicaDealbera } from "./mecanica-dealbera";
import { planMiCasa } from "./plan-mi-casa";
import { portfolio } from "./portfolio";
import { temploDeLasAsintotas } from "./templo-de-las-asintotas";
import type { Project } from "./types";

/**
 * El orden de este arreglo es el orden en la página (decidido el 2026-10-21):
 * alterna trabajo con clientes y proyectos propios, y arranca por el de mayor
 * alcance full stack. Con una cantidad impar, el primero ocupa el ancho completo.
 */
export const projects: readonly Project[] = [
  durrieu,
  mecanicaDealbera,
  temploDeLasAsintotas,
  planMiCasa,
  esconecta,
  grupoOesteSeguros,
  portfolio,
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export type { Project, ProjectContext, ProjectCopy, ProjectShot, ProjectStatus } from "./types";
