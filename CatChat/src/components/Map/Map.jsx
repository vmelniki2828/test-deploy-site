import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const Map = ({ coordinates }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style:
        'https://api.maptiler.com/maps/basic/style.json?key=f8Cs8LxPh9wuo2L0PwLr',
      center: [coordinates.longitude, coordinates.latitude],
      zoom: 12,
    });

    new maplibregl.Marker()
      .setLngLat([coordinates.longitude, coordinates.latitude])
      .addTo(map);

    return () => map.remove();
  }, [coordinates]);

  return (
    <div ref={mapContainerRef} style={{ width: '240px', height: '84px' }} />
  );
};

export default Map;
