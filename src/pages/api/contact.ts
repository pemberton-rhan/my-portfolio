// Contact form endpoint: validates the sentence form and sends it to Rhan through Resend,
// with Reply-To set to the visitor so a reply goes straight back to them.
import type { APIRoute } from 'astro';
import { RESEND_API_KEY, CONTACT_TO, CONTACT_FROM } from 'astro:env/server';
import { Resend } from 'resend';

export const prerender = false;

const TOPICS: Record<string, string> = {
  new: 'a new website',
  migration: 'a site migration',
  support: 'ongoing support',
  role: 'a full-time role',
  other: 'something else',
};
const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
const clean = (v: unknown, max: number) => String(v ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, max);

export const POST: APIRoute = async ({ request }) => {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: 'Bad request' }, 400);
  }
  if (clean(data.website, 200)) return json({ ok: true }); // the spam trap was filled in: pretend it worked

  const name = clean(data.name, 120);
  const company = clean(data.company, 120);
  const email = clean(data.email, 200);
  const topic = TOPICS[clean(data.topic, 20)];
  const message = String(data.message ?? '').trim().slice(0, 5000);
  if (!name || !topic || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json({ ok: false, error: 'Please fill in your name, a topic and a valid email.' }, 422);
  }
  if (!RESEND_API_KEY) return json({ ok: false, error: 'Email is not set up yet.' }, 503);

  const sentence = `Hi Rhan, I’m ${name}${company ? ` from ${company}` : ''}. I’m reaching out about ${topic}. You can reach me at ${email}.`;
  const { error } = await new Resend(RESEND_API_KEY).emails.send({
    from: CONTACT_FROM,
    to: CONTACT_TO,
    replyTo: email,
    subject: `${name}${company ? ` (${company})` : ''}: ${topic}`,
    text: message ? `${sentence}\n\n${message}` : sentence,
  });
  if (error) return json({ ok: false, error: 'Could not send right now.' }, 502);
  return json({ ok: true });
};
