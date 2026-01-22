// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_BRAND = 'MALH';
export const SITE_OWNER_NAME = 'Miguel Ángel López Hernández';

// Título base del sitio (útil para RSS, header del blog, etc.)
export const SITE_TITLE = SITE_BRAND;

export const SITE_DESCRIPTION =
	'Portafolio de Miguel Ángel López Hernández — Desarrollador Full Stack & IoT. Proyectos, habilidades y contacto.';

export const PAGE_TITLES = {
	home: 'Inicio',
	about: 'Sobre mí',
	blog: 'Blog',
} as const;

export function buildPageTitle(pageTitle?: string): string {
	const cleaned = (pageTitle ?? '').trim();
	return cleaned.length ? `${cleaned} / ${SITE_BRAND}` : SITE_BRAND;
}
