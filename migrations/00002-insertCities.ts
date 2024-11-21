import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  const cities = [
    {
      name: 'Vienna',
      country: 'Austria',
      description: 'Capital of Austria',
      image_url: '/images/cities/vienna.jpg',
      map_url: null,
      lat: 48.2082,
      lng: 16.3738,
    },
    {
      name: 'Oslo',
      country: 'Norway',
      description:
        'Experience the stunning fjords and vibrant culture of Oslo.',
      image_url: '/images/cities/oslo.jpg',
      map_url: null,
      lat: 59.9139,
      lng: 10.7522,
    },
    {
      name: 'Kyoto',
      country: 'Japan',
      description: 'Discover the ancient temples and serene gardens of Kyoto.',
      image_url: '/images/cities/kyoto.jpg',
      map_url: null,
      lat: 35.0116,
      lng: 135.7681,
    },
    {
      name: 'Cape Town',
      country: 'South Africa',
      description: 'Enjoy breathtaking views from Table Mountain in Cape Town.',
      image_url: '/images/cities/cape-town.jpg',
      map_url: null,
      lat: -33.9249,
      lng: 18.4241,
    },
    {
      name: 'Lisbon',
      country: 'Portugal',
      description: 'Explore the charming streets and rich history of Lisbon.',
      image_url: '/images/cities/lisbon.jpg',
      map_url: null,
      lat: 38.7169,
      lng: -9.139,
    },
    {
      name: 'Vancouver',
      country: 'Canada',
      description:
        'Experience the perfect blend of urban life and nature in Vancouver.',
      image_url: '/images/cities/vancouver.jpg',
      map_url: null,
      lat: 49.2827,
      lng: -123.1207,
    },
    {
      name: 'Seoul',
      country: 'South Korea',
      description: 'Dive into the dynamic culture and cuisine of Seoul.',
      image_url: '/images/cities/seoul.jpg',
      map_url: null,
      lat: 37.5665,
      lng: 126.978,
    },
    {
      name: 'Copenhagen',
      country: 'Denmark',
      description: 'Cycle through the charming streets of Copenhagen.',
      image_url: '/images/cities/copenhagen.jpg',
      map_url: null,
      lat: 55.6761,
      lng: 12.5683,
    },
    {
      name: 'Budapest',
      country: 'Hungary',
      description: 'Marvel at the stunning architecture of Budapest.',
      image_url: '/images/cities/budapest.jpg',
      map_url: null,
      lat: 47.4979,
      lng: 19.0402,
    },
    {
      name: 'Sydney',
      country: 'Australia',
      description: 'Visit the iconic Sydney Opera House and beautiful beaches.',
      image_url: '/images/cities/sydney.jpg',
      map_url: null,
      lat: -33.8688,
      lng: 151.2093,
    },
    {
      name: 'Buenos Aires',
      country: 'Argentina',
      description:
        'Explore the vibrant streets and tango culture of Buenos Aires.',
      image_url: '/images/cities/buenos-aires.jpg',
      map_url: null,
      lat: -34.6037,
      lng: -58.3816,
    },
    {
      name: 'Prague',
      country: 'Czech Republic',
      description: 'Wander through the fairytale streets of Prague.',
      image_url: '/images/cities/prague.jpg',
      map_url: null,
      lat: 50.0755,
      lng: 14.4378,
    },
    {
      name: 'Bangkok',
      country: 'Thailand',
      description: 'Experience the vibrant street life and temples of Bangkok.',
      image_url: '/images/cities/bangkok.jpg',
      map_url: null,
      lat: 13.7563,
      lng: 100.5018,
    },
    {
      name: 'New York',
      country: 'United States',
      description: 'Feel the energy of the city that never sleeps, New York.',
      image_url: '/images/cities/new-york.jpg',
      map_url: null,
      lat: 40.7128,
      lng: -74.006,
    },
    {
      name: 'Berlin',
      country: 'Germany',
      description: 'Discover the dynamic history and culture of Berlin.',
      image_url: '/images/cities/berlin.jpg',
      map_url: null,
      lat: 52.52,
      lng: 13.405,
    },
    {
      name: 'Istanbul',
      country: 'Turkey',
      description: 'Experience the unique blend of East and West in Istanbul.',
      image_url: '/images/cities/istanbul.jpg',
      map_url: null,
      lat: 41.0082,
      lng: 28.9784,
    },
    {
      name: 'Dubai',
      country: 'United Arab Emirates',
      description: 'Marvel at the modern architecture and luxury of Dubai.',
      image_url: '/images/cities/dubai.jpg',
      map_url: null,
      lat: 25.2048,
      lng: 55.2708,
    },
    {
      name: 'Rome',
      country: 'Italy',
      description: 'Walk through the ancient ruins and art of Rome.',
      image_url: '/images/cities/rome.jpg',
      map_url: null,
      lat: 41.9028,
      lng: 12.4964,
    },
    {
      name: 'Edinburgh',
      country: 'Scotland',
      description: 'Explore the historic castles and festivals of Edinburgh.',
      image_url: '/images/cities/edinburgh.jpg',
      map_url: null,
      lat: 55.9533,
      lng: -3.1883,
    },
    {
      name: 'Hanoi',
      country: 'Vietnam',
      description: 'Discover the rich culture and street food of Hanoi.',
      image_url: '/images/cities/hanoi.jpg',
      map_url: null,
      lat: 21.0285,
      lng: 105.8542,
    },
    {
      name: 'Athens',
      country: 'Greece',
      description:
        'Step back in time with a visit to Athens, the cradle of Western civilization.',
      image_url: '/images/cities/athens.jpg',
      map_url: null,
      lat: 37.9838,
      lng: 23.7275,
    },
    {
      name: 'Beijing',
      country: 'China',
      description:
        'Explore the historic landmarks of Beijing, like the Great Wall.',
      image_url: '/images/cities/beijing.jpg',
      map_url: null,
      lat: 39.9042,
      lng: 116.4074,
    },
    {
      name: 'Rio de Janeiro',
      country: 'Brazil',
      description: 'Enjoy the beaches and vibrant culture of Rio de Janeiro.',
      image_url: '/images/cities/rio.jpg',
      map_url: null,
      lat: -22.9068,
      lng: -43.1729,
    },
    {
      name: 'Marrakech',
      country: 'Morocco',
      description: 'Immerse yourself in the bustling markets of Marrakech.',
      image_url: '/images/cities/marrakech.jpg',
      map_url: null,
      lat: 31.6295,
      lng: -7.9811,
    },
    {
      name: 'Stockholm',
      country: 'Sweden',
      description: 'Discover the beauty and history of Stockholm, Sweden.',
      image_url: '/images/cities/stockholm.jpg',
      map_url: null,
      lat: 59.3293,
      lng: 18.0686,
    },
  ];

  for (const city of cities) {
    await sql`
      INSERT INTO cities (
        name,
        country,
        description,
        image_url,
        map_url,
        lat,
        lng

      )
      VALUES (
        ${city.name},
        ${city.country},
        ${city.description},
        ${city.image_url},
        ${city.map_url},
        ${city.lat},
        ${city.lng}
      )
    `;
  }
}

export async function down(sql: Sql) {
  await sql`DELETE FROM cities`;
}
