import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  const cities = [
    {
      name: 'Vienna',
      country: 'Austria',
      description: 'Capital of Austria',
      map_url: 'https://example.com/vienna',
    },
  ];

  for (const city of cities) {
    await sql`
      INSERT INTO cities (
        name,
        country,
        description,
        map_url
      )
      VALUES (
        ${city.name},
        ${city.country},
        ${city.description},
        ${city.map_url}
      )
    `;
  }
}

export async function down(sql: Sql) {
  await sql`DELETE FROM cities`;
}
