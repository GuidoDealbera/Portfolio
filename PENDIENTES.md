# Rediseño del portfolio — pendientes

Rama de trabajo: `rediseno` · El sitio actual sigue vivo en `main`.
Stack: Next 16.4 · React 19 · TypeScript · Tailwind 4 · Motion 14 · Paleta Chalk.

---

## 1. Lo que necesito de vos

Lo que bloquea o mejora secciones. Los datos confirmados ya están cargados en `src/content/site.ts`.

- [ ] **MD de proyectos** (estimado: semana del 12 de octubre). Por cada uno: problema, tu rol exacto, decisiones técnicas, resultado, qué se puede mostrar, fechas y estado
- [x] **CV actualizado** (2026-10-21). Sale de `~/Proyectos/CV` (fuente única, compatible con ATS, tres variantes en ES y EN). El general en español reemplaza a `public/cv-guido-dealbera.pdf`, que ya enlaza el botón; el inglés queda en `public/cv-guido-dealbera-en.pdf` y el botón por idioma se conecta en la fase de textos
- [ ] **Qué hacés en Mecantronic y en tus proyectos freelance**, en una o dos frases. Hoy el recorrido dice sólo "Desarrollo de software en relación de dependencia" y "Proyectos independientes para clientes", porque es lo único que sé con certeza
- [ ] **Revisar la redacción de los textos.** Son borrador y sólo afirman lo que me confirmaste. Mirá en especial el título de Sobre mí ("casi profesor de matemáticas"), el subtítulo del hero y todo el inglés (`src/dictionaries/`)
- [ ] Foto: va, pero te la pido cuando la use — hoy no hay ninguna en la home. Las de `public/legacy/fotos` son recortes sobre fondo cyan
- [ ] ¿Querés una cifra de "proyectos entregados" junto a los años de experiencia? Si sí, necesito el número real
- [x] Años de experiencia: 3,5
- [x] Empleador: Mecantronic desde abril 2025
- [x] Agenda freelance: siempre abierta
- [x] Fechas del recorrido: Mecantronic (abr 2025–hoy), freelance (30/05/2023–hoy), SoyHenry (30/01–15/05/2023), Profesorado (2015–dic 2026)
- [x] Dominio: sigue `guidodealbera-dev.vercel.app`; migrar a `guidodealbera.dev` cuando haya presupuesto
- [x] Fuentes: Poppins + Nunito Sans
- [x] Inglés: ES/EN desde el lanzamiento

## 2. Estructura

- [x] Header: logo, navegación, blur al scrollear, selector de idioma, menú móvil accesible (disclosure, cierra con Escape)
- [x] Footer con año dinámico — con `cacheComponents`, `new Date()` rompe el build: va con `'use cache'` + `cacheLife('days')`
- [x] `ButtonLink` (primario, secundario, texto)
- [x] `Button` para `<button>` real
- [x] Página 404 (por idioma)
- [x] Enlace "saltar al contenido" para teclado

## 2b. Idiomas (ES/EN)

- [x] Rutas `/es` y `/en` con `[lang]` y parámetro raíz (`next/root-params`)
- [x] Proxy que elige idioma: cookie → `Accept-Language` → español. Verificado con 11 casos
- [x] Diccionarios tipados: `en.ts` no compila si le falta una clave de `es.ts`
- [x] `hreflang`, canonical y `og:locale` por idioma
- [x] Selector de idioma que conserva la página y recuerda la elección
- [ ] Revisión del inglés por vos (lo escribí yo)
- [ ] Traducir los casos de estudio cuando lleguen

## 3. Secciones de la home

- [x] Hero con datos reales
- [x] Marquesina del stack
- [ ] Trabajo seleccionado: grilla + cards con inclinación 3D — **bloqueado por el MD**. Hoy hay una sección provisoria que enlaza a GitHub, para reemplazar
- [x] Sobre mí: texto, contador de años con decimales por idioma, stack agrupado
- [x] Recorrido: línea de tiempo que se dibuja con el scroll
- [x] Contacto: formulario más canales directos (mail, WhatsApp, LinkedIn)

## 4. Casos de estudio

- [x] Ruta `/[lang]/projects/[slug]` con `generateStaticParams`
- [x] Formato del contenido: archivos TypeScript tipados, un archivo por proyecto con los dos idiomas adentro (decisión y motivos en `src/content/projects/README.md`)
- [x] Metadata, `hreflang`, imagen Open Graph y sitemap por proyecto
- [x] Grilla de tarjetas en la home con inclinación 3D, y página del caso con problema, decisiones y resultado
- [x] 404 de verdad (con el código HTTP correcto) para un proyecto inexistente, y página 404 propia y bilingüe para cualquier URL sin ruta
- [ ] **Revisar el caso "Este portfolio"** (`src/content/projects/portfolio.ts`): lo escribí yo, con hechos medidos durante el rediseño, para poder probar toda la estructura. Editalo o borralo cuando llegue tu MD
- [ ] **Pasar tus proyectos** desde el MD: cada uno es un archivo nuevo más una línea en `index.ts`
- [ ] Capturas nuevas de cada proyecto, en `public/projects/<slug>.png` (las de `public/legacy/proyectos` son de 2023–2024)
- [ ] Decidir qué hacer con `public/legacy/`: si ninguna captura se reutiliza, borrar la carpeta
- [ ] `global-not-found` es una opción **experimental** de Next. Está fijada en 16.4.0; si se actualiza Next, revisar que el 404 siga funcionando

## 5. Formulario de contacto

- [x] Server Action con validación en Zod (`src/features/contact/`)
- [x] Envío con Resend, aislado en `mailer.ts`: cambiar de proveedor es reescribir ese único archivo
- [x] Campo trampa contra bots (honeypot)
- [x] Estados visibles: enviando, enviado, error con instrucción de qué hacer, y el foco va al primer campo con error
- [x] Variables de entorno: `.env.local` (tuyo, ignorado por Git) y `.env.example` (documentado)
- [x] Cuenta de Resend creada y variables cargadas en `.env.local`
- [ ] **Probar un envío real**: `npm run dev`, mandar un mensaje desde el formulario y confirmar que llega. `CONTACT_TO_EMAIL` tiene que ser el email con el que creaste la cuenta de Resend
- [ ] Cargar las 3 variables en Vercel (Project Settings → Environment Variables) antes de publicar: `.env.local` no viaja
- [ ] Opcional: verificar un dominio en Resend para enviar desde un remitente propio. Hoy se envía desde `onboarding@resend.dev` hacia tu propio email, que alcanza para un formulario de contacto
- [ ] Límite de envíos por visitante: necesita un almacén compartido (por ejemplo Upstash), porque la memoria del servidor no sirve en Vercel. Hoy el tope lo pone el plan de Resend
- [ ] Cuando `main` pase al sitio nuevo, desactivar o regenerar las claves de EmailJS: el id del servicio, el de la plantilla y la public key están en el historial público del repo

## 6. SEO y compartir

- [x] Imagen Open Graph por idioma, generada en el build con la estética Chalk (los colores salen de `globals.css`, no están duplicados)
- [x] `sitemap.xml` con las dos versiones de idioma y sus `hreflang`, y `robots.txt`
- [x] Datos estructurados JSON-LD de tipo `Person`
- [x] Favicon (32 px) y `apple-icon` (180 px) propios con el monograma GD; se eliminó el de Next
- [ ] Probar cómo se ve el link al compartirlo en LinkedIn y WhatsApp una vez publicado (cachean la imagen: se refresca con sus depuradores de links)
- [ ] Logo nuevo en SVG real: el `logo.svg` y el `logo.png` de `public/` son del sitio viejo y ya no se usan; borrarlos o reemplazarlos
- [ ] `lastModified` en el sitemap: hoy se omite porque `new Date()` no corre en el prerender; se puede sumar con una fecha fija por proyecto cuando existan

## 7. Calidad

- [x] Auditoría automatizada con axe-core (WCAG 2.2 AA) en la home en español e inglés, el caso y el 404: 0 violaciones
- [x] Teclado: el primer Tab cae en "Saltar al contenido", el orden es lógico, todo tiene anillo de foco visible y no hay trampas; el header ya no tapa lo enfocado (`scroll-padding-top`)
- [x] Objetivos táctiles de al menos 40 px de alto (logo, selector de idioma, footer, "volver")
- [x] Menú móvil, selector de idioma, `prefers-reduced-motion` y sin JavaScript verificados en navegador real (Edge y Chrome), y navegación por toque en celular emulado
- [x] La primera pantalla se ve completa al cargar, sin scrollear, en 720, 768, 900 y 1080 px de alto y en celular
- [x] Lighthouse: Accesibilidad 100, Buenas prácticas 100 y SEO 100 en las cuatro páginas; rendimiento 100 en escritorio
- [ ] **Lighthouse en celular simulado: rendimiento 93–94 (la meta era ≥ 95) con un LCP simulado de 3,1 s**, constante entre corridas. El LCP que mide el navegador sin simulación es de 0,2 s. No pude determinar qué fija el número simulado; probé quitar la dependencia de la hidratación en la entrada del hero y optimizar el canvas, y no lo movieron. Ver si vale la pena seguir o aceptarlo
- [ ] **Escuchar el sitio con un lector de pantalla real** (NVDA o VoiceOver): lo automático detecta reglas, no si resulta entendible
- [ ] **Probar en un teléfono real**: cómo se siente el canvas y por qué, en la emulación de celular, el navegador deja tres precargas duplicadas que nunca cierran (y se cancelan con `ERR_ABORTED` al volver al tope). La navegación funciona igual y no hay errores del servidor, pero no pude fijar la causa
- [ ] El contraste de texto lo midió axe con el canvas y la cuadrícula del fondo ocultos (son decorativos, de opacidad ≤ 20%), porque con ellos axe no puede calcular el fondo. Los pares de colores de la paleta sí están calculados a mano
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
- [x] Internacionalización ES/EN completa, verificada en el servidor de producción
- [x] Header, footer, 404, hero, marquesina, sobre mí, recorrido y contacto v1
- [x] Canales de contacto como dato único: agregar una red social es una línea en `site.ts`
- [x] Cero colores fuera de los tokens (salvo el `theme-color` de la meta tag, que no puede leer CSS)
- [x] Formulario de contacto probado de punta a punta contra el servidor, en español e inglés: validación, valores conservados, trampa para bots, éxito, y rechazo del proveedor
- [x] SEO: imagen para compartir por idioma, sitemap con `hreflang`, robots, JSON-LD, íconos propios
- [x] Estructura de proyectos (un archivo por caso, dos idiomas obligatorios), página del caso y primer caso
- [x] 404 con código HTTP real y página propia bilingüe
- [x] Auditoría en navegador real: 5 defectos encontrados y corregidos que ninguna herramienta automática había mostrado (botones del hero invisibles en notebooks de 768 px, hero sin aire inferior, título sin espacios al copiarlo, íconos redirigidos por el proxy, foco tapado por el header)
- [x] Canvas del pizarrón optimizado: con la CPU 4× más lenta, el JavaScript en reposo bajó de 13,7% a 7,7% del hilo principal
