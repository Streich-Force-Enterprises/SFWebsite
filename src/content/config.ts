// src/content/config.ts
// The gallery: one YAML entry per job in src/content/gallery/ (the finished
// photo or photos, plus optional before photos), originals in src/assets/gallery/<division>/. The schema is the guard: a missing
// file, an empty caption or an unknown service line fails `npm run build`.
import { defineCollection, z } from 'astro:content';
import { SERVICE_LINES } from '../lib/service-lines';

const gallery = defineCollection({
  type: 'data',
  schema: ({ image }) =>
    z
      .object({
        // After (finished) photo, or a list of them; the first is the card.
        // Path relative to the entry file, e.g. ../../assets/gallery/services/x.jpg
        image: z.union([image(), z.array(image()).min(1)]),
        // Optional "before" photo, or a list; the lightbox shows the whole set.
        before: z.union([image(), z.array(image()).min(1)]).optional(),
        // What was built or fixed, never who for (see CLAUDE.md "Gallery").
        caption: z.string().trim().min(1, 'caption is required'),
        // Screen-reader text; falls back to the caption.
        alt: z.string().trim().min(1).optional(),
        division: z.enum(['services', 'solutions']),
        serviceLine: z.enum(SERVICE_LINES).optional(),
        // Month the photo was taken, YYYY-MM.
        takenOn: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'takenOn must be YYYY-MM'),
        featured: z.boolean().default(false),
        // Solutions screenshots only: position in the /solutions strip (1 first).
        order: z.number().int().positive().optional(),
      })
      .refine((d) => d.division !== 'services' || d.serviceLine, {
        message: 'serviceLine is required for division: services',
        path: ['serviceLine'],
      })
      // A Solutions entry is one product screenshot (#17): no Before / After,
      // no service line, and a place in the strip. Capture recipe:
      // docs/gallery/solutions-screenshots.md (demo data only).
      .refine((d) => d.division !== 'solutions' || (!d.before && !d.serviceLine && d.order), {
        message: 'a solutions screenshot takes order, and no before or serviceLine',
        path: ['order'],
      }),
});

export const collections = { gallery };
