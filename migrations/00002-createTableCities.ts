import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE cities (
      city_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name VARCHAR(100) NOT NULL,
      country VARCHAR(100) NOT NULL,
      imageUrl VARCHAR,
      description TEXT,
      map_url TEXT
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE cities`;
}
