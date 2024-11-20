import maplibregl, { Map as MapLibreMap } from 'maplibre-gl';
import React, { useEffect, useRef, useState } from 'react';

type MapSelectorProps = {
  onCitySelect: (city: { name: string; lng: number; lat: number }) => void;
};

const MapSelector: React.FC<MapSelectorProps> = ({ onCitySelect }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [lng, setLng] = useState(16.3889);
  const [lat, setLat] = useState(48.16502);
  const [zoom, setZoom] = useState(14);

  useEffect(() => {
    // Initialize the map
    const map = new maplibregl.Map({
      container: mapContainerRef.current!,
      style:
        'https://api.maptiler.com/maps/ffa469f8-2d88-47cb-b430-2ec2d399397f/style.json?key=d90g9A5KwVmxFrD7ZGrH',
      center: [lng, lat],
      zoom: zoom,
    });

    // Handle map clicks to select a location
    map.on('click', async (e) => {
      const { lng, lat } = e.lngLat;

      // Fetch city name via reverse geocoding
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
        const cityName = cityFeature.text || cityFeature.properties.name || 'Unknown City';
        onCitySelect({ name: cityName, lng, lat });
      } else {
        alert('City not found. Please click closer to a city.');
      }
    });

    return () => map.remove();
  }, []);

  return (
    <div>
      <div
        ref={mapContainerRef}
        style={{
          width: '100%',
          height: '400px',
          borderRadius: '8px',
        }}
      />
    </div>
  );
};

export default MapSelector;
