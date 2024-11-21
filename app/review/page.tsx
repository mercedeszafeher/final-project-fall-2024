'use client';

import maplibregl from 'maplibre-gl';
import React, { useEffect, useState } from 'react';
import MapSelector from '../forms/MapForm';
import ReviewForm from '../forms/ReviewForm';

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
  const [mapInstance, setMapInstance] = useState<maplibregl.Map | null>(null);
  const [searchText, setSearchText] = useState('');
  const [user, setUser] = useState<{ id: number } | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

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
    // Fetch recent reviews
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
    if (selectedCity && document.getElementById('city-map')) {
      if (!mapInstance) {
        const map = new maplibregl.Map({
          container: 'city-map',
          style:
            'https://api.maptiler.com/maps/ffa469f8-2d88-47cb-b430-2ec2d399397f/style.json?key=d90g9A5KwVmxFrD7ZGrH',
          center: [selectedCity.lng, selectedCity.lat],
          zoom: 12,
        });
        setMapInstance(map);
      } else {
        mapInstance.setCenter([selectedCity.lng, selectedCity.lat]);
      }
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
        cityId: selectedCity.id,
        cityName: selectedCity.name,
        lng: selectedCity.lng,
        lat: selectedCity.lat,
        ...review,
      };

      try {
        const response = await fetch('/api/reviews', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          alert('Review submitted successfully!');
          window.location.reload();
        } else {
          console.error('Failed to submit review:', await response.text());
        }
      } catch (error) {
        console.error('Error submitting review:', error);
      }
    }
  };

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <div style={{ padding: '20px' }}>
      <h1>Select a City to Review</h1>

      <input
        type="text"
        placeholder="Search cities..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{
          width: '100%',
          padding: '8px',
          marginBottom: '10px',
          borderRadius: '4px',
          border: '1px solid #ddd',
        }}
      />

      <select
        onChange={(e) => handleCitySelect(Number(e.target.value))}
        style={{
          width: '100%',
          padding: '8px',
          marginBottom: '20px',
          borderRadius: '4px',
          border: '1px solid #ddd',
        }}
        defaultValue={DEFAULT_CITY.id}
      >
        <option value={DEFAULT_CITY.id} disabled>
          -- Select a City --
        </option>
        {filteredCities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>

      <div
        id="city-map"
        style={{
          width: '100%',
          height: '400px',
          marginBottom: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
        }}
      />

      {user && selectedCity && selectedCity.id !== -1 && (
        <>
          <h2>Selected City: {selectedCity.name}</h2>
          <ReviewForm
            cityId={selectedCity.id}
            neighborhoodId={null}
            onSubmit={handleReviewSubmit}
          />
        </>
      )}

      {!user && (
        <div>
          <p style={{ color: 'red', marginTop: '20px' }}>
            You need to be logged in to write a review.
          </p>
          <h3>Recent Reviews</h3>
          <ul>
            {reviews.map((review) => (
              <li key={review.id}>
                <strong>{review.cityName}</strong> - {review.rating} Stars
                <p>{review.text}</p>
                <small>
                  Reviewed on: {new Date(review.createdAt).toLocaleString()}
                </small>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReviewPage;
