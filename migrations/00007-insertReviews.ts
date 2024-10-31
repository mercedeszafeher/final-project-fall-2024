import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  const reviews = [
    {
      user_id: 1,
      neighborhood_id: 1,
      rating: '5',
      text: 'Great neighborhood!',
      tags: { family_friendly: true },
    },
  ];

  for (const review of reviews) {
    await sql`
      INSERT INTO reviews (
        user_id,
        neighborhood_id,
        rating,
        text,
        tags
      )
      VALUES (
        ${review.user_id},
        ${review.neighborhood_id},
        ${review.rating},
        ${review.text},
        ${JSON.stringify(review.tags)}
      )
    `;
  }
}

export async function down(sql: Sql) {
  await sql`DELETE FROM reviews`;
}
