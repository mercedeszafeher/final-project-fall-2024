import { cache } from 'react';
import type { Session } from '../migrations/00013-sessions';
import { sql } from './connect';

export type Neighborhood = {
  neighborhood_id: number;
  name: string;
  city_id: number;
  description: string | null;
  popularity: number;
};

export const getNeighborhoodsInsecure = cache(async () => {
  const neighborhoods = await sql<Neighborhood[]>`
    SELECT * FROM neighborhoods
  `;
  return neighborhoods;
});

export const createNeighborhoodInsecure = cache(
  async (newNeighborhood: Omit<Neighborhood, 'neighborhood_id'>) => {
    const [neighborhood] = await sql<Neighborhood[]>`
    INSERT INTO neighborhoods (name, city_id, description, popularity)
    VALUES (${newNeighborhood.name}, ${newNeighborhood.city_id}, ${newNeighborhood.description}, ${newNeighborhood.popularity})
    RETURNING *
  `;
    return neighborhood;
  },
);
