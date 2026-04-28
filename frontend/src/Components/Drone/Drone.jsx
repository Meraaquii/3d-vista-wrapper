import React, { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ReactPannellum from "react-pannellum";
import Image10 from "../../assets/images/Dron-5th (Custom).jpg";
import Image11 from "../../assets/images/Dron-10th (Custom).jpg";
import Image12 from "../../assets/images/Dron-15th (Custom).jpg";
import Image13 from "../../assets/images/Dron-20th (Custom).jpg";
import Image14 from "../../assets/images/Dron-25th (Custom).jpg";
import "./Drone.css";

const droneImages = {
  "5TH FLOOR": Image10,
  "10TH FLOOR": Image11,
  "15TH FLOOR": Image12,
  "20TH FLOOR": Image13,
  "25TH FLOOR": Image14,
};

const droneList = [
  "5TH FLOOR",
  "10TH FLOOR",
  "15TH FLOOR",
  "20TH FLOOR",
  "25TH FLOOR",
];

const pannellumConfig = {
  autoRotate: -2,
  autoLoad: true,
  showZoomCtrl: false,
  showFullscreenCtrl: false,
  showControls: false,
};

function Drone() {
  const [selected, setSelected] = useState("5TH FLOOR");
  const [showCard, setShowCard] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleToggle = () => setShowCard((prev) => !prev);
    window.addEventListener("drone:toggle", handleToggle);
    return () => window.removeEventListener("drone:toggle", handleToggle);
  }, []);

  useEffect(() => {
    setLoading(true);
  }, [selected]);

  return (
    <div className="drone-page">
      {/* ── 360° Viewer ── */}
      <div className="drone-iframe-wrapper">
        {loading && (
          <div className="drone-loader">
            <div className="drone-spinner" />
          </div>
        )}
        <ReactPannellum
          key={selected}
          id="droneViewer"
          sceneId="droneScene"
          imageSource={droneImages[selected]}
          config={pannellumConfig}
          style={{
            width: "100%",
            height: "100%",
            visibility: loading ? "hidden" : "visible",
          }}
          onPanoramaLoaded={() => setLoading(false)}
        />
      </div>

      {/* ── Re-open tab ── */}
      {!showCard && (
        <button className="drone-reopen-btn" onClick={() => setShowCard(true)}>
          <IoIosArrowForward />
        </button>
      )}

      {/* ── Sliding Card ── */}
      <div className={`drone-card${showCard ? " visible" : ""}`}>
        <div className="drone-card-toprow">
          <h1 className="drone-title">Drone View</h1>
          <button className="drone-back-btn" onClick={() => setShowCard(false)}>
            <IoIosArrowBack />
          </button>
        </div>

        <div className="drone-panel">
          {droneList.map((item) => (
            <button
              key={item}
              className={`drone-btn${selected === item ? " active" : ""}`}
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

export default Drone;
