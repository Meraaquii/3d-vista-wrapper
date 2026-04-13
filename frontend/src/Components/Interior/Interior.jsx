import React, { useState } from "react";
import "./Interior.css";

const unitData = {
  "4BHK Delux": {
    Modern: "https://salestool.nambiardistrict25.com/meraaquii/360/interior/",
    Luxury: "https://salestool.nambiardistrict25.com/meraaquii/360/interior/",
  },
  "4BHK Luxury": {
    Modern:
      "https://salestool.nambiardistrict25.com/meraaquii/360/D25_salesman/",
    Luxury:
      "https://salestool.nambiardistrict25.com/meraaquii/360/D25_salesman/",
  },
};

const floorPlanImage =
  "https://interactive.meraaquii.com/uploads/proj_img/flat_zoom_spite_url_1751740051_1.png";

function Interior() {
  const [selectedUnit, setSelectedUnit] = useState("4BHK Delux");
  const [selectedStyle, setSelectedStyle] = useState("Modern");
  const [activeView, setActiveView] = useState("Interiors");

  const iframeSrc = unitData[selectedUnit][selectedStyle];

  return (
    <div className="interior-page">
      {/* 360 iframe as background - show only in Interiors view */}
      {activeView === "Interiors" && (
        <div className="interior-iframe-wrapper">
          <iframe
            key={iframeSrc}
            src={iframeSrc}
            title="360 Interior View"
            className="interior-iframe"
            allowFullScreen
            allow="accelerometer; gyroscope; fullscreen"
            frameBorder="0"
          />
        </div>
      )}

      {/* 2D floor plan image - show only in 2D Plans view */}
      {activeView === "2D Plans" && (
        <div className="interior-floorplan-fullview">
          <img
            src={floorPlanImage}
            alt="2D Floor Plan"
            className="interior-floorplan-fullimg"
          />
        </div>
      )}

      {/* Vertical unit tabs on left */}
      <div className="interior-tabs">
        {Object.keys(unitData).map((unit) => (
          <button
            key={unit}
            className={`interior-tab${selectedUnit === unit ? " active" : ""}`}
            onClick={() => setSelectedUnit(unit)}
          >
            <span className="interior-tab-text">{unit}</span>
          </button>
        ))}
      </div>

      {/* 2D Plans / Interiors toggle bottom right */}
      <div className="interior-view-toggle">
        <button
          className={`toggle-btn${activeView === "2D Plans" ? " active" : ""}`}
          onClick={() => setActiveView("2D Plans")}
        >
          2D Plans
        </button>
        <button
          className={`toggle-btn${activeView === "Interiors" ? " active" : ""}`}
          onClick={() => setActiveView("Interiors")}
        >
          Interiors
        </button>
      </div>
    </div>
  );
}

export default Interior;
