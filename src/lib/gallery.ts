// src/lib/gallery.ts
import { getCollection, type CollectionEntry } from 'astro:content';

export { SERVICE_LINES, SERVICE_LINE_LABELS, type ServiceLine } from './service-lines';

export type GalleryEntry = CollectionEntry<'gallery'>;

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
