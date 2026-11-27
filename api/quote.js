// Vercel serverless function: receives a quote submission (fields + downscaled photos as
// data URLs) from the site's quote forms and forwards it to the CRM.
//
// Set QUOTE_WEBHOOK_URL in the Vercel project (a GoHighLevel inbound-webhook trigger URL).
// The payload forwarded is JSON: { full_name, email, phone, property_address, property_size,
// service_needed, job_notes, page, submitted_at, photo_count, photos: [{ name, type, data }] }.
// Without the variable the function accepts the request and does nothing, so the site still
// works; the GHL tracking script keeps capturing the text fields on its own.

const MAX_PHOTOS = 6;
const MAX_BODY = 12 * 1024 * 1024;

export const config = { api: { bodyParser: { sizeLimit: '12mb' } } };

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.status(405).json({ ok: false }); return; }

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = null; } }
  if (!body || typeof body !== 'object' || !body.fields) { res.status(400).json({ ok: false }); return; }
  if (JSON.stringify(body).length > MAX_BODY) { res.status(413).json({ ok: false }); return; }

  const f = body.fields;
  const str = (v) => (typeof v === 'string' ? v.trim().slice(0, 2000) : '');
  const photos = (Array.isArray(body.photos) ? body.photos : [])
    .filter((p) => p && typeof p.data === 'string' && /^data:image\/jpeg;base64,/.test(p.data))
    .slice(0, MAX_PHOTOS)
    .map((p) => ({ name: str(p.name).slice(0, 120) || 'photo.jpg', type: 'image/jpeg', data: p.data }));

  const payload = {
    full_name: str(f.full_name), email: str(f.email), phone: str(f.phone),
    property_address: str(f.property_address), property_size: str(f.property_size),
    service_needed: str(f.service_needed), job_notes: str(f.job_notes),
    page: str(body.page), submitted_at: new Date().toISOString(),
    photo_count: photos.length, photos,
  };
  if (!payload.full_name || !payload.phone) { res.status(400).json({ ok: false }); return; }

  const url = process.env.QUOTE_WEBHOOK_URL;
  if (!url) { res.status(200).json({ ok: true, forwarded: false }); return; }
  try {
    const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    res.status(200).json({ ok: r.ok, forwarded: r.ok });
  } catch {
    res.status(200).json({ ok: false, forwarded: false });
  }
}
