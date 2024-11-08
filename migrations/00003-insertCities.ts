import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  const cities = [
    {
      name: 'Vienna',
      country: 'Austria',
      description: 'Capital of Austria',
      imageUrl: '/images/cities/vienna.jpg',
    },
    {
      name: 'Oslo',
      country: 'Norway',
      description:
        'Experience the stunning fjords and vibrant culture of Oslo.',
      imageUrl: '/images/cities/oslo.jpg',
    },
    {
      name: 'Kyoto',
      country: 'Japan',
      description: 'Discover the ancient temples and serene gardens of Kyoto.',
      imageUrl: '/images/cities/kyoto.jpg',
    },
    {
      name: 'Cape Town',
      country: 'South Africa',
      description: 'Enjoy breathtaking views from Table Mountain in Cape Town.',
      imageUrl: '/images/cities/cape-town.jpg',
    },
    {
      name: 'Lisbon',
      country: 'Portugal',
      description: 'Explore the charming streets and rich history of Lisbon.',
      imageUrl: '/images/cities/lisbon.jpg',
    },
    {
      name: 'Vancouver',
      country: 'Canada',
      description:
        'Experience the perfect blend of urban life and nature in Vancouver.',
      imageUrl: '/images/cities/vancouver.jpg',
    },
    {
      name: 'Seoul',
      country: 'South Korea',
      description: 'Dive into the dynamic culture and cuisine of Seoul.',
      imageUrl: '/images/images/seoul.jpg',
    },
  ];

  for (const city of cities) {
    await sql`
      INSERT INTO cities (
        name,
        country,
        description,
        imageURL

      )
      VALUES (
        ${city.name},
        ${city.country},
        ${city.description},
        ${city.imageUrl}
      )
    `;
  }
}

export async function down(sql: Sql) {
  await sql`DELETE FROM cities`;
}
