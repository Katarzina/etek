import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function main() {
  await sql`
    CREATE TABLE IF NOT EXISTS reviews (
      id         SERIAL PRIMARY KEY,
      name       TEXT NOT NULL,
      text       TEXT NOT NULL,
      rating     INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      approved   BOOLEAN NOT NULL DEFAULT FALSE
    )
  `;
  console.log('Table "reviews" ready.');
}

main().catch((err) => { console.error(err); process.exit(1); });
