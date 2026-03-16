import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const res = await query('SELECT * FROM landing_pages ORDER BY created_at DESC');
    return NextResponse.json(res.rows);
  } catch (error) {
    console.error('Landing API GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch landing pages' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, slug, template, status } = body;
    
    const res = await query(
      `INSERT INTO landing_pages (name, slug, template, status, created_at, updated_at)
       VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING *`,
      [name, slug, template, status]
    );
    return NextResponse.json(res.rows[0]);
  } catch (error) {
    console.error('Landing API POST Error:', error);
    return NextResponse.json({ error: 'Failed to create landing page' }, { status: 500 });
  }
}
