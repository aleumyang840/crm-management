import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET /api/landing
export async function GET() {
  try {
    const res = await query(`
      SELECT lp.*, COUNT(l.id)::int AS lead_count
      FROM landing_pages lp
      LEFT JOIN leads l ON l.landing_id = lp.id
      GROUP BY lp.id
      ORDER BY lp.created_at DESC
    `);
    return NextResponse.json(res.rows);
  } catch (error) {
    console.error('Landing API GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch landing pages' }, { status: 500 });
  }
}

// POST /api/landing - Create new landing page
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, slug, template, status } = body;

    // slug 중복 확인
    const existing = await query('SELECT id FROM landing_pages WHERE slug = $1', [slug]);
    if (existing.rows.length > 0) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 409 });
    }

    const res = await query(
      `INSERT INTO landing_pages (name, slug, template, status, created_at, updated_at)
       VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING *`,
      [name, slug, template || 'default', status || 'draft']
    );
    return NextResponse.json(res.rows[0], { status: 201 });
  } catch (error) {
    console.error('Landing API POST Error:', error);
    return NextResponse.json({ error: 'Failed to create landing page' }, { status: 500 });
  }
}
