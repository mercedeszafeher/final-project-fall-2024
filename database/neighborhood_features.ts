import { cache } from 'react';
import type { Session } from '../migrations/00013-sessions';
import { sql } from './connect';

export type NeighborhoodFeature = {
  neighborhood_id: number;
  feature_id: number;
  score: '1' | '2' | '3' | '4' | '5';
};

export const getNeighborhoodFeaturesInsecure = cache(async () => {
  const neighborhoodFeatures = await sql<NeighborhoodFeature[]>`
    SELECT * FROM neighborhood_features
  `;
  return neighborhoodFeatures;
});

export const createNeighborhoodFeatureInsecure = cache(
  async (newNeighborhoodFeature: NeighborhoodFeature) => {
    const [neighborhoodFeature] = await sql<NeighborhoodFeature[]>`
      INSERT INTO neighborhood_features (neighborhood_id, feature_id, score)
      VALUES (${newNeighborhoodFeature.neighborhood_id}, ${newNeighborhoodFeature.feature_id}, ${newNeighborhoodFeature.score})
      RETURNING *
    `;
    return neighborhoodFeature;
  },
);
