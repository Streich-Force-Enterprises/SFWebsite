// scripts/solutions-screenshots/auth-stub.mjs
// A stand-in for Supabase's API, used ONLY to capture the SF Solutions demo
// client's screens on a local `next dev` (#17). It answers "the signed-in
// person is an operator" and returns no rows for anything else. The demo
// client reads its data from code (sf-solutions src/clients/demo.ts), never
// from Supabase, so nothing here is a customer's data.
//
// Run:  node scripts/solutions-screenshots/auth-stub.mjs   (listens on 54399)
// Then start sf-solutions with NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54399
// and SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY unset.
import { createServer } from 'node:http';

const PORT = Number(process.env.STUB_PORT ?? 54399);
export const STUB_USER = {
  id: '00000000-0000-4000-8000-00000000d3e0',
  aud: 'authenticated',
  role: 'authenticated',
  email: 'operator@demo.invalid',
  app_metadata: {},
  user_metadata: {},
  created_at: '2026-11-01T00:00:00Z',
};
const SF_USER = {
  auth_id: STUB_USER.id,
  email: STUB_USER.email,
  full_name: 'Demo Viewer',
  role: 'operator',
  client_slug: null,
  active: true,
};

createServer((req, res) => {
  const url = new URL(req.url, 'http://stub');
  const json = (status, body, headers = {}) => {
    res.writeHead(status, { 'content-type': 'application/json', ...headers });
    res.end(body === undefined ? '' : JSON.stringify(body));
  };
  if (url.pathname === '/auth/v1/user') return json(200, STUB_USER);
  if (url.pathname.startsWith('/rest/v1/sf_user')) {
    const single = (req.headers.accept ?? '').includes('vnd.pgrst.object');
    return json(200, single ? SF_USER : [SF_USER], { 'content-range': '0-0/1' });
  }
  if (url.pathname.startsWith('/rest/v1/')) {
    return json(200, req.method === 'HEAD' ? undefined : [], { 'content-range': '*/0' });
  }
  return json(404, { message: 'not stubbed' });
}).listen(PORT, '127.0.0.1', () => console.log(`auth stub on http://127.0.0.1:${PORT}`));
