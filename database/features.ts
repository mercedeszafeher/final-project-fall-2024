import { cache } from 'react';
import type { Session } from '../migrations/00010-sessions';
import { sql } from './connect';

export type Feature = {
  feature_id: number;
  name: string;
  description: string | null;
};

export const getFeaturesInsecure = cache(async () => {
  const features = await sql<Feature[]>`
    SELECT * FROM features
  `;
  return features;
});

export const createFeatureInsecure = cache(
  async (newFeature: Omit<Feature, 'feature_id'>) => {
    const [feature] = await sql<Feature[]>`
    INSERT INTO features (name, description)
    VALUES (${newFeature.name}, ${newFeature.description})
    RETURNING *
  `;
    return feature;
  },
);
