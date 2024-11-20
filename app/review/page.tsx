'use client';

import maplibregl from 'maplibre-gl';
import React, { useEffect, useState } from 'react';
import MapSelector from '../forms/MapForm';
import ReviewForm from '../forms/ReviewForm';

type City = {
  id?: number;
  name: string;
  lng: number;
  lat: number;
};

const ReviewPage: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [mapInstance, setMapInstance] = useState<maplibregl.Map | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/session');
        if (response.ok) {
          const data = await response.json();
          setUserId(data.userId);
        } else {
          setUserId(null);
        }
      } catch (error) {
        console.error('Error fetching user session:', error);
        setUserId(null);
      }
    };

    fetchUser();
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

  const handleCitySelectFromMap = async (lng: number, lat: number) => {
    try {
      const response = await fetch(
        `https://api.maptiler.com/geocoding/${lng},${lat}.json?key=d90g9A5KwVmxFrD7ZGrH`,
      );
      const data = await response.json();

      const cityFeature = data.features.find(
        (feature: any) =>
          feature.place_type.includes('place') ||
          feature.types?.includes('locality'),
      );
      if (cityFeature) {
        const cityName =
          cityFeature?.text || cityFeature.properties.name || 'Unknown City';

        setSelectedCity({ id: Date.now(), name: cityName, lng, lat });
      } else {
        alert('City not found. Please try a different location.');
      }
    } catch (error) {
      console.error('Error fetching city name from MapTiler API:', error);
    }
  };

  const handleReviewSubmit = async (review: {
    rating: number;
    text: string;
    tags: string[];
  }) => {
    if (selectedCity && userId) {
      const payload = {
        userId,
        cityId: selectedCity?.id || -1,
        cityName: selectedCity?.name || 'Unknown',
        lng: selectedCity.lng || 0,
        lat: selectedCity.lat || 0,
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
          setSelectedCity(null);
        } else {
          console.error('Failed to submit review:', await response.text());
        }
      } catch (error) {
        console.error('Error submitting review:', error);
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {!userId && <p>You must log in to write a review.</p>}

      {!selectedCity && (
        <>
          <h1>Select a City to Review</h1>
          <p>Click on the map to select a city.</p>
          <MapSelector
            onCitySelect={(city) =>
              handleCitySelectFromMap(city.lng || 0, city.lat || 0)
            }
          />
        </>
      )}

      {selectedCity && (
        <>
          <h2>Selected City: {selectedCity.name}</h2>
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
          <ReviewForm
            cityId={selectedCity.id || -1}
            neighborhoodId={null} // Currently set to null
            onSubmit={handleReviewSubmit}
          />
        </>
      )}
    </div>
  );
};

export default ReviewPage;
