// src/lib/service-lines.ts
// The service lines on the Services page, in the same order (Sonja,
// 2026-10-08: alphabetical, Other last). This order is the gallery filter's.
// Adding a line is a content decision, not a code one.
// Plain constants (no astro:content import) so the collection schema can use them.
export const SERVICE_LINES = [
  'fabrication',
  'doors',
  'fit-outs',
  'maintenance',
  'structural',
  'gates',
  'other',
] as const;

export type ServiceLine = (typeof SERVICE_LINES)[number];

export const SERVICE_LINE_LABELS: Record<ServiceLine, string> = {
  'fabrication': 'Custom fabrication',
  'doors': 'Doors',
  'fit-outs': 'Fit-outs',
  'maintenance': 'Site maintenance',
  'structural': 'Structural repairs',
  'gates': 'Access & security gates',
  'other': 'Other',
};
