import React from "react";
import "./Drone.css";

function Drone() {
  return (
    <div className="drone-container">
      <iframe
        src="https://salestool.nambiardistrict25.com/meraaquii/360/interior/"
        className="drone-iframe"
        title="Drone View"
        allowFullScreen
      />
    </div>
  );
}

export default Drone;
