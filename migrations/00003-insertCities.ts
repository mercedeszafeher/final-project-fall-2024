import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  const cities = [
    {
      name: 'Vienna',
      country: 'Austria',
      description: 'Capital of Austria',
      imageUrl: '/images/cities/vienna.jpg',
      mapUrl: null,
    },
    {
      name: 'Oslo',
      country: 'Norway',
      description:
        'Experience the stunning fjords and vibrant culture of Oslo.',
      imageUrl: '/images/cities/oslo.jpg',
      mapUrl: null,
    },
    {
      name: 'Kyoto',
      country: 'Japan',
      description: 'Discover the ancient temples and serene gardens of Kyoto.',
      imageUrl: '/images/cities/kyoto.jpg',
      mapUrl: null,
    },
    {
      name: 'Cape Town',
      country: 'South Africa',
      description: 'Enjoy breathtaking views from Table Mountain in Cape Town.',
      imageUrl: '/images/cities/cape-town.jpg',
      mapUrl: null,
    },
    {
      name: 'Lisbon',
      country: 'Portugal',
      description: 'Explore the charming streets and rich history of Lisbon.',
      imageUrl: '/images/cities/lisbon.jpg',
      mapUrl: null,
    },
    {
      name: 'Vancouver',
      country: 'Canada',
      description:
        'Experience the perfect blend of urban life and nature in Vancouver.',
      imageUrl: '/images/cities/vancouver.jpg',
      mapUrl: null,
    },
    {
      name: 'Seoul',
      country: 'South Korea',
      description: 'Dive into the dynamic culture and cuisine of Seoul.',
      imageUrl: '/images/cities/seoul.jpg',
      mapUrl: null,
    },
  ];

  for (const city of cities) {
    await sql`
      INSERT INTO cities (
        name,
        country,
        description,
        image_url,
        map_url

      )
      VALUES (
        ${city.name},
        ${city.country},
        ${city.description},
        ${city.imageUrl},
        ${city.mapUrl}
      )
    `;
  }
}

export async function down(sql: Sql) {
  await sql`DELETE FROM cities`;
}
