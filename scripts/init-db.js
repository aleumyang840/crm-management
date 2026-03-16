import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import path from 'path';

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function initDb() {
  console.log('⏳ Initializing database...');
  try {
    const client = await pool.connect();

    // 1. admin_users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'viewer',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Created admin_users table');

    // 2. landing_pages table
    await client.query(`
      CREATE TABLE IF NOT EXISTS landing_pages (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        template VARCHAR(100) NOT NULL DEFAULT 'default',
        status VARCHAR(50) NOT NULL DEFAULT 'draft',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Created landing_pages table');

    // 3. leads table
    await client.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        landing_id UUID REFERENCES landing_pages(id) ON DELETE SET NULL,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        region VARCHAR(255),
        birth_year VARCHAR(4),
        birth_month VARCHAR(2),
        birth_day VARCHAR(2),
        ip VARCHAR(50),
        user_agent TEXT,
        utm_source VARCHAR(255),
        utm_medium VARCHAR(255),
        utm_campaign VARCHAR(255),
        status VARCHAR(50) NOT NULL DEFAULT 'new',
        memo TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Created leads table');

    // Create a default admin user if none exists
    const adminCheck = await client.query('SELECT * FROM admin_users WHERE email = $1', ['admin@example.com']);
    if (adminCheck.rows.length === 0) {
      // Password hash for 'password123' (In production, use bcrypt)
      // For this starter we just use raw text comparison per plan
      await client.query(`
        INSERT INTO admin_users (email, password_hash, role)
        VALUES ('admin@example.com', 'password123', 'admin')
      `);
      console.log('✅ Created default admin user: admin@example.com / password123');
    }

    client.release();
    console.log('🎉 Database initialization complete!');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
  } finally {
    await pool.end();
  }
}

initDb();
