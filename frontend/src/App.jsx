import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Exterior from "./Components/Exterior/Exterior";
import Interior from "./Components/Interior/Interior";
import Amenities from "./Components/Amenities/Amenities";
import Drone from "./Components/Drone/Drone";
import Call from "./Components/Call/Call";
import Map from "./Components/Map/Map";

import "./App.css";

function App() {
  return (
    <BrowserRouter basename="/360_interior">
      <div className="app">
        <main className="main-content">
          <Routes>
            {/* Home page */}
            <Route path="/" element={<Interior />} />

            {/* Other pages */}
            <Route path="/exterior" element={<Exterior />} />
            <Route path="/amenities" element={<Amenities />} />
            <Route path="/map" element={<Map />} />
            <Route path="/drone" element={<Drone />} />
            <Route path="/call" element={<Call />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
