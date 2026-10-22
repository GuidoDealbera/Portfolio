# Rediseño del portfolio — pendientes

Rama de trabajo: `rediseno` · El sitio actual sigue vivo en `main`.
Stack: Next 16.4 · React 19 · TypeScript · Tailwind 4 · Motion 14 · Paleta Chalk.

Plan de lanzamiento validado el 2026-10-21: `~/Proyectos/PLAN_ACCION_PORTFOLIO.md` (fuera del repo). Las decisiones están en su sección 4b. Orden de trabajo: CVs (hecho) → casos de estudio → textos del perfil → formulario y preview → lanzamiento. Cada fase termina con commit y push a `rediseno`.

---

## 1. Lo que necesito de vos

Lo que bloquea o mejora secciones. Los datos confirmados ya están cargados en `src/content/site.ts`.

- [x] **MD de proyectos** (2026-10-21): es `~/Proyectos/INVENTARIO_PORTFOLIO.md`, fuera del repo, con tu rol medido con git en cada proyecto. Los casos y su orden están en la sección 4 de este archivo
- [x] **CV actualizado** (2026-10-21). Sale de `~/Proyectos/CV` (fuente única, compatible con ATS, tres variantes en ES y EN). El general en español reemplaza a `public/cv-guido-dealbera.pdf`, que ya enlaza el botón; el inglés queda en `public/cv-guido-dealbera-en.pdf` y el botón por idioma se conecta en la fase de textos
- [x] **Qué hacés en Mecantronic y en tus proyectos freelance**: los textos están aprobados (plan, sección 7) y se cargan en la fase de textos. Suman un tramo nuevo: NovoGas, empleador aparte (ago. 2023 – abr. 2025)
- [ ] **Revisar la redacción de los textos.** Son borrador y sólo afirman lo que me confirmaste. Mirá en especial el título de Sobre mí ("casi profesor de matemáticas"), el subtítulo del hero y todo el inglés (`src/dictionaries/`)
- [x] **Frase del hero** (2026-10-21): "No se trata de escribir código. Se trata de construir lo que realmente importa.", con tu texto, tus cuatro fortalezas y "Construyamos algo que valga la pena" como botón principal
- [x] Foto: se lanza sin foto, pero con el lugar preparado en "Sobre mí" para sumarla después
- [x] Cifra de "proyectos entregados": no va
- [x] Nombres de clientes: reales, con permiso para todos (Durrieu, Plan Mi Casa, Tu Casa en Cuotas, ESConecta, Discera)
- [x] Mecantronic es remoto. Proyectos de Mecantronic: Plan Mi Casa, Tu Casa en Cuotas, ESConecta, Durrieu y Discera. Freelance: Mecánica Dealbera y Grupo Oeste Seguros
- [x] Años de experiencia: 3,5
- [x] Empleador: Mecantronic desde abril 2025
- [x] Agenda freelance: siempre abierta
- [x] Fechas del recorrido: Mecantronic (abr 2025–hoy), NovoGas (ago 2023–abr 2025), freelance (30/05/2023–hoy), SoyHenry (30/01–15/05/2023; Teaching Assistant mar–may 2023), Profesorado (2015–dic 2026)
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
- [x] Traducir los casos de estudio (2026-10-21). Falta tu revisión del inglés

## 3. Secciones de la home

- [x] Hero con datos reales
- [x] Marquesina del stack
- [x] Trabajo seleccionado: grilla + cards con inclinación 3D. `work.tsx` ya muestra las `ProjectCard`; lo que falta es el contenido (sección 4)
- [x] Sobre mí: texto, contador de años con decimales por idioma, stack agrupado
- [x] Recorrido: línea de tiempo que se dibuja con el scroll
- [x] Contacto: formulario más canales directos (mail, WhatsApp, LinkedIn)

Fase de textos (plan, Fase 2), hecha el 2026-10-21:
- [x] **Hero** con la frase elegida, tu texto y las fortalezas como chips. El titular es más largo que el anterior: el tamaño está ajustado y la primera pantalla sigue entrando completa (verificado en 1280×720, 1366×768, 1440×900, 1920×1080 y 500 px de ancho). La imagen para compartir usa el titular nuevo y entra bien
- [x] **Recorrido** con cinco tramos: Mecantronic, NovoGas (nuevo), freelance, SoyHenry (con Teaching Assistant) y Profesorado. El primer párrafo de "Sobre mí" ahora también nombra a NovoGas
- [x] **Stack** actualizado en `site.ts`: sale Sequelize; se suman TypeScript, Redux Toolkit, TanStack Query, Python, FastAPI, SQL Server, SQLite, TypeORM, Firebase, Electron, Docker y GitHub Actions; un grupo nuevo, "Herramientas". La columna de rótulos de "Sobre mí" pasó a 124 px, porque "Herramientas" no entraba
- [x] **Idiomas** del hero: "Español nativo, inglés B1", igual que en el CV
- [x] **Lugar para la foto**: `site.photo` (hoy `null`). Probado con una foto de prueba: se ve arriba de la columna derecha de "Sobre mí", sin salto de layout
- [x] **CV por idioma**: `site.cv.es` y `site.cv.en`; `/en` descarga `cv-guido-dealbera-en.pdf`
- [x] Meta description con el stack actual

## 4. Casos de estudio

- [x] Ruta `/[lang]/projects/[slug]` con `generateStaticParams`
- [x] Formato del contenido: archivos TypeScript tipados, un archivo por proyecto con los dos idiomas adentro (decisión y motivos en `src/content/projects/README.md`)
- [x] Metadata, `hreflang`, imagen Open Graph y sitemap por proyecto
- [x] Grilla de tarjetas en la home con inclinación 3D, y página del caso con problema, decisiones y resultado
- [x] 404 de verdad (con el código HTTP correcto) para un proyecto inexistente, y página 404 propia y bilingüe para cualquier URL sin ruta
- [ ] **Caso "Este portfolio"** (`src/content/projects/portfolio.ts`): se queda, y se le suman capturas
- [x] **Pasar los casos desde el inventario** (2026-10-21; falta tu revisión de los textos), en este orden (con siete, la primera tarjeta ocupa el ancho completo):
  1. `durrieu`: Mecantronic · En producción, piloto
  2. `mecanica-dealbera`: Freelance · En desarrollo · repo público
  3. `templo-de-las-asintotas`: Personal · Prueba de concepto · sin enlace "Ver online" (solo vos creás salas), con capturas o video
  4. `plan-mi-casa`: Mecantronic · Plan Mi Casa en producción, más Tu Casa en Cuotas (prueba de concepto) en el mismo caso
  5. `esconecta`: Mecantronic · En producción
  6. `grupo-oeste-seguros`: Freelance · En producción (publicidad de la agencia) · repo público `seguros-front` · el backend lo hizo otro desarrollador
  7. `portfolio`: Personal
- [x] Etiquetas de **contexto** (Mecantronic / Freelance / Personal) y **estado** (En producción, En producción · piloto, En desarrollo, Prueba de concepto) en el tipo `Project`, la tarjeta y la página del caso. Son campos obligatorios: un caso nuevo no compila sin ellos. En la página del caso, el rol pasó a un bloque "Mi rol / Estado" debajo del resumen
- [ ] **Revisar los siete casos**, en español y en inglés (`src/content/projects/*.ts`). Solo afirman lo que está en el inventario o lo que confirmaste
- [ ] Capturas en `public/projects/<slug>.png`. Mecánica Dealbera con los datos sensibles difuminados (nombres, teléfonos, patentes, domicilios, correos)
- [x] Qué hacer con `public/legacy/`: se reutiliza la captura de Grupo Oeste Seguros si sigue siendo representativa; el resto se borra
- [ ] `global-not-found` es una opción **experimental** de Next. Está fijada en 16.4.0; si se actualiza Next, revisar que el 404 siga funcionando

## 5. Formulario de contacto

- [x] Server Action con validación en Zod (`src/features/contact/`)
- [x] Envío con Resend, aislado en `mailer.ts`: cambiar de proveedor es reescribir ese único archivo
- [x] Campo trampa contra bots (honeypot)
- [x] Estados visibles: enviando, enviado, error con instrucción de qué hacer, y el foco va al primer campo con error
- [x] Variables de entorno: `.env.local` (tuyo, ignorado por Git) y `.env.example` (documentado)
- [x] Cuenta de Resend creada y variables cargadas en `.env.local` (recreado en esta máquina el 2026-10-21; `CONTACT_FROM` vacío usa el remitente por defecto)
- [x] **Envío real probado** (2026-10-21) con el build de producción en local, en `/es` y `/en`, enviando el formulario como un navegador sin JavaScript (que además prueba esa vía). El inválido vuelve con su error y no envía nada; el válido llega a Resend sin errores y el formulario pasa al estado "enviado". Llegaron mails de prueba con asunto "Portfolio · Prueba del formulario (es/en)"
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
- [x] `logo.svg` y `logo.png` del sitio viejo: borrados (nada los usaba). El monograma GD de los íconos queda como marca
- [ ] `lastModified` en el sitemap: hoy se omite porque `new Date()` no corre en el prerender; se puede sumar con una fecha fija por proyecto cuando existan

## 7. Calidad

- [x] Auditoría automatizada con axe-core (WCAG 2.2 AA) en la home en español e inglés, el caso y el 404: 0 violaciones
- [x] Teclado: el primer Tab cae en "Saltar al contenido", el orden es lógico, todo tiene anillo de foco visible y no hay trampas; el header ya no tapa lo enfocado (`scroll-padding-top`)
- [x] Objetivos táctiles de al menos 40 px de alto (logo, selector de idioma, footer, "volver")
- [x] Menú móvil, selector de idioma, `prefers-reduced-motion` y sin JavaScript verificados en navegador real (Edge y Chrome), y navegación por toque en celular emulado
- [x] La primera pantalla se ve completa al cargar, sin scrollear, en 720, 768, 900 y 1080 px de alto y en celular
- [x] Lighthouse: Accesibilidad 100, Buenas prácticas 100 y SEO 100 en las cuatro páginas; rendimiento 100 en escritorio
- [ ] **Lighthouse en celular simulado: rendimiento 93–94 (la meta era ≥ 95) con un LCP simulado de 3,1 s**, constante entre corridas. El LCP que mide el navegador sin simulación es de 0,2 s. No pude determinar qué fija el número simulado; probé quitar la dependencia de la hidratación en la entrada del hero y optimizar el canvas, y no lo movieron. **Decidido (2026-10-21): se acepta para lanzar y se mejora después**
- [ ] **Escuchar el sitio con un lector de pantalla real** (NVDA o VoiceOver): lo automático detecta reglas, no si resulta entendible
- [ ] **Probar en un teléfono real**: cómo se siente el canvas y por qué, en la emulación de celular, el navegador deja tres precargas duplicadas que nunca cierran (y se cancelan con `ERR_ABORTED` al volver al tope). La navegación funciona igual y no hay errores del servidor, pero no pude fijar la causa
- [ ] El contraste de texto lo midió axe con el canvas y la cuadrícula del fondo ocultos (son decorativos, de opacidad ≤ 20%), porque con ellos axe no puede calcular el fondo. Los pares de colores de la paleta sí están calculados a mano
- [ ] Vercel Analytics + Speed Insights (después del lanzamiento)
- [x] README nuevo: cómo correrlo, variables de entorno, dónde está cada cosa, decisiones y despliegue
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
