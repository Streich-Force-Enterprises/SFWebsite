// src/content/config.ts
// The gallery: one YAML entry per photo in src/content/gallery/, original
// file in src/assets/gallery/<division>/. The schema is the guard: a missing
// file, an empty caption or an unknown service line fails `npm run build`.
import { defineCollection, z } from 'astro:content';
import { SERVICE_LINES } from '../lib/service-lines';

const gallery = defineCollection({
  type: 'data',
  schema: ({ image }) =>
    z
      .object({
        // Path relative to the entry file, e.g. ../../assets/gallery/services/x.jpg
        image: image(),
        // What was built or fixed, never who for (see CLAUDE.md "Gallery").
        caption: z.string().trim().min(1, 'caption is required'),
        // Screen-reader text; falls back to the caption.
        alt: z.string().trim().min(1).optional(),
        division: z.enum(['services', 'solutions']),
        serviceLine: z.enum(SERVICE_LINES).optional(),
        // Month the photo was taken, YYYY-MM.
        takenOn: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'takenOn must be YYYY-MM'),
        featured: z.boolean().default(false),
      })
      .refine((d) => d.division !== 'services' || d.serviceLine, {
        message: 'serviceLine is required for division: services',
        path: ['serviceLine'],
      }),
});

export const collections = { gallery };
