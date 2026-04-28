import React, { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import ReactPannellum from "react-pannellum";
import Image1 from "../../assets/images/Bar_Lounge_v01.jpg";
import Image2 from "../../assets/images/Community_Hall.jpg";
import Image3 from "../../assets/images/Guest_Bedroom_v01.jpg";
import Image4 from "../../assets/images/Gym.jpg";
import Image5 from "../../assets/images/Home Theater.jpg";
import Image6 from "../../assets/images/Indoor_Game.jpg";
import Image7 from "../../assets/images/Senior Citizenroom & Library.jpg";
import Image8 from "../../assets/images/Squash_Court_v01.jpg";
import Image9 from "../../assets/images/Yoga_v01.jpg";

import "./Amenities.css";

// Map amenities to their 360° images
const amenityImages = {
  "Bar Lounge": Image1,
  "Community Hall": Image2,
  "Guest Bedroom": Image3,
  Gym: Image4,
  "Home Theater": Image5,
  "Indoor Game": Image6,
  "Senior Citizenroom & Library": Image7,
  "Squash Court": Image8,
  Yoga: Image9,
};

const amenityList = [
  "Bar Lounge",
  "Community Hall",
  "Guest Bedroom",
  "Gym",
  "Home Theater",
  "Indoor Game",
  "Senior Citizenroom & Library",
  "Squash Court",
  "Yoga",
];

function Amenities({ logoSrc }) {
  const [selected, setSelected] = useState("Bar Lounge");
  const [showCard, setShowCard] = useState(false);
  const [loading, setLoading] = useState(true);

  // Pannellum config
  const pannellumConfig = {
    autoRotate: -2,
    autoLoad: true,
    showZoomCtrl: false,
    showFullscreenCtrl: false,
    showControls: false,
  };

  useEffect(() => {
    setShowCard(true);

    const handleToggle = () => setShowCard((prev) => !prev);
    window.addEventListener("amenities:toggle", handleToggle);
    return () => window.removeEventListener("amenities:toggle", handleToggle);
  }, []);

  // Show loader when switching amenities
  useEffect(() => {
    setLoading(true);
  }, [selected]);

  return (
    <div className="amenities-page">
      {/* 360° Pannellum viewer full background */}
      <div className="amenities-iframe-wrapper">
        {loading && (
          <div className="amenities-loader">
            <div className="amenities-spinner" />
          </div>
        )}
        <ReactPannellum
          key={selected}
          id="amenityViewer"
          sceneId="currentScene"
          imageSource={amenityImages[selected]}
          config={pannellumConfig}
          style={{
            width: "100%",
            height: "100%",
            visibility: loading ? "hidden" : "visible",
          }}
          onPanoramaLoaded={() => setLoading(false)}
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
