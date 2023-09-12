"use client";
import React, { useState, useRef, useEffect } from "react";
import Map from "../components/Map";
import firebase from "firebase/app";
import "firebase/database";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
// import RetrieveData from "@/components/RetrieveData";
const Home = () => {
  const initialCarPosition = { lat: 40.7128, lng: -74.006 }; // New York City
  const initialBikePosition = { lat: 39.7128, lng: -76.006 }; // New York City
  const initialPersonPosition = { lat: 37.0522, lng: -98.2437 }; // Los Angeles

  const [carPosition, setCarPosition] = useState(initialCarPosition);
  const [bikePosition, setBikePosition] = useState(initialBikePosition);
  const [personPosition, setPersonPosition] = useState(initialPersonPosition);
  const moveIntervalRef = useRef(null);

  // const moveCarToPerson = () => {
  //   clearInterval(moveIntervalRef.current);

  //   const totalSteps = 100; // Adjust the total steps for desired animation duration
  //   const stepDuration = 100; // Adjust the duration for each step

  //   const latStep = (personPosition.lat - carPosition.lat) / totalSteps;
  //   const lngStep = (personPosition.lng - carPosition.lng) / totalSteps;

  //   let currentStep = 0;
  //   moveIntervalRef.current = setInterval(() => {
  //     setCarPosition((prevPosition) => ({
  //       lat: prevPosition.lat + latStep,
  //       lng: prevPosition.lng + lngStep,
  //     }));

  //     currentStep++;

  //     if (currentStep >= totalSteps) {
  //       clearInterval(moveIntervalRef.current);
  //     }
  //   }, stepDuration);
  // };

  const setPersonDesiredLocation = () => {
    const newPersonPosition = {
      lat: Math.random() * 20 + 30, // Random latitude between 30 and 50
      lng: Math.random() * 40 - 120, // Random longitude between -120 and -80
    };

    setPersonPosition(newPersonPosition);
  };

  const firebaseConfig = {
    apiKey: "AIzaSyDgxHX5XBgyaMcoxFMwbULqrw46FcmKovo",
    authDomain: "cartracking-398406.firebaseapp.com",
    databaseURL: "https://cartracking-398406-default-rtdb.firebaseio.com",
    projectId: "cartracking-398406",
    storageBucket: "cartracking-398406.appspot.com",
    messagingSenderId: "252178932854",
    appId: "1:252178932854:web:4e1c4ae969a0fd0ecb2b57",
    measurementId: "G-364ERB7R70",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Get a reference to the Realtime Database
  const database = getDatabase(app);

  const moveCarToPerson = () => {
    clearInterval(moveIntervalRef.current);

    const totalSteps = 100; // Adjust the total steps for desired animation duration
    const stepDuration = 100; // Adjust the duration for each step

    const latStep = (personPosition.lat - carPosition.lat) / totalSteps;
    const lngStep = (personPosition.lng - carPosition.lng) / totalSteps;

    let currentStep = 0;
    moveIntervalRef.current = setInterval(() => {
      const newCarPosition = {
        lat: carPosition.lat + latStep,
        lng: carPosition.lng + lngStep,
      };

      // Update car's position in state
      setCarPosition(newCarPosition);
      // setBikePosition(newCarPosition);

      const carLocationRef = ref(database, "carLocation");
      set(carLocationRef, newCarPosition);

      // Update car's position in Firebase Realtime Database
      set(carLocationRef, newCarPosition)
        .then(() => {
          console.log("Car location updated successfully.");
        })
        .catch((error) => {
          console.error("Error updating car location:", error);
        });

      currentStep++;

      if (currentStep >= totalSteps) {
        clearInterval(moveIntervalRef.current);
      }
    }, stepDuration);
  };

  const moveBikeToPerson = () => {
    clearInterval(moveIntervalRef.current);

    const totalSteps = 100; // Adjust the total steps for desired animation duration
    const stepDuration = 100; // Adjust the duration for each step

    const latStep = (personPosition.lat - bikePosition.lat) / totalSteps;
    const lngStep = (personPosition.lng - bikePosition.lng) / totalSteps;

    let currentStep = 0;
    moveIntervalRef.current = setInterval(() => {
      const newCarPosition = {
        lat: bikePosition.lat + latStep,
        lng: bikePosition.lng + lngStep,
      };

      // Update car's position in state
      // setCarPosition(newCarPosition);
      setBikePosition(newCarPosition);

      const carLocationRef = ref(database, "bikeLocation");
      set(carLocationRef, newCarPosition);

      // Update car's position in Firebase Realtime Database
      set(carLocationRef, newCarPosition)
        .then(() => {
          console.log("Car location updated successfully.");
        })
        .catch((error) => {
          console.error("Error updating car location:", error);
        });

      currentStep++;

      if (currentStep >= totalSteps) {
        clearInterval(moveIntervalRef.current);
      }
    }, stepDuration);
  };

  // useEffect(() => {
  //   // Listen for changes in the car's location in the Firebase Realtime Database
  //   const carLocationRef = database.ref("carLocation");
  //   carLocationRef.on("value", (snapshot) => {
  //     const newCarPosition = snapshot.val();
  //     if (newCarPosition) {
  //       setCarPosition(newCarPosition);
  //     }
  //   });

  //   // Clean up the listener when the component unmounts
  //   return () => {
  //     carLocationRef.off("value");
  //   };
  // }, []);

  return (
    <div>
      <h1>Car Movement Demo</h1>
      <button className="bg-white p-2 rounded-xl" onClick={moveCarToPerson}>
        Move Car to Person
      </button>
      <button className="bg-white p-2 rounded-xl" onClick={moveBikeToPerson}>
        Move Bike to Person
      </button>
      <button
        className="bg-white p-2 rounded-xl"
        onClick={setPersonDesiredLocation}
      >
        Set Person Random Location
      </button>
      <Map
        carPosition={carPosition}
        personPosition={personPosition}
        bikePosition={bikePosition}
      />
      {/* <RetrieveData /> */}
    </div>
  );
};

export default Home;
