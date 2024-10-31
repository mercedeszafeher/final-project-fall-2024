import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE review_filters (
      review_id INTEGER REFERENCES reviews(review_id) ON DELETE CASCADE,
      filter_id INTEGER REFERENCES filters(filter_id) ON DELETE CASCADE,
      PRIMARY KEY (review_id, filter_id)
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE review_filters`;
}
