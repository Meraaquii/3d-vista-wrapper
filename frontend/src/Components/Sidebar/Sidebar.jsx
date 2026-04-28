import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, Layers, Box, User, Home, Phone, MapPin } from "lucide-react";
import "./Sidebar.css";

const menuItems = [
  { id: "exterior", label: "Exterior", icon: Layers, path: "/exterior" },
  { id: "interior", label: "Interior", icon: Box, path: "/interior" },
  { id: "amenities", label: "Amenities", icon: User, path: "/amenities" },
  { id: "map", label: "Map", icon: MapPin, path: "/map" }, // ✅ fixed
  { id: "drone", label: "Drone", icon: Home, path: "/drone" },
  // { id: "call", label: "Call", icon: Phone, path: "/call" },
];

const LogoImage =
  "https://interactive.meraaquii.com/uploads/proj_img/proj_logo_1770199502_1.png";

function Sidebar() {
  const location = useLocation();
  const [showEntrance, setShowEntrance] = useState(false);

  const handleAmenitiesClick = (e) => {
    if (location.pathname === "/amenities") {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent("amenities:toggle"));
    }
  };

  const handleDronClick = (e) => {
    if (location.pathname === "/drone") {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent("drone:toggle"));
    }
  };

  return (
    <>
      <aside className="sidebar">
        <div className="sidebar-hamburger">
          <img src={LogoImage} alt="Logo" className="sidebar-logo" />
        </div>

        <nav className="sidebar-nav">
          {menuItems.map(({ id, label, icon: Icon, path }) => (
            <NavLink
              key={id}
              to={path}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
              onClick={
                id === "amenities"
                  ? handleAmenitiesClick
                  : id === "drone"
                    ? handleDronClick
                    : undefined
              }
            >
              <span className="nav-icon">
                <Icon size={24} strokeWidth={1.5} />
              </span>
              <span className="nav-label">{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Entrance button — appears next to sidebar when hamburger clicked */}
      {showEntrance && (
        <div className="entrance-popup">
          <button
            className="entrance-btn"
            onClick={() => setShowEntrance(false)}
          >
            Entrance
          </button>
        </div>
      )}
    </>
  );
}

export default Sidebar;
