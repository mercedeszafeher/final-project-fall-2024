import { cache } from 'react';
import { sql } from './connect';

export type City = {
  city_id: number;
  name: string;
  country: string;
  description: string | null;
  image_url: string | null;
  map_url: string | null;
  lat: number | null;
  lng: number | null;
};

export const getCitiesInsecure = cache(async () => {
  const cities = await sql<City[]>`
    SELECT * FROM cities
    ORDER BY name ASC
  `;
  return cities;
});

export const createCityInsecure = cache(
  async (newCity: Omit<City, 'city_id'>) => {
    const [city] = await sql<City[]>`
      INSERT INTO cities (
        name,
        country,
        description,
        image_url,
        map_url,
        lat,
        lng)
      VALUES (
        ${newCity.name},
        ${newCity.country},
        ${newCity.description},
        ${newCity.image_url},
        ${newCity.map_url},
        ${newCity.lat},
        ${newCity.lng})
      RETURNING *
    `;
    return city;
  },
);
