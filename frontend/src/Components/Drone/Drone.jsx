import React, {
  Suspense,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaHospital, FaShoppingBag, FaSubway } from "react-icons/fa";
import {
  FaBuilding,
  FaHome,
  FaCity,
  FaTree,
  FaMapMarkerAlt,
  FaRoad,
  FaWarehouse,
  FaKey,
} from "react-icons/fa";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture, Html } from "@react-three/drei";
import * as THREE from "three";

import "./Drone.css";

const AUTO_PLAY_SPEED = 0.5;
const RESUME_DELAY_MS = 3000;

// iconColor field added for animated pin-dot & distance text coloring
const LANDMARKS_25TH = [
  {
    id: "project 1",
    name: "Sherwood Estate",
    distance: "2.1 KM",
    icon: <FaBuilding />,
    iconColor: "#3a86ff",
    bobDur: "3.4s",
    bobDelay: "0s",
    position: [-650, -30, 720],
  },
  {
    id: "project 2",
    name: "Nirvana",
    distance: "2 KM",
    icon: <FaBuilding />,
    iconColor: "#8338ec",
    bobDur: "2.9s",
    bobDelay: "0.25s",
    position: [220, -10, -300],
  },
  {
    id: "project 3",
    name: "Southwinds",
    distance: "2.9 KM",
    icon: <FaBuilding />,
    iconColor: "#ff006e",
    bobDur: "3.7s",
    bobDelay: "0.5s",
    position: [60, 5, -400],
  },
  {
    id: "project 4",
    name: "Botanica",
    distance: "800 M",
    icon: <FaBuilding />,
    iconColor: "#10b981",
    bobDur: "3.1s",
    bobDelay: "0.75s",
    position: [250, -25, 70],
  },
  {
    id: "project 5",
    name: "Wood Square",
    distance: "3 KM",
    icon: <FaBuilding />,
    iconColor: "#f59e0b",
    bobDur: "3.5s",
    bobDelay: "1s",
    position: [-650, 12, 320],
  },
  {
    id: "project 6",
    name: "Gate 1",
    distance: null,
    icon: <FaBuilding />,
    iconColor: "#94a3b8",
    isGate: true,
    bobDur: "3.2s",
    bobDelay: "1.2s",
    position: [220, -190, -350],
  },
  {
    id: "project 7",
    name: "Gate 2",
    distance: null,
    icon: <FaBuilding />,
    iconColor: "#94a3b8",
    isGate: true,
    bobDur: "3.6s",
    bobDelay: "1.4s",
    position: [-270, -300, -30],
  },
  {
    id: "project 8",
    name: "Ozone",
    distance: "4.2 KM",
    icon: <FaBuilding />,
    iconColor: "#06b6d4",
    bobDur: "3.0s",
    bobDelay: "0.6s",
    position: [-670, 40, 720],
  },
  {
    id: "project 9",
    name: "Anu Bhoomi",
    distance: "10 KM",
    icon: <FaBuilding />,
    iconColor: "#e73e3f",
    bobDur: "3.8s",
    bobDelay: "0.9s",
    position: [-130, -5, 720],
  },
];

const droneImages = {
  "5TH FLOOR":
    "https://res.cloudinary.com/dyzeu8bz6/image/upload/v1778328013/Dron-5th_Custom_uo4mqf.jpg",
  "10TH FLOOR":
    "https://res.cloudinary.com/dyzeu8bz6/image/upload/v1778328013/Dron-10th_Custom_sbd0iw.jpg",
  "15TH FLOOR":
    "https://res.cloudinary.com/dyzeu8bz6/image/upload/v1778328014/Dron-15th_Custom_nnue9l.jpg",
  "20TH FLOOR":
    "https://res.cloudinary.com/dyzeu8bz6/image/upload/v1778328014/Dron-20th_Custom_sk6hep.jpg",
  "25TH FLOOR":
    "https://res.cloudinary.com/dyzeu8bz6/image/upload/v1778328015/Dron-25th_Custom_kfs8tf.jpg",
};

const droneList = [
  "5TH FLOOR",
  "10TH FLOOR",
  "15TH FLOOR",
  "20TH FLOOR",
  "25TH FLOOR",
];

function PanoramaSphere({ url, onLoaded }) {
  const texture = useTexture(url);

  useEffect(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      onLoaded?.();
    }
  }, [texture, onLoaded]);

  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial
        map={texture}
        side={THREE.BackSide}
        toneMapped={false}
      />
    </mesh>
  );
}

function LandmarkCard({ landmark }) {
  const { name, distance, icon, iconColor, isGate, bobDur, bobDelay } =
    landmark;

  return (
    <div
      className={`map-card-hotspot entrance${isGate ? " gate-card" : ""}`}
      style={{
        "--bob-dur": bobDur,
        "--bob-delay": bobDelay,
      }}
    >
      <div className="map-card-body">
        {/* Icon circle — shown when icon prop exists OR iconColor given */}
        {icon && (
          <span
            className="map-card-icon"
            style={{ color: iconColor, "--icon-bg": iconColor + "28" }}
          >
            {icon}
          </span>
        )}

        <div className="map-card-content">
          <div className="map-card-title">{name}</div>
          {distance && (
            <div
              className="map-card-distance"
              style={{ color: isGate ? "#94a3b8" : iconColor }}
            >
              {distance}
            </div>
          )}
        </div>
      </div>

      {/* Arrow + stem + pulsing pin */}
      <div className="map-card-arrow-wrap">
        <div
          className="map-card-arrow"
          style={isGate ? { borderTopColor: "#ffffff" } : {}}
        />
        <div className="map-card-stem" />
        <div
          className="pin-dot"
          style={{
            background: "#e73e3f",
            color: "#e73e3f",
          }}
        />
      </div>
    </div>
  );
}

function Scene({
  autoRotate,
  url,
  selectedFloor,
  onLoaded,
  lastInteractionRef,
  setAutoRotate,
}) {
  const controlsRef = useRef();
  const { camera, gl } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 0.1);
    camera.fov = 75;
    camera.updateProjectionMatrix();

    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.reset();
      controlsRef.current.update();
    }
  }, [url, camera]);

  useEffect(() => {
    const domEl = gl.domElement;
    let prevDistance = null;

    // Mouse wheel event
    const handleWheel = (e) => {
      e.preventDefault();
      lastInteractionRef.current = Date.now();
      setAutoRotate(false);

      camera.fov += e.deltaY * 0.03;
      camera.fov = Math.max(30, Math.min(100, camera.fov));
      camera.updateProjectionMatrix();
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length === 2) {
        if (e.cancelable) e.preventDefault();

        lastInteractionRef.current = Date.now();
        setAutoRotate(false);

        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (prevDistance !== null) {
          const delta = prevDistance - distance;

          camera.fov += delta * 0.15;
          camera.fov = Math.max(30, Math.min(100, camera.fov));
          camera.updateProjectionMatrix();
        }
        prevDistance = distance;
      }
    };

    const handleTouchEnd = () => {
      prevDistance = null;
    };

    // Mobile + Touch TV event registrations
    domEl.addEventListener("wheel", handleWheel, { passive: false });
    domEl.addEventListener("touchmove", handleTouchMove, { passive: false });
    domEl.addEventListener("touchend", handleTouchEnd, { passive: true });
    domEl.addEventListener("touchcancel", handleTouchEnd, { passive: true });

    return () => {
      domEl.removeEventListener("wheel", handleWheel);
      domEl.removeEventListener("touchmove", handleTouchMove);
      domEl.removeEventListener("touchend", handleTouchEnd);
      domEl.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [camera, gl, lastInteractionRef, setAutoRotate]);

  return (
    <>
      <PanoramaSphere url={url} onLoaded={onLoaded} />

      {selectedFloor === "25TH FLOOR" &&
        LANDMARKS_25TH.map((landmark) => (
          <Html
            key={landmark.id}
            position={landmark.position}
            center
            portal={{ current: gl.domElement.parentElement }}
            style={{ zIndex: 1 }}
          >
            <LandmarkCard landmark={landmark} />
          </Html>
        ))}

      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={-0.5}
        autoRotate={autoRotate}
        autoRotateSpeed={AUTO_PLAY_SPEED}
        /* ─── CRITICAL MOBILE / TV FIXES ─── */
        enableTouchZoom={false}
        touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.NONE }}
        onStart={() => {
          lastInteractionRef.current = Date.now();
          setAutoRotate(false);
        }}
        onEnd={() => {
          lastInteractionRef.current = Date.now();
        }}
      />
    </>
  );
}

function Drone() {
  const [selected, setSelected] = useState("5TH FLOOR");
  const [showCard, setShowCard] = useState(true);
  const [loading, setLoading] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);

  const containerRef = useRef(null);
  const lastInteractionRef = useRef(Date.now());
  const isPointerDownRef = useRef(false);
  const autoRotateRef = useRef(autoRotate);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    setLoading(true);
  }, [selected]);

  useEffect(() => {
    const handleToggle = () => setShowCard((prev) => !prev);
    window.addEventListener("drone:toggle", handleToggle);
    return () => window.removeEventListener("drone:toggle", handleToggle);
  }, []);

  const handlePointerDown = useCallback(() => {
    isPointerDownRef.current = true;
    lastInteractionRef.current = Date.now();
    setAutoRotate(false);
  }, []);

  const handlePointerUp = useCallback(() => {
    isPointerDownRef.current = false;
    lastInteractionRef.current = Date.now();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPointerDownRef.current) return;
      const elapsed = Date.now() - lastInteractionRef.current;
      if (elapsed > RESUME_DELAY_MS && !autoRotateRef.current) {
        setAutoRotate(true);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener("pointerdown", handlePointerDown);
    el.addEventListener("pointerup", handlePointerUp);
    el.addEventListener("pointerleave", handlePointerUp);

    return () => {
      el.removeEventListener("pointerdown", handlePointerDown);
      el.removeEventListener("pointerup", handlePointerUp);
      el.removeEventListener("pointerleave", handlePointerUp);
    };
  }, [handlePointerDown, handlePointerUp]);

  return (
    <div className="drone-page">
      <div ref={containerRef} className="drone-iframe-wrapper">
        {loading && (
          <div className="drone-loader">
            <div className="drone-spinner" />
          </div>
        )}

        <Canvas
          dpr={window.devicePixelRatio}
          camera={{ position: [0, 0, 0.1], fov: 75 }}
          style={{
            width: "100%",
            height: "100%",
            visibility: loading ? "hidden" : "visible",
          }}
        >
          <Suspense fallback={null}>
            <Scene
              autoRotate={autoRotate}
              url={droneImages[selected]}
              selectedFloor={selected}
              onLoaded={() => setLoading(false)}
              lastInteractionRef={lastInteractionRef}
              setAutoRotate={setAutoRotate}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* {!showCard && (
        <button className="drone-reopen-btn" onClick={() => setShowCard(true)}>
          <IoIosArrowForward />
        </button>
      )} */}

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
