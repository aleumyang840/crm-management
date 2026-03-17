import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET /api/landing/[id] - 단건 조회
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const res = await query('SELECT * FROM landing_pages WHERE id = $1', [id]);
    if (res.rows.length === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(res.rows[0]);
  } catch (error) {
    console.error('Landing [id] GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch landing page' }, { status: 500 });
  }
}

// PATCH /api/landing/[id] - 수정 (name, slug, template, status)
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = await req.json();
    const { name, slug, template, status } = body;

    // slug 변경 시 중복 체크 (본인 제외)
    if (slug) {
      const existing = await query(
        'SELECT id FROM landing_pages WHERE slug = $1 AND id != $2',
        [slug, id]
      );
      if (existing.rows.length > 0) {
        return NextResponse.json({ error: 'Slug already exists' }, { status: 409 });
      }
    }

    const res = await query(
      `UPDATE landing_pages
       SET name = COALESCE($1, name),
           slug = COALESCE($2, slug),
           template = COALESCE($3, template),
           status = COALESCE($4, status),
           updated_at = NOW()
       WHERE id = $5
       RETURNING *`,
      [name, slug, template, status, id]
    );

    if (res.rows.length === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(res.rows[0]);
  } catch (error) {
    console.error('Landing [id] PATCH Error:', error);
    return NextResponse.json({ error: 'Failed to update landing page' }, { status: 500 });
  }
}

// DELETE /api/landing/[id] - 삭제
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const res = await query('DELETE FROM landing_pages WHERE id = $1 RETURNING id', [id]);
    if (res.rows.length === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Landing [id] DELETE Error:', error);
    return NextResponse.json({ error: 'Failed to delete landing page' }, { status: 500 });
  }
}
