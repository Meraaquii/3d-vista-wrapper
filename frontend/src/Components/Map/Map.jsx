import React from "react";
import "./Map.css";

function Map() {
  return (
    <div className="map-container">
      <iframe
        src="https://merakicreation.in/srijanMap/"
        title="360 Map View"
        className="map-iframe"
        allowFullScreen
        allow="accelerometer; gyroscope; fullscreen"
        frameBorder="0"
      />
    </div>
  );
}

export default Map;
