import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE filters (
      filter_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name VARCHAR(50) NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE filters`;
}
