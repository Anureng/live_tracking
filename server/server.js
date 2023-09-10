// server.js
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());

app.use(
  cors({
    origin:"http://localhost:3000", // Replace with your allowed origins
  })
);

// Store the car's current position (initially at the first coordinate)
// let carPosition = { latitude: 19.2173692, longitude: 73.1659614 };
let carPosition = { latitude: 37.7749, longitude: -122.4194 };
const route = [
  { latitude: 37.7749, longitude: -122.4194 },
  { latitude: 37.7755, longitude: -122.4185 },
  // Add more coordinates for the route
];

const updateCarPosition = () => {
  // Simulate the car moving along the predefined route
  carPosition = route.shift(); // Get the next coordinate
  route.push(carPosition); // Add it back to the end of the route

  // Emit the new car position to connected clients
  io.emit("carLocation", carPosition);
};

// Set up WebSocket communication
io.on("connection", (socket) => {
  console.log("A user connected");

  // Send the initial car position to the client when they connect
  socket.emit("carLocation", carPosition);

  // Simulate periodic updates of the car's position
  const intervalId = setInterval(() => {
    updateCarPosition();
  }, 5000); // Update every 5 seconds

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
    clearInterval(intervalId);
  });
});

server.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
