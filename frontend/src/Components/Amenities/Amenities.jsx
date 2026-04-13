import React, { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";

import "./Amenities.css";

const IFRAME_URL =
  "https://salestool.nambiardistrict25.com/meraaquii/360/interior/";

const amenityList = [
  "Basketball",
  "Lobby",
  "Skating Ring",
  "Cricket pitch",
  "Kids play area",
  "Swimming Pool",
  "Open Gym",
  "Water feature",
  "Seating Area",
  "Pet Area",
];

function Amenities({ logoSrc }) {
  const [selected, setSelected] = useState("Basketball");
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    setShowCard(true);

    const handleToggle = () => setShowCard((prev) => !prev);
    window.addEventListener("amenities:toggle", handleToggle);
    return () => window.removeEventListener("amenities:toggle", handleToggle);
  }, []);

  return (
    <div className="amenities-page">
      {/* 360° iframe full background */}
      <div className="amenities-iframe-wrapper">
        <iframe
          src={IFRAME_URL}
          className="amenities-iframe"
          title="360° Amenity View"
          allowFullScreen
          allow="accelerometer; gyroscope; fullscreen"
          frameBorder="0"
        />
      </div>

      {/* Selected label */}
      {/* {showCard && <div className="amenities-selected-label">{selected}</div>} */}

      {/* Card — slides in/out */}
      <div className={`amenities-card${showCard ? " visible" : ""}`}>
        <div className="amenities-card-toprow">
          <div className="amenities-logo-box">
            <h1 className="amenities-title">Amenities</h1>
            {/* <img src={LogoImg} alt="Logo" className="amenities-logo" /> */}
          </div>
          <button
            className="amenities-back-btn"
            onClick={() => setShowCard(false)}
          >
            <IoIosArrowBack />
          </button>
        </div>

        <div className="amenities-panel">
          {amenityList.map((item) => (
            <button
              key={item}
              className={`amenity-btn${selected === item ? " active" : ""}`}
              onClick={() => setSelected(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Amenities;
