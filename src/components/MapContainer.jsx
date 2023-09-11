// "use client"
// import React, { useState, useEffect, useMemo } from 'react';
// import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer, useLoadScript } from '@react-google-maps/api';


// function CarBooking() {

//   const {isLoaded} =useLoadScript({
//     googleMapsApiKey:"AIzaSyAr51UmQaN1JL_c3idricDC6jDCDJPvvW0"
//   })

//   if (!isLoaded) return <div>loading....</div>
//   return <Map/>
// }


// export default CarBooking;


// function Map(props){
  
//   const center =   useMemo(() => ({lat:19.2167, lng:73.1500}), [])
//   return (
//     <GoogleMap zoom={10} center={center }  mapContainerClassName="map-container">
//          <Marker position={center}/>
//     </GoogleMap>
//   )
// }

'use client';

import { useRef, useState } from "react";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";

const center = {
  lat: 7.8731,
  lng: 80.7718,
};

function App() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAr51UmQaN1JL_c3idricDC6jDCDJPvvW0",
    libraries:['places']
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);

  const originRef = useRef();
  const destiantionRef = useRef();

  async function calculateRoute() {
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }
    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }
  const libraries = ["drawing", "places"];
  return isLoaded ? (
    <>
      <div className="searchbox">
        <div className="row">
          <div className="col-lg-4">
            <Autocomplete>
              <input
                type="text"
                name="Origin"
                className="form-control"
                placeholder="Origin"
                ref={originRef}
              />
            </Autocomplete>
          </div>
          <div className="col-lg-4">
            <Autocomplete>
              <input
                type="text"
                name="Destication"
                className="form-control"
                placeholder="Destication"
                ref={destiantionRef}
              />
            </Autocomplete>
          </div>
          <div className="col-lg-2">
            <button
              type="submit"
              name="submit"
              className="btn btn-primary"
              onClick={calculateRoute}
            >
              Search
            </button>
          </div>
          <div className="col-lg-2">
            <button
              type="submit"
              name="clear"
              className="btn btn-danger"
              onClick={clearRoute}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    
      <GoogleMap
        center={center}
        zoom={5}
        mapContainerStyle={{ width: "100%", height: "100vh" }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onLoad={(map) => setMap(map)}
      >
        <Marker position={center} />
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
     
    </>
  ) : (
    <>
    Nothing
    </>
  );
}

export default App;
