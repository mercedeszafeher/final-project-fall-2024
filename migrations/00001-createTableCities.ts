import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE cities (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name VARCHAR(100) NOT NULL,
      country VARCHAR(100) NOT NULL,
      image_url VARCHAR,
      description TEXT,
      map_url TEXT,
      lat DOUBLE PRECISION,
      lng DOUBLE PRECISION
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE cities`;
}
