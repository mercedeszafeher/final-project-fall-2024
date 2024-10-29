import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE Neighborhoods (
    neighborhood_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100) NOT NULL,
    city_id INTEGER REFERENCES Cities(city_id) ON DELETE CASCADE,
    description TEXT,
    popularity INTEGER DEFAULT 0
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE Cities `;
}
