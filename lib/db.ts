import { Pool } from 'pg';

// Create a single connection pool for the PostgreSQL instance
// In a serverless environment like Next.js App Router, global references 
// are needed to prevent opening too many connections in development
const globalForDb = globalThis as unknown as {
  pool: Pool | undefined;
};

export const pool =
  globalForDb.pool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    // Add additional configuration such as max connections if needed
    // max: 10, 
  });

if (process.env.NODE_ENV !== 'production') globalForDb.pool = pool;

export async function query(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res;
  } finally {
    client.release();
  }
}
