// "use client"
// import React, { useState, useEffect } from 'react';
// import { GoogleMap, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
// import axios from 'axios';

// const DirectionsMap = ({ source, destination }) => {
//   const [directions, setDirections] = useState(null);

//   useEffect(() => {
//     const directionsRequest = {
//       origin: source,
//       destination: destination,
//       travelMode: 'DRIVING',
//     };

//     const directionsService = new window.google.maps.DirectionsService();

//     directionsService.route(directionsRequest, (result, status) => {
//       if (status === 'OK') {
//         setDirections(result);
//       }
//     });
//   }, [source, destination]);

//   return (
//     <GoogleMap
//       mapContainerStyle={{ width: '100%', height: '400px' }}
//       zoom={10}
//       center={{ lat: 0, lng: 0 }} // Set to your default center coordinates
//     >
//       {directions && <DirectionsRenderer directions={directions} />}
//     </GoogleMap>
//   );
// };

// export default DirectionsMap;


