import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const alojamientoSchema = z.object({
	nombre: z.string(),
	tipo: z.enum(['suite', 'glamping', 'cabana']),
	precio: z.number(),
	precioMax: z.number().optional(),
	jacuzzi: z.string(),
	capacidad: z.number().default(2),
	imagen: z.string(),
	orden: z.number().default(0),
	resumen: z.string().optional(),
	destacada: z.boolean().default(false),
	amenidades: z.array(z.string()).optional(),
	galeria: z.array(z.string()).optional(),
});

const alojamientos = defineCollection({
	loader: glob({ base: './src/content/alojamientos', pattern: '**/*.{md,mdx}' }),
	schema: () => alojamientoSchema,
});


export const collections = { alojamientos };
export type Alojamiento = z.infer<typeof alojamientoSchema>;