import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'rating_level') THEN
        CREATE TYPE rating_level AS ENUM ('1', '2', '3', '4', '5');
      END IF;
    END $$;
  `;

  await sql`
    CREATE TABLE reviews (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      neighborhood_id INTEGER REFERENCES neighborhoods(id) ON DELETE CASCADE,
      rating rating_level NOT NULL,
      text TEXT,
      tags JSONB,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE reviews`;

  await sql`
    DO $$
    BEGIN
      IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'rating_level') THEN
        DROP TYPE rating_level;
      END IF;
    END $$;
  `;
}
