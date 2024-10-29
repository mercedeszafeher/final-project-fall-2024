import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE Users (
      user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      username VARCHAR(50) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      profile_pic TEXT,
      location VARCHAR(100),
      bio TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE Users `;
}
