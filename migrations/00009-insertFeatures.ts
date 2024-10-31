import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  const features = [
    { name: 'Parking', description: 'Availability of parking spaces' },
  ];

  for (const feature of features) {
    await sql`
      INSERT INTO features (
        name,
        description
      )
      VALUES (
        ${feature.name},
        ${feature.description}
      )
    `;
  }
}

export async function down(sql: Sql) {
  await sql`DELETE FROM features`;
}
