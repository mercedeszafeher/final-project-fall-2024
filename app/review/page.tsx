'use client';

import maplibregl from 'maplibre-gl';
import React, { useEffect, useRef, useState } from 'react';
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
    if (mapContainerRef.current && selectedCity) {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      const map = new maplibregl.Map({
        container: mapContainerRef.current,
        style:
          'https://api.maptiler.com/maps/ffa469f8-2d88-47cb-b430-2ec2d399397f/style.json?key=' +
          process.env.NEXT_PUBLIC_MAPTILER_API_KEY,
        center: [selectedCity.lng, selectedCity.lat],
        zoom: 12,
      });

      mapInstanceRef.current = map;

      return () => {
        map.remove();
        mapInstanceRef.current = null;
      };
    }
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
          <h2 className="subtitle">Selected City: {selectedCity.name}</h2>
          <ReviewForm
            cityId={selectedCity.id}
            neighborhoodId={null}
            onSubmit={handleReviewSubmit}
          />
        </>
      )}

      {!user && (
        <div>
          <p className={styles.noUserMessage}>
            You need to be logged in to write a review.
          </p>
          <div className={styles.recentReviewsContainer}>
            <h3>Recent Reviews</h3>
            <ul className={styles.reviewList}>
              {reviews.map((review) => (
                <li key={review.id} className={styles.reviewItem}>
                  <strong>{review.cityName}</strong> - {review.rating} Stars
                  <p>{review.text}</p>
                  <small>
                    Reviewed on: {new Date(review.createdAt).toLocaleString()}
                  </small>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewPage;
