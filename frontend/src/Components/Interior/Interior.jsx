import React, { useState } from "react";
//import FloorPlan from "../../assets/images/isometric_spite 3D.png";
import "./Interior.css";

const unitData = {
  "3BHK Type A": {
    Modern: "https://merakicreation.in/Orizon/INTERIOR/",
    Luxury: "https://merakicreation.in/Orizon/INTERIOR/",
    // floorPlan:
    //   "https://interactive.meraaquii.com/uploads/proj_img/flat_zoom_spite_url_1751740051_1.png",
  },
};

function Interior() {
  const [selectedUnit, setSelectedUnit] = useState("3BHK Type A");
  const [selectedStyle, setSelectedStyle] = useState("Modern");
  const [activeView, setActiveView] = useState("Interiors");

  const iframeSrc = unitData[selectedUnit][selectedStyle];
  const floorPlanSrc = unitData[selectedUnit].floorPlan;

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
        <div className="interior-floorplan-fullview" key={selectedUnit}>
          <img
            src="https://res.cloudinary.com/dyzeu8bz6/image/upload/v1778327974/isometric_spite_3D_ziwkzn.png"
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
