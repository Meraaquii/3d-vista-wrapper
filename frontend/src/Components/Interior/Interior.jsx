import React, { useState } from "react";
import "./Interior.css";

const unitData = {
  "Type A {Tower 1&2 }": {
    url: "https://merakicreation.in/Orizon/INTERIOR/Tower_1_2_Typ_Flat_A/",
  },

  "Type A {Tower 3&4 }": {
    url: "https://merakicreation.in/Orizon/INTERIOR/Tower_3_4_Typ_Flat_A/",
  },

  "Type B {Tower 5&6 }": {
    url: "https://merakicreation.in/Orizon/INTERIOR/Tower_5_6_Typ_Flat_B/",
  },

  "Type C {Tower 1&2 }": {
    url: "https://merakicreation.in/Orizon/INTERIOR/Tower_1_2_Typ_Flat_C/",
  },
  "Type C {Tower 3&4 }": {
    url: "https://merakicreation.in/Orizon/INTERIOR/Tower_3_4_Typ_Flat_C/",
  },
};

const PlanURL = {
  "Type A {Tower 1&2 }":
    "https://res.cloudinary.com/dyzeu8bz6/image/upload/v1778327974/isometric_spite_3D_ziwkzn.png",

  "Type A {Tower 3&4 }":
    "https://res.cloudinary.com/dyzeu8bz6/image/upload/v1778327974/isometric_spite_3D_ziwkzn.png",

  "Type B {Tower 5&6 }":
    "https://res.cloudinary.com/dyzeu8bz6/image/upload/v1778493910/isometric_spite_1_cfrgdh.png",

  "Type C {Tower 1&2 }":
    "https://res.cloudinary.com/dyzeu8bz6/image/upload/v1778509007/isometric_spite2_1_afkxql.png",

  "Type C {Tower 3&4 }":
    "https://res.cloudinary.com/dyzeu8bz6/image/upload/v1778508646/isometric_spite1_t4wy86.png",
};

function Interior() {
  const [selectedUnit, setSelectedUnit] = useState("Type A {Tower 1&2 }");

  const [activeView, setActiveView] = useState("Interiors");

  const iframeSrc = unitData[selectedUnit].url;

  const floorPlanSrc = PlanURL[selectedUnit];

  return (
    <div className="interior-page">
      {/* 360 iframe */}
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

      {/* 2D Plans */}
      {activeView === "2D Plans" && (
        <div className="interior-floorplan-fullview">
          <img
            src={floorPlanSrc}
            alt="2D Floor Plan"
            className="interior-floorplan-fullimg"
          />
        </div>
      )}

      {/* Left Tabs */}
      <div className="interior-tabs">
        {Object.keys(unitData).map((unit) => (
          <button
            key={unit}
            className={`interior-tab ${selectedUnit === unit ? "active" : ""}`}
            onClick={() => setSelectedUnit(unit)}
          >
            <span className="interior-tab-text">{unit}</span>
          </button>
        ))}
      </div>

      {/* Bottom Toggle */}
      <div className="interior-view-toggle">
        <button
          className={`toggle-btn ${activeView === "2D Plans" ? "active" : ""}`}
          onClick={() => setActiveView("2D Plans")}
        >
          2D Plans
        </button>

        <button
          className={`toggle-btn ${activeView === "Interiors" ? "active" : ""}`}
          onClick={() => setActiveView("Interiors")}
        >
          Interiors
        </button>
      </div>
    </div>
  );
}

export default Interior;
