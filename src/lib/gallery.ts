// src/lib/gallery.ts
import { getCollection, type CollectionEntry } from 'astro:content';

export { SERVICE_LINES, SERVICE_LINE_LABELS, type ServiceLine } from './service-lines';

export type GalleryEntry = CollectionEntry<'gallery'>;

type Photo = Extract<GalleryEntry['data']['image'], { src: string }>;

/** Every photo of a job in lightbox order: befores, then afters. `cover` is the first after. */
export function photosOf(entry: GalleryEntry) {
  const list = (v: Photo | Photo[] | undefined) => (v === undefined ? [] : Array.isArray(v) ? v : [v]);
  const before = list(entry.data.before).map((src) => ({ src, stage: 'Before' as const }));
  const after = list(entry.data.image).map((src) => ({ src, stage: 'After' as const }));
  return { cover: after[0].src, hasBefore: before.length > 0, all: [...before, ...after] };
}

/** Photos for one division, newest month first. */
export async function getGallery(
  division: GalleryEntry['data']['division'],
  { featuredOnly = false } = {},
): Promise<GalleryEntry[]> {
  const entries = await getCollection(
    'gallery',
    (e) => e.data.division === division && (!featuredOnly || e.data.featured),
  );
  return entries.sort(
    (a, b) => b.data.takenOn.localeCompare(a.data.takenOn) || a.id.localeCompare(b.id),
  );
}
