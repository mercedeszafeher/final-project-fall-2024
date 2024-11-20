import { cache } from 'react';
import { sql } from './connect';

export type Review = {
  review_id: number;
  user_id: number;
  city_id: number;
  neighborhood_id: number;
  rating: '1' | '2' | '3' | '4' | '5';
  text: string;
  tags: object;
  lng: number | null;
  lat: number | null;
  created_at: Date;
};

export const getReviewsInsecure = cache(async () => {
  const reviews = await sql<Review[]>`
    SELECT * FROM reviews
  `;
  return reviews;
});

export const createReviewInsecure = cache(
  async (newReview: Omit<Review, 'review_id'>) => {
    const [review] = await sql<Review[]>`
    INSERT INTO reviews (
      user_id,
      city_id,
      neighborhood_id,
      lng,
      lat,
      rating,
      text,
      tags,
      created_at
      )
    VALUES (
      ${newReview.user_id},
        ${newReview.city_id},
        ${newReview.neighborhood_id},
        ${newReview.lng},
        ${newReview.lat},
        ${newReview.rating},
        ${newReview.text},
        ${JSON.stringify(newReview.tags)},
        ${newReview.created_at}
      )
    RETURNING *
  `;
    return review;
  },
);
