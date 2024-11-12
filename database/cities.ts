import { cache } from 'react';
import { sql } from './connect';

export type City = {
  city_id: number;
  name: string;
  country: string;
  description: string | null;
  image_url: string | null;
  map_url: string | null;
};

export const getCitiesInsecure = cache(async () => {
  const cities = await sql<City[]>`
    SELECT * FROM cities
  `;
  return cities;
});

export const createCityInsecure = cache(
  async (newCity: Omit<City, 'city_id'>) => {
    const [city] = await sql<City[]>`
    INSERT INTO cities (name, country, description, image_url, map_url)
    VALUES (${newCity.name}, ${newCity.country}, ${newCity.description}, ${newCity.image_url}, ${newCity.map_url})
    RETURNING *
  `;
    return city;
  },
);
