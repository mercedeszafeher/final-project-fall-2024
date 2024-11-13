import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  const cities = [
    {
      name: 'Vienna',
      country: 'Austria',
      description: 'Capital of Austria',
      image_url: '/images/cities/vienna.jpg',
      map_url: null,
    },
    {
      name: 'Oslo',
      country: 'Norway',
      description:
        'Experience the stunning fjords and vibrant culture of Oslo.',
      image_url: '/images/cities/oslo.jpg',
      map_url: null,
    },
    {
      name: 'Kyoto',
      country: 'Japan',
      description: 'Discover the ancient temples and serene gardens of Kyoto.',
      image_url: '/images/cities/kyoto.jpg',
      map_url: null,
    },
    {
      name: 'Cape Town',
      country: 'South Africa',
      description: 'Enjoy breathtaking views from Table Mountain in Cape Town.',
      image_url: '/images/cities/cape-town.jpg',
      map_url: null,
    },
    {
      name: 'Lisbon',
      country: 'Portugal',
      description: 'Explore the charming streets and rich history of Lisbon.',
      image_url: '/images/cities/lisbon.jpg',
      map_url: null,
    },
    {
      name: 'Vancouver',
      country: 'Canada',
      description:
        'Experience the perfect blend of urban life and nature in Vancouver.',
      image_url: '/images/cities/vancouver.jpg',
      map_url: null,
    },
    {
      name: 'Seoul',
      country: 'South Korea',
      description: 'Dive into the dynamic culture and cuisine of Seoul.',
      image_url: '/images/cities/seoul.jpg',
      map_url: null,
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
        ${city.image_url},
        ${city.map_url}
      )
    `;
  }
}

export async function down(sql: Sql) {
  await sql`DELETE FROM cities`;
}
