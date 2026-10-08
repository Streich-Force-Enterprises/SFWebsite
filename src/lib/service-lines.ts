// src/lib/service-lines.ts
// The six service lines on the Services page. Order here is the order of the
// gallery filter. Adding a line is a content decision, not a code one.
// Plain constants (no astro:content import) so the collection schema can use them.
export const SERVICE_LINES = [
  'fabrication',
  'compactor-chutes',
  'structural',
  'gates',
  'fit-outs',
  'maintenance',
] as const;

export type ServiceLine = (typeof SERVICE_LINES)[number];

export const SERVICE_LINE_LABELS: Record<ServiceLine, string> = {
  'fabrication': 'Fabrication',
  'compactor-chutes': 'Compactor chutes',
  'structural': 'Structural',
  'gates': 'Gates',
  'fit-outs': 'Fit-outs',
  'maintenance': 'Maintenance',
};

