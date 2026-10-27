# Cómo agregar un proyecto

Un proyecto es **un archivo** más **una línea** en `index.ts`. El resto de la
página (tarjeta, página del caso, imagen para compartir, sitemap) sale solo.

1. Copiá `portfolio.ts` como `<slug>.ts` y cambiá los datos. El tipo `Project`
   (en `types.ts`) te marca qué falta: `copy` pide **los dos idiomas**, y si
   falta uno el proyecto no compila. También pide `context` (Mecantronic,
   freelance o personal) y `status` (en producción, piloto, en desarrollo o
   prueba de concepto), que se muestran como etiquetas en la tarjeta y en el caso,
   y `updatedAt`, la fecha del último cambio como `"AAAA-MM-DD"`, que va al sitemap.
2. En `index.ts`, importalo y sumalo al arreglo `projects`. El orden del
   arreglo es el orden en la página.
3. Si tiene capturas, ponelas en `public/projects/<slug>/` (en WebP, sin datos
   personales a la vista) y completá `shots`, con el ancho y alto reales, el
   `alt` y el `caption` en los dos idiomas. La primera es la portada de la
   tarjeta y del caso; las demás van en la galería del final, y todas se pueden
   ampliar. Sin capturas se usa una portada generada.
4. Si las capturas necesitan una aclaración (por ejemplo, una parte del
   proyecto que no tiene pantallas), va en `shotsNote`, dentro de `copy`.

Un proyecto sin `links.repo` se muestra como privado, y no hace falta aclarar
nada más.

**Cuando cambies un caso** (texto o capturas), actualizá su `updatedAt`. Los
buscadores leen esa fecha en el sitemap para saber qué páginas volver a leer.
La home toma sola la más reciente entre la suya (`site.updatedAt`) y la de los
casos.

## Por qué archivos TypeScript y no Markdown

Se evaluó MDX. Se eligió TypeScript porque el tipo `Record<Locale, …>` garantiza
en compilación que ningún caso se publica sin traducir, y porque MDX con
Turbopack y Cache Components suma configuración y riesgo. Si más adelante un caso
necesita bloques de código o imágenes dentro del texto, se reevalúa.
