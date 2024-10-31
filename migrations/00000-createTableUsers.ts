import type { Sql } from 'postgres';
import { z } from 'zod';

export const userSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
});

export type User = {
  id: number;
  username: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      username VARCHAR(50) NOT NULL UNIQUE,
      email VARCHAR(100) UNIQUE NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      profile_pic TEXT,
      location VARCHAR(100),
      bio TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE users `;
}
