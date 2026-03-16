import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      name, phone, region, birth_year, birth_month, birth_day, 
      landing_slug, utm_source, utm_medium, utm_campaign
    } = body;

    // Retrieve client IP and User-Agent
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const user_agent = req.headers.get('user-agent') || 'Unknown';

    // Get the landing page ID
    const landingRes = await query('SELECT id FROM landing_pages WHERE slug = $1', [landing_slug]);
    const landing_id = landingRes.rows[0]?.id || null;

    const res = await query(
      `INSERT INTO leads 
       (landing_id, name, phone, region, birth_year, birth_month, birth_day, 
        ip, user_agent, utm_source, utm_medium, utm_campaign, status, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, 'new', NOW()) RETURNING id`,
      [
        landing_id, name, phone, region, birth_year, birth_month, birth_day,
        ip, user_agent, utm_source, utm_medium, utm_campaign
      ]
    );

    return NextResponse.json({ success: true, lead_id: res.rows[0].id });
  } catch (error) {
    console.error('Public Lead Submit Error:', error);
    return NextResponse.json({ error: 'Failed to submit lead' }, { status: 500 });
  }
}
