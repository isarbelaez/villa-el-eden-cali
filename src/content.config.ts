import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const alojamientos = defineCollection({
	loader: glob({ base: './src/content/alojamientos', pattern: '**/*.{md,mdx}' }),
	schema: () =>
		z.object({
			nombre: z.string(),
			tipo: z.enum(['suite', 'glamping', 'cabana']),
			precio: z.number(),
			jacuzzi: z.string(),
			capacidad: z.number().default(2),
			imagen: z.string(),
			orden: z.number().default(0),
			resumen: z.string().optional(),
			destacada: z.boolean().default(false),
			amenidades: z.array(z.string()).optional(),
			galeria: z.array(z.string()).optional(),
		}),
});

const paginas = defineCollection({
	loader: glob({ base: './src/content/paginas', pattern: '**/*.{md,mdx}' }),
	schema: () =>
		z.object({
			titulo: z.string(),
			descripcion: z.string(),
			imagen: z.string().optional(),
		}),
});

export const collections = { alojamientos, paginas };
