import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const landing_id = searchParams.get('landing_id');
    const date = searchParams.get('date');
    
    let sql = 'SELECT * FROM leads';
    const params: any[] = [];
    const conditions: string[] = [];

    if (landing_id) {
      params.push(landing_id);
      conditions.push(`landing_id = $${params.length}`);
    }

    if (date) {
      params.push(date);
      conditions.push(`DATE(created_at) = $${params.length}`);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY created_at DESC';

    const res = await query(sql, params);
    return NextResponse.json(res.rows);
  } catch (error) {
    console.error('Leads API GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status, memo } = body;

    let sql = 'UPDATE leads SET ';
    const params: any[] = [];
    
    if (status) {
      params.push(status);
      sql += `status = $${params.length}`;
    }
    
    if (memo !== undefined) {
      if (params.length > 0) sql += ', ';
      params.push(memo);
      sql += `memo = $${params.length}`;
    }

    params.push(id);
    sql += ` WHERE id = $${params.length} RETURNING *`;

    const res = await query(sql, params);
    return NextResponse.json(res.rows[0]);
  } catch (error) {
    console.error('Leads API PATCH Error:', error);
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
  }
}
