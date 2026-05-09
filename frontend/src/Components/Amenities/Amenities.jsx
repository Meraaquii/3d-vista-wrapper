import React, { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import ReactPannellum from "react-pannellum";

import "./Amenities.css";

// Map amenities to their 360° images
const amenityImages = {
  "Bar Lounge":
    "https://res.cloudinary.com/dyzeu8bz6/image/upload/v1778327977/Bar_Lounge_v01_j5zkbq.jpg",
  "Community Hall":
    "https://res.cloudinary.com/dyzeu8bz6/image/upload/v1778327977/Community_Hall_bs966b.jpg",
  "Guest Bedroom":
    "https://res.cloudinary.com/dyzeu8bz6/image/upload/v1778327975/Guest_Bedroom_v01_rvckxj.jpg",
  Gym: "https://res.cloudinary.com/dyzeu8bz6/image/upload/v1778327976/Gym_bv7pvb.jpg",
  "Home Theater":
    "https://res.cloudinary.com/dyzeu8bz6/image/upload/v1778327976/Home_Theater_dpxmn6.jpg",
  "Indoor Game":
    "https://res.cloudinary.com/dyzeu8bz6/image/upload/v1778327975/Indoor_Game_q6fpz8.jpg",
  "Senior Citizenroom & Library":
    "https://res.cloudinary.com/dyzeu8bz6/image/upload/v1778327976/Senior_Citizenroom_Library_rvy7ol.jpg",
  "Squash Court":
    "https://res.cloudinary.com/dyzeu8bz6/image/upload/v1778327975/Squash_Court_v01_jwovp2.jpg",
  Yoga: "https://res.cloudinary.com/dyzeu8bz6/image/upload/v1778327976/Yoga_v01_sdxay9.jpg",
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
