import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    ALTER TABLE cities
    ADD COLUMN lat DOUBLE PRECISION,
    ADD COLUMN lng DOUBLE PRECISION
  `;
}

export async function down(sql: Sql) {
  await sql`
    ALTER TABLE cities
    DROP COLUMN lat,
    DROP COLUMN lng
  `;
}
