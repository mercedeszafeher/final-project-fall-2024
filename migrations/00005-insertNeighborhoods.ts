import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  const neighborhoods = [
    {
      name: 'Neubau',
      city_id: 1,
      description: 'A hip neighborhood in Vienna',
      popularity: 5,
    },
  ];

  for (const neighborhood of neighborhoods) {
    await sql`
      INSERT INTO neighborhoods (
        name,
        city_id,
        description,
        popularity
      )
      VALUES (
        ${neighborhood.name},
        ${neighborhood.city_id},
        ${neighborhood.description},
        ${neighborhood.popularity}
      )
    `;
  }
}

export async function down(sql: Sql) {
  await sql`DELETE FROM neighborhoods`;
}
