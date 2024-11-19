import maplibregl from 'maplibre-gl';
import React, { useEffect, useRef } from 'react';

type MapSelectorProps = {
  onCitySelect: (city: { lng: number; lat: number }) => void;
};

const MapSelector: React.FC<MapSelectorProps> = ({ onCitySelect }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainerRef.current!,
      style:
        'https://api.maptiler.com/maps/ffa469f8-2d88-47cb-b430-2ec2d399397f/style.json?key=' +
        process.env.NEXT_PUBLIC_MAPTILER_API_KEY,
      center: [16.3738, 48.2082],
      zoom: 5,
    });

    map.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      onCitySelect({ lng, lat });
    });

    return () => map.remove();
  }, []);

  return (
    <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />
  );
};

export default MapSelector;
