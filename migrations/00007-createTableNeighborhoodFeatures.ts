import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE neighborhood_features (
      neighborhood_id INTEGER REFERENCES neighborhoods(id) ON DELETE CASCADE,
      feature_id INTEGER REFERENCES features(id) ON DELETE CASCADE,
      score rating_level NOT NULL,
      PRIMARY KEY (neighborhood_id, feature_id)
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE neighborhood_features`;
}
