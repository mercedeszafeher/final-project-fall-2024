import { cache } from 'react';
import type { Session } from '../migrations/00013-sessions';
import { sql } from './connect';

export type City = {
  city_id: number;
  name: string;
  country: string;
  description: string | null;
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
    INSERT INTO cities (name, country, description, map_url)
    VALUES (${newCity.name}, ${newCity.country}, ${newCity.description}, ${newCity.map_url})
    RETURNING *
  `;
    return city;
  },
);
