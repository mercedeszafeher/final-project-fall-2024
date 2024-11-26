import { cache } from 'react';
import { sql } from './connect';

export type Review = {
  review_id: number;
  user_id: number;
  city_id: number;
  city_name: string;
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
    SELECT
      reviews.id AS review_id,
      reviews.user_id,
      reviews.city_id,
      cities.name AS city_name,
      reviews.neighborhood_id,
      reviews.rating,
      reviews.text,
      reviews.tags,
      reviews.lng,
      reviews.lat,
      reviews.created_at
    FROM reviews
    INNER JOIN cities ON reviews.city_id = cities.id
    ORDER BY reviews.created_at DESC
  `;
  return reviews;
});

export const createReviewInsecure = cache(
  async (newReview: Omit<Review, 'review_id'>) => {
    const [review] = await sql<Review[]>`
    INSERT INTO reviews (
      user_id,
      city_id,
      city_name,
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
      ${newReview.city_name},
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

export const getReviewsByUserId = cache(async (userId: number) => {
  const reviews = await sql<Review[]>`
    SELECT
      reviews.id,
      reviews.user_id,
      reviews.city_id,
      reviews.neighborhood_id,
      reviews.rating,
      reviews.text,
      reviews.tags,
      reviews.lng,
      reviews.lat,
      reviews.created_at,
      cities.name AS city_name,
      cities.country AS city_country
    FROM
      reviews
    INNER JOIN
      cities ON reviews.city_id = cities.id
    WHERE
      reviews.user_id = ${userId}
    ORDER BY
      reviews.created_at DESC
  `;

  return reviews;
});
