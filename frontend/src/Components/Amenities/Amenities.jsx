import React, {
  Suspense,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";

import "./Amenities.css";

const AUTO_PLAY_SPEED = 0.5;
const RESUME_DELAY_MS = 3000;

// Same image URLs
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

// 360 Sphere
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

// Scene
function Scene({
  autoRotate,
  url,
  onLoaded,
  lastInteractionRef,
  setAutoRotate,
}) {
  const controlsRef = useRef();

  const { camera, gl } = useThree();

  // RESET CAMERA WHEN IMAGE CHANGES
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

  // SMOOTH ZOOM
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();

      lastInteractionRef.current = Date.now();

      setAutoRotate(false);

      camera.fov += e.deltaY * 0.03;

      camera.fov = Math.max(30, Math.min(100, camera.fov));

      camera.updateProjectionMatrix();
    };

    gl.domElement.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      gl.domElement.removeEventListener("wheel", handleWheel);
    };
  }, [camera, gl, lastInteractionRef, setAutoRotate]);

  return (
    <>
      <PanoramaSphere url={url} onLoaded={onLoaded} />

      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={-0.5}
        autoRotate={autoRotate}
        autoRotateSpeed={AUTO_PLAY_SPEED}
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

function Amenities() {
  const [selected, setSelected] = useState("Bar Lounge");
  const [showCard, setShowCard] = useState(true);
  const [loading, setLoading] = useState(true);

  const [autoRotate, setAutoRotate] = useState(true);

  const containerRef = useRef(null);

  const lastInteractionRef = useRef(Date.now());
  const isPointerDownRef = useRef(false);
  const autoRotateRef = useRef(autoRotate);

  // keep latest autoRotate value
  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  // show loader when image changes
  useEffect(() => {
    setLoading(true);
  }, [selected]);

  // toggle panel
  useEffect(() => {
    const handleToggle = () => {
      setShowCard((prev) => !prev);
    };

    window.addEventListener("amenities:toggle", handleToggle);

    return () => {
      window.removeEventListener("amenities:toggle", handleToggle);
    };
  }, []);

  // pointer controls
  const handlePointerDown = useCallback(() => {
    isPointerDownRef.current = true;
    lastInteractionRef.current = Date.now();

    setAutoRotate(false);
  }, []);

  const handlePointerUp = useCallback(() => {
    isPointerDownRef.current = false;
    lastInteractionRef.current = Date.now();
  }, []);

  // resume auto rotate
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

  // attach listeners
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
    <div className="amenities-page">
      {/* Viewer */}
      <div ref={containerRef} className="amenities-iframe-wrapper">
        {loading && (
          <div className="amenities-loader">
            <div className="amenities-spinner" />
          </div>
        )}

        <Canvas
          dpr={window.devicePixelRatio}
          camera={{
            position: [0, 0, 0.1],
            fov: 75,
          }}
          style={{
            width: "100%",
            height: "100%",
            visibility: loading ? "hidden" : "visible",
          }}
        >
          <Suspense fallback={null}>
            <Scene
              autoRotate={autoRotate}
              url={amenityImages[selected]}
              onLoaded={() => setLoading(false)}
              lastInteractionRef={lastInteractionRef}
              setAutoRotate={setAutoRotate}
            />
          </Suspense>
        </Canvas>
      </div>

      {!showCard && (
        <button
          className="amenities-trigger-btn"
          type="button"
          onClick={() => setShowCard(true)}
          aria-label="Show amenities"
          title="Show amenities"
        >
          <IoIosArrowForward />
          <span>Amenities</span>
        </button>
      )}

      {/* Side Card */}
      <div className={`amenities-card${showCard ? " visible" : ""}`}>
        <div className="amenities-card-toprow">
          <div className="amenities-logo-box">
            <h1 className="amenities-title">Amenities</h1>
          </div>

          <button
            className="amenities-back-btn"
            type="button"
            onClick={() => setShowCard(false)}
            aria-label="Hide amenities"
            title="Hide amenities"
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
