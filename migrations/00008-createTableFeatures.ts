import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE features (
      feature_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name VARCHAR(50) NOT NULL,
      description TEXT
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE features`;
}
