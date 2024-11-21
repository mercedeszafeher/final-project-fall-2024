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

const ReviewPage: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [mapInstance, setMapInstance] = useState<maplibregl.Map | null>(null);
  const [searchText, setSearchText] = useState('');

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

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <div style={{ padding: '20px' }}>
      <h1>Select a City to Review</h1>
      <p>Choose a city from the dropdown to center the map.</p>

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
        defaultValue=""
      >
        <option value="" disabled>
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
    </div>
  );
};

export default ReviewPage;
