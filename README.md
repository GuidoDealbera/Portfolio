# Portfolio de Guido Dealbera

Sitio personal bilingüe (español e inglés): presentación, casos de estudio, recorrido y contacto. Rediseño completo sobre Next.js; el sitio anterior (Vite) sigue en `main` hasta el lanzamiento.

**Stack:** Next.js 16.4 (App Router, Cache Components), React 19, TypeScript, Tailwind CSS 4, Motion 14 y Zod 4. El formulario de contacto envía con Resend.

## Cómo correrlo

Requisito: Node.js 20.9 o superior.

```bash
npm install
npm run dev      # http://localhost:3000 (redirige a /es o /en según el navegador)
npm run lint
npm run build    # build de producción
npm run start    # sirve el build
```

### Variables de entorno

Copiá `.env.example` a `.env.local` (no se sube a Git).

| Variable | Para qué |
|---|---|
| `RESEND_API_KEY` | Clave de Resend. Sin clave, en desarrollo el mensaje se imprime en la consola; en producción el formulario avisa que no pudo enviar |
| `CONTACT_TO_EMAIL` | A dónde llegan los mensajes. Sin un dominio verificado en Resend, tiene que ser el email de la cuenta de Resend |
| `CONTACT_FROM` | Remitente. Vacío usa `Portfolio <onboarding@resend.dev>` |

En Vercel se cargan las mismas variables en Project Settings → Environment Variables.

## Dónde está cada cosa

| Qué | Dónde |
|---|---|
| Datos del perfil que no dependen del idioma: nombre, carrera, stack, canales de contacto, CV y foto | `src/content/site.ts` |
| Textos | `src/dictionaries/es.ts` (fuente de verdad) y `en.ts`. Si a `en.ts` le falta o le sobra una clave, no compila |
| Casos de estudio | `src/content/projects/`: un archivo por proyecto, con los dos idiomas. Cómo agregar uno: `src/content/projects/README.md` |
| Secciones de la home | `src/components/sections/` |
| Animaciones propias | `src/components/motion/`: revelado, listas que entran de a uno (`Stagger`), texto letra por letra, pizarrón en canvas… Conviene reutilizarlas antes de crear otras |
| Íconos | `src/components/ui/icons.tsx`: de interfaz (Lucide) y logos oficiales de GitHub, LinkedIn y WhatsApp, con la fuente de cada uno. Los botones los reciben con `icon` y `trailingIcon` |
| Formulario de contacto | `src/features/contact/`. `mailer.ts` es el único archivo que conoce a Resend |
| SEO: imágenes para compartir, JSON-LD | `src/features/seo/` y `opengraph-image.tsx` de cada ruta |
| Colores, tipografía y animaciones base | `src/app/globals.css` (tokens de la paleta Chalk, con sus contrastes medidos) |

El backlog vivo está en `PENDIENTES.md`.

## Decisiones que conviene conocer

- **Next.js está fijado en 16.4.0.** El 404 propio usa `globalNotFound`, que es experimental: si se actualiza Next, hay que revisar que siga funcionando. Antes de escribir código de Next, leer la guía local en `node_modules/next/dist/docs/` (lo pide `AGENTS.md`).
- **El idioma es un parámetro raíz** (`app/[lang]`, `next/root-params`). `src/proxy.ts`:
  - en `/`, elige el idioma: cookie, después `Accept-Language`, después español;
  - devuelve un 404 HTTP real para los casos de estudio que no existen.
- **Cache Components:** las páginas se generan como HTML estático. `new Date()` dentro de un componente rompe el build; por eso el footer usa `'use cache'`.
- **Colores sólo desde los tokens** de `globals.css`. La única excepción es el `theme-color` del viewport, que no puede leer CSS.
- **Accesibilidad:**
  - el contenido es visible sin JavaScript;
  - todo el movimiento se apaga con `prefers-reduced-motion`;
  - los objetivos táctiles miden al menos 40 px y el foco siempre se ve.
- **`vercel.json` declara Next.js:** el proyecto de Vercel se creó con el sitio anterior en Vite, y así cada deploy se construye con el framework correcto sin tocar la configuración del proyecto.

## Calidad

No hay framework de tests. Cada cambio se verifica con `lint` y `build`. La accesibilidad y el rendimiento se auditaron con axe-core, Lighthouse y navegadores reales; los resultados están en `PENDIENTES.md`, sección 7.

## Despliegue

Vercel construye un preview por cada push a `rediseno`. **Pushear `main` publica el sitio**: va recién después de revisar el preview.
