# portafolio_con_html_a_astro

Migración de un template de **HTML5UP (HTML estático)** a un proyecto **Astro** manteniendo el diseño, assets y comportamiento del template.

## Estructura del repo

- **HTML original (sin Astro):** archivos `.html` en la raíz (por ejemplo `index.html`).
- **Proyecto Astro:** carpeta [astro](astro).

En Astro:

- `astro/src/` contiene páginas y layouts.
- `astro/public/` contiene archivos estáticos (CSS/JS/imagenes) servidos tal cual.

## Registro de migración (paso a paso)

### 0) Requisitos

- Node.js + npm instalados.
- Comando usado para verificar versiones:

`node -v; npm -v`

### 1) Crear el proyecto Astro

**Objetivo:** generar la estructura base (`src/`, `public/`, scripts npm) sin tocar el HTML original.

**Comando ejecutado desde la raíz del repo:**

`npm create astro@latest astro -- --template minimal --yes`

**Opciones elegidas por el asistente de creación:**

- Template: **Blog template**
- Install dependencies: **Yes**
- Initialize git: **Yes**

**Por qué:**

- Astro necesita un proyecto con su config y estructura.
- Mantenerlo en `astro/` evita romper tu versión HTML estática.

### 2) Mover assets del template HTML5UP a `public/`

**Objetivo:** que CSS/JS/imagenes funcionen igual en Astro.

En Astro, todo lo que se sirva como “archivo estático” debe vivir en `public/`.

**Comando usado:**

`Copy-Item -Recurse -Force "assets" "astro\public\assets"; Copy-Item -Recurse -Force "images" "astro\public\images"`

**Resultado:**

- Tus rutas pasan a funcionar como `/assets/...` y `/images/...`.

### 3) Crear un layout para HTML5UP

**Objetivo:** centralizar el `<head>` y la carga de scripts del template para no repetirlo en cada página.

**Archivo creado:**

- [astro/src/layouts/Html5UpLayout.astro](astro/src/layouts/Html5UpLayout.astro)

**Qué contiene / por qué:**

- `<link rel="stylesheet" href="/assets/css/main.css" />` para mantener estilos del template.
- `<script src="/assets/js/..." is:inline></script>` para mantener el JS del template.
	- `is:inline` se usa porque Astro/Vite intenta bundle-ar scripts con `src` y eso causa error si apuntan a archivos en `public/`.

### 4) Convertir la página principal a Astro

**Objetivo:** que tu portafolio ya viva como una página Astro.

**Archivo modificado:**

- [astro/src/pages/index.astro](astro/src/pages/index.astro)

**Qué se hizo:**

- Se pegó el contenido del `index.html` dentro de `<Html5UpLayout>...</Html5UpLayout>`.
- Se ajustaron rutas relativas a absolutas (por ejemplo `images/...` → `/images/...`).

### 5) Fix de error: llaves `{}` dentro de `<code>`

**Problema:** Astro interpreta `{ ... }` como sintaxis del template. En un bloque de código como:

`const miguel = { ... }`

esas llaves rompen el parser.

**Solución aplicada en:**

- [astro/src/pages/index.astro](astro/src/pages/index.astro)

**Qué se cambió:**

- Se escaparon llaves como entidades HTML: `&#123;` y `&#125;`.

### 6) Mejoras visuales (sin romper el template)

**Objetivo:** dar un look más moderno con cambios mínimos (cards, hover, chips con íconos).

**Archivo creado:**

- [astro/public/assets/css/custom.css](astro/public/assets/css/custom.css)

**Archivo modificado:**

- [astro/src/layouts/Html5UpLayout.astro](astro/src/layouts/Html5UpLayout.astro) (se agregó el `<link>` a `custom.css`).
- [astro/src/pages/index.astro](astro/src/pages/index.astro) (se agregó un grid de “chips” con íconos de tecnologías).

## Cómo ejecutar el proyecto Astro

Entra a la carpeta del proyecto Astro:

`cd astro`

Instala dependencias (si fuera necesario):

`npm install`

Inicia el servidor de desarrollo:

`npm run dev`

Astro mostrará una URL local (por ejemplo `http://localhost:4322/`).

Para detener el servidor: `Ctrl + C`.

## Build (producción)

- `npm run build`
- `npm run preview`
