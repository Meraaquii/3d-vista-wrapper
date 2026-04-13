import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import Exterior from "./Components/Exterior/Exterior";
import Interior from "./Components/Interior/Interior";
import Amenities from "./Components/Amenities/Amenities";
import Drone from "./Components/Drone/Drone";
import Call from "./Components/Call/Call";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/exterior" replace />} />
            <Route path="/exterior" element={<Exterior />} />
            <Route path="/interior" element={<Interior />} />
            <Route path="/amenities" element={<Amenities />} />
            <Route path="/drone" element={<Drone />} />
            <Route path="/call" element={<Call />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
