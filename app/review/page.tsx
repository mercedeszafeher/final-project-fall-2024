'use client';

import maplibregl from 'maplibre-gl';
import React, { useEffect, useRef, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import ReviewForm from '../forms/ReviewForm';
import styles from './Review.module.scss';

type City = {
  id: number;
  name: string;
  lng: number;
  lat: number;
};

type Review = {
  id: number;
  cityName: string;
  rating: number;
  text: string;
  createdAt: string;
};

const DEFAULT_CITY: City = {
  id: -1,
  name: 'Default City',
  lat: 48.8566,
  lng: 2.3522,
};

const ReviewPage: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(DEFAULT_CITY);
  const [user, setUser] = useState<{ id: number } | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [expandedReview, setExpandedReview] = useState<number | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch('/api/session');
        if (response.ok) {
          const data = await response.json();
          setUser({ id: data.userId });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching session:', error);
        setUser(null);
      }
    };

    fetchSession();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('/api/cities');
        if (response.ok) {
          const data = await response.json();
          setCities(data.cities || []);
        } else {
          console.error('Failed to fetch cities:', await response.text());
        }
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews');
        if (response.ok) {
          const data = await response.json();
          setReviews(data.reviews || []);
        } else {
          console.error('Failed to fetch reviews:', await response.text());
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    const fetchMapKeyAndInitializeMap = async () => {
      if (mapContainerRef.current && selectedCity) {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }

        try {
          const response = await fetch('/api/map-key');
          if (!response.ok) {
            throw new Error('Failed to fetch API key');
          }
          const { apiKey } = await response.json();

          const map = new maplibregl.Map({
            container: mapContainerRef.current,
            style: `https://api.maptiler.com/maps/ffa469f8-2d88-47cb-b430-2ec2d399397f/style.json?key=${apiKey}`,
            center: [selectedCity.lng, selectedCity.lat],
            zoom: 10,
          });

          mapInstanceRef.current = map;
        } catch (error) {
          console.error('Error initializing the map:', error);
        }
      }
    };

    fetchMapKeyAndInitializeMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [selectedCity]);

  const handleCitySelect = (cityId: number) => {
    const city = cities.find((city) => city.id === cityId);
    if (city) {
      setSelectedCity(city);
    }
  };

  const handleReviewSubmit = async (review: {
    rating: number;
    text: string;
    tags: string[];
  }) => {
    if (selectedCity && selectedCity.id !== -1) {
      const payload = {
        userId: user?.id,
        cityId: selectedCity.id,
        cityName: selectedCity.name,
        lng: selectedCity.lng,
        lat: selectedCity.lat,
        ...review,
      };

      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Review submitted successfully!');
        setSelectedCity(DEFAULT_CITY);
      }
    }
  };

  const sortedRecentReviews = reviews
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 3);

  return (
    <div className={styles.reviewPageContainer}>
      <h1 className={styles.title}>Select a City to Review</h1>

      <select
        onChange={(e) => handleCitySelect(Number(e.target.value))}
        className={styles.cityDropdown}
        defaultValue={DEFAULT_CITY.id}
      >
        <option value={DEFAULT_CITY.id} disabled>
          -- Select a City --
        </option>
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>

      <div ref={mapContainerRef} className={styles.mapContainer} />

      {user && selectedCity && selectedCity.id !== -1 && (
        <>
          <h2 className={styles.subtitle}>
            Selected City: {selectedCity.name}
          </h2>
          <ReviewForm
            cityId={selectedCity.id}
            neighborhoodId={null}
            onSubmit={handleReviewSubmit}
          />
        </>
      )}

      {!user && (
        <div className={styles.recentReviewsContainer}>
          <p className={styles.noUserMessage}>
            You need to be logged in to write a review.
          </p>
          <h3 className={styles.header}>Recent Reviews</h3>
          <div className={styles.reviewCardsContainer}>
            {sortedRecentReviews.map((review) => (
              <div
                key={`${review.id}-${review.cityName}`}
                className={styles.reviewCard}
              >
                <h4 className={styles.reviewCity}>{review.cityName}</h4>
                <div className={styles.rating}>
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={`star-${review.id}-${i}`}
                      className={
                        i < review.rating ? styles.starFilled : styles.star
                      }
                    />
                  ))}
                </div>
                <p
                  className={`${styles.reviewText} ${
                    expandedReview === review.id ? styles.expanded : ''
                  }`}
                >
                  {review.text}
                </p>
                {review.text.length > 100 && (
                  <button
                    className={styles.seeMoreButton}
                    onClick={() =>
                      setExpandedReview(
                        expandedReview === review.id ? null : review.id,
                      )
                    }
                  >
                    {expandedReview === review.id ? 'See Less' : 'See More'}
                  </button>
                )}
                <br />
                <small className={styles.reviewDate}>
                  Reviewed on: {new Date(review.createdAt).toLocaleString()}
                </small>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewPage;
