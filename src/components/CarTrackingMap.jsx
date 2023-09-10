"use client"
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import mapboxgl from 'mapbox-gl';
import { AiFillCar } from 'react-icons/ai'
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox CSS
// import 'tailwindcss/tailwind.css'; // Import Tailwind CSS

// Initialize Mapbox GL with your MapTiler API token
mapboxgl.accessToken = "qPBhJyuDRM7K8yqJpNUe";

const RealTimeTrackingMap = () => {
  const [carLocation, setCarLocation] = useState({ latitude: 37.7749, longitude: -122.4194 });
  const [map, setMap] = useState(null);

  useEffect(() => {
    // Create a WebSocket connection to the server
    const socket = io('http://localhost:3001'); // Replace with your server's WebSocket URL

    // Initialize the Mapbox map
    const mapInstance = new mapboxgl.Map({
      container: 'map', // Replace with the ID of your HTML element
      style: 'https://api.maptiler.com/maps/streets/style.json?key=qPBhJyuDRM7K8yqJpNUe',
      center: [carLocation.longitude, carLocation.latitude],
      zoom: 12,
    });

    setMap(mapInstance);

    // Listen for car location updates from the WebSocket server
    socket.on('carLocation', (location) => {
      setCarLocation(location);

      // Update the car's position on the Mapbox map
      if (map) {
        map.flyTo({ center: [location.longitude, location.latitude], zoom: 12 });
      }
    });

    return () => {
      // Clean up when the component unmounts
      socket.disconnect();
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div id="map" style={{ width: '100%', height: '500px' }}>
      {/* Style the car marker */}
      <div
        className="w-8 h-8 bg-blue-900 rounded-full border-2 border-white shadow-lg"
        style={{
          transform: 'translate(-50%, -50%)', // Center the marker on its position
          position: 'absolute',
          left: `${(carLocation.longitude - -122.4194) * 10000}%`, // Adjust based on your map's bounds
          top: `${(carLocation.latitude - 37.7749) * 10000}%`, // Adjust based on your map's bounds
        }}
      >
        <AiFillCar/>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga ab reprehenderit dolore mollitia perspiciatis. Adipisci nobis sed aperiam iusto quidem, praesentium aut quasi corrupti qui quia sequi eveniet dicta quod?
      </div>
    </div>
  );
};

export default RealTimeTrackingMap;
