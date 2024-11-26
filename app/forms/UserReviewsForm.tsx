'use client';

import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import styles from './UserReviewsForm.module.scss';

type Review = {
  id: number;
  cityName: string;
  rating: number;
  text: string;
  createdAt: string;
};

type UserReviewsProps = {
  userId: number;
};

const UserReviews: React.FC<UserReviewsProps> = ({ userId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/users/${userId}/reviews`);
        if (response.ok) {
          const data = await response.json();
          setReviews(data.reviews || []);
        } else {
          const errorData = await response.json();
          setError(
            errorData.errors?.[0]?.message || 'Failed to fetch reviews.',
          );
        }
      } catch (err) {
        setError('An error occurred while fetching reviews.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [userId]);

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (error) {
    return <p className={styles.errorMessage}>{error}</p>;
  }

  return (
    <div className={styles.userReviewsContainer}>
      <h2 className={styles.title}>My Reviews</h2>
      {reviews.length === 0 ? (
        <p className={styles.noReviews}>You haven't written any reviews yet.</p>
      ) : (
        <ul className={styles.reviewsList}>
          {reviews.map((review) => (
            <li key={review.id} className={styles.reviewCard}>
              <h3 className={styles.cityName}>{review.cityName}</h3>
              <div className={styles.rating}>
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < review.rating ? styles.starFilled : styles.star
                    }
                  />
                ))}
              </div>
              <p className={styles.reviewText}>{review.text}</p>
              <small className={styles.reviewDate}>
                Reviewed on: {new Date(review.createdAt).toLocaleDateString()}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserReviews;
