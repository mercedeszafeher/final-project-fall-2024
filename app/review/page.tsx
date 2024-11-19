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
  const [mapInstance, setMapInstance] = useState<maplibregl.Map | null>(null);

  useEffect(() => {
    if (selectedCity && document.getElementById('city-map')) {
      if (!mapInstance) {
        const map = new maplibregl.Map({
          container: 'city-map',
          style:
            'https://api.maptiler.com/maps/ffa469f8-2d88-47cb-b430-2ec2d399397f/style.json?key=d90g9A5KwVmxFrD7ZGrH',
          center: [selectedCity.lng, selectedCity.lat],
          zoom: 14,
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

      const cityFeature = data.features.find((feature: any) =>
        feature.place_type.includes('place'),
      );
      const cityName = cityFeature?.text || 'Unknown City';

      setSelectedCity({ name: cityName, lng, lat });
    } catch (error) {
      console.error('Error fetching city name from MapTiler API:', error);
    }
  };

  const handleReviewSubmit = async (review: {
    rating: number;
    text: string;
    tags: string[];
  }) => {
    if (selectedCity) {
      const payload = {
        cityId: selectedCity.id,
        neighborhoodId: null,
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
      {!selectedCity && (
        <>
          <h1>Select a City to Review</h1>
          <p>Click on the map to select a city.</p>
          <MapSelector
            onCitySelect={(city) => handleCitySelectFromMap(city.lng, city.lat)}
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
          <ReviewForm onSubmit={handleReviewSubmit} />
        </>
      )}
    </div>
  );
};

export default ReviewPage;
