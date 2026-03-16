import { NextResponse } from 'next/server';
import { signToken } from '@/lib/auth';
import { query } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const res = await query('SELECT * FROM admin_users WHERE email = $1', [email]);
    const user = res.rows[0];

    // Note: In production, use bcrypt library to check password_hash
    if (user && user.password_hash === password) { 
      const token = signToken({ id: user.id, email: user.email, role: user.role });
      
      const response = NextResponse.json({ success: true, user: { email: user.email, role: user.role } });
      
      response.cookies.set('admin_token', token, { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        path: '/'
      });
      return response;
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    console.error('Auth API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
