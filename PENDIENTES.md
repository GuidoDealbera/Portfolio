# Rediseño del portfolio — pendientes

Rama de trabajo: `rediseno` · El sitio actual sigue vivo en `main`.
Stack: Next 16.4 · React 19 · TypeScript · Tailwind 4 · Motion 14 · Paleta Chalk.

---

## 1. Lo que necesito de vos

Esto bloquea secciones enteras. Lo marcado `PENDIENTE` en `src/content/site.ts` sale de acá.

- [ ] **MD de proyectos.** Por cada uno: problema, tu rol exacto, decisiones técnicas, resultado, qué se puede mostrar, fechas y estado
- [ ] Años de experiencia (el sitio dice 5)
- [ ] Empleador actual y desde cuándo (el sitio dice Mecantronic)
- [ ] ¿La agenda freelance está abierta de verdad? (el hero lo anuncia)
- [ ] Fechas del recorrido: trabajo actual, freelance, SoyHenry, Profesorado
- [ ] Dominio: seguir en `guidodealbera-dev.vercel.app` o comprar `guidodealbera.dev`
- [ ] CV actualizado (el actual es de noviembre 2024)
- [ ] Foto: ¿va alguna? Las de `public/legacy/fotos` son recortes sobre cyan; si va, conviene una nueva
- [ ] Fuentes: ¿quedan Poppins + Nunito Sans, o unificamos en una?
- [ ] Inglés: ¿ES/EN desde el lanzamiento o en una segunda etapa?

## 2. Estructura

- [ ] Header: logo, navegación, blur al scrollear, menú mobile accesible
- [ ] Footer con año dinámico — con `cacheComponents`, `new Date()` rompe el build: va con `'use cache'` + `cacheLife('days')`
- [ ] Componente `Button` (primario, secundario, texto) — hoy las clases viven sueltas en el hero
- [ ] Página 404

## 3. Secciones de la home

- [x] Hero (versión de prueba; ajustar el texto cuando confirmes los datos de la sección 1)
- [ ] Marquesina del stack
- [ ] Trabajo seleccionado: grilla + cards con inclinación 3D — **bloqueado por el MD**
- [ ] Sobre mí + contadores
- [ ] Recorrido: línea de tiempo que se dibuja con el scroll — **necesita las fechas**
- [ ] Contacto

## 4. Casos de estudio

- [ ] Ruta `/proyectos/[slug]` con `generateStaticParams`
- [ ] Formato del contenido: elegir entre MDX y archivos TS tipados
- [ ] Metadata e imagen OG por proyecto
- [ ] Capturas nuevas de cada proyecto (las de `public/legacy/proyectos` son de 2023–2024)

## 5. Formulario de contacto

- [ ] Server Action + Resend + validación con Zod
- [ ] Cuenta de Resend y API key cargada en Vercel
- [ ] Protección antispam: honeypot + límite de envíos
- [ ] Estados visibles: enviando, enviado, error con instrucción de qué hacer

## 6. SEO y compartir

- [ ] Imagen Open Graph generada con `opengraph-image.tsx`, en estética Chalk
- [ ] `sitemap.ts` y `robots.ts`
- [ ] Datos estructurados JSON-LD de tipo `Person`
- [ ] Favicon y `apple-icon` propios (hoy está el de Next)
- [ ] Logo nuevo en SVG real (el `logo.svg` actual es una imagen raster de 38 KB)

## 7. Calidad

- [ ] Probar en celulares reales: rendimiento del canvas y que lo magnético no se active en táctil
- [ ] Auditoría de accesibilidad: teclado, lector de pantalla, foco visible
- [ ] Lighthouse ≥ 95 en las cuatro categorías
- [ ] Vercel Analytics + Speed Insights
- [ ] README nuevo (se borró el del template de Vite)
- [ ] Revisar `npm audit` cuando salga una versión nueva de `eslint-config-next` (hoy hay 5 alertas, todas en herramientas de desarrollo; ninguna llega al sitio)

## 8. Lanzamiento

- [ ] Preview deploy de `rediseno` en Vercel
- [ ] Revisión final juntos
- [ ] Merge a `main`
- [ ] Dominio nuevo + redirección desde el `vercel.app` (si se compra)
- [ ] Borrar de `public/legacy` todo lo que no se haya usado

## 9. Opcional, para después

- [ ] Versión en inglés
- [ ] Modo claro (la paleta Chalk ya lo tiene diseñado)
- [ ] Menú de comandos con ⌘K
- [ ] View transitions entre la home y los casos
- [ ] Componentes de shadcn/ui, sólo los que hagan falta: estaban en el plan, pero los dejé afuera de la fundación porque sus variables de color chocan con los tokens de Chalk

---

## Hecho

- [x] Análisis completo del sitio anterior y propuesta de rediseño
- [x] Comparación de paletas: Ink & Amber, Paper, Chalk → **elegida Chalk**
- [x] Prototipo de animaciones en HTML
- [x] Triage del sitio vivo en `main`: scroll por teclado, leak de listeners, loader falso, SEO, Open Graph, contraste, foco visible
- [x] Rama `rediseno` con Next 16 + TypeScript + Tailwind 4
- [x] Tokens de diseño Chalk con contrastes verificados
- [x] Fuentes con `next/font`: Poppins (títulos) + Nunito Sans (cuerpo)
- [x] Sistema de animación: revelado con blur, texto letra por letra, subrayado de tiza, contador, botones magnéticos, barra de progreso, grilla con parallax, pizarrón en canvas
- [x] Reduced motion y fallback sin JavaScript
- [x] Datos del perfil centralizados en `src/content/site.ts`
- [x] Metadata base del sitio
