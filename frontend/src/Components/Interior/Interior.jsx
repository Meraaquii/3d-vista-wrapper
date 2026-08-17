import React, { useState } from "react";
import "./Interior.css";

const unitData = {
  "Type A [Tower 1&2 ]": {
    url: "https://merakicreation.in/Orizon/INTERIOR/Tower_1_2_Typ_Flat_A/",
  },

  "Type A [Tower 3&4 ]": {
    url: "https://merakicreation.in/Orizon/INTERIOR/Tower_3_4_Typ_Flat_A/",
  },

  "Type B [Tower 5&6 ]": {
    url: "https://merakicreation.in/Orizon/INTERIOR/Tower_5_6_Typ_Flat_B/",
  },

  "Type F [Tower 1&2 ]": {
    url: "https://merakicreation.in/Orizon/INTERIOR/Tower_1_2_Typ_Flat_C/",
  },
  "Type C [Tower 3&4 ]": {
    url: "https://merakicreation.in/Orizon/INTERIOR/Tower_3_4_Typ_Flat_C/",
  },
  "Type C [Tower 5&6 ]": {
    url: "https://merakicreation.in/Orizon/INTERIOR/Tower_5_6_Typ_Flat_C/",
  },
};

const PlanURL = {
  "Type A [Tower 1&2 ]":
    "https://res.cloudinary.com/dyzeu8bz6/image/upload/v1786538152/Tower_1_2___Unit_A___1_xsieg0.png",

  "Type A [Tower 3&4 ]":
    "https://res.cloudinary.com/dyzeu8bz6/image/upload/v1786538245/Tower_04___Unit_A_1_eof9iy.png",

  "Type B [Tower 5&6 ]":
    "https://res.cloudinary.com/dyzeu8bz6/image/upload/v1786538539/Tower_06___Unit_B___1_ipgdxp.png",

  "Type F [Tower 1&2 ]":
    "https://res.cloudinary.com/dyzeu8bz6/image/upload/v1786538198/Tower_1_2___Unit_F___1_ybk6nk.png",

  "Type C [Tower 3&4 ]":
    "https://res.cloudinary.com/dyzeu8bz6/image/upload/v1786538596/Tower_04___Unit_C_1_oie5sa.png",

  "Type C [Tower 5&6 ]":
    "https://res.cloudinary.com/dyzeu8bz6/image/upload/v1778655776/Tower_5_6_Typ_Flat_C_1_must23.png",
};

function Interior() {
  const [selectedUnit, setSelectedUnit] = useState("Type A [Tower 1&2 ]");

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
