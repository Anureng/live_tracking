import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = ({ carPosition, personPosition , bikePosition }) => {
  const mapStyles = {
    height: '400px',
    width: '100%',
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyAr51UmQaN1JL_c3idricDC6jDCDJPvvW0">
      <GoogleMap mapContainerStyle={mapStyles} center={personPosition} zoom={12}>
        <Marker position={carPosition} label="car"/>
        <Marker position={personPosition} label="user" />
        <Marker position={bikePosition} label="bike" />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
