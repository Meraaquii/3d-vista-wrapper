import React from "react";
import "./Exterior.css";

function Exterior() {
  return (
    <div className="exterior-page">
      <div className="exterior-iframe-wrapper">
        <iframe
          src="https://merakicreation.in/Orizon/NEW_VERSION/"
          title="360 Exterior View"
          className="exterior-iframe"
          allowFullScreen
          allow="accelerometer; gyroscope; fullscreen"
          frameBorder="0"
        />
      </div>
    </div>
  );
}

export default Exterior;
