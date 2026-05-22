import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Layers, Box, Building2, MapPin } from "lucide-react";
import { GiDeliveryDrone } from "react-icons/gi";

import "./Sidebar.css";

const menuItems = [
  {
    id: "exterior",
    label: "Exterior",
    icon: Layers,
    path: "/exterior",
  },
  {
    id: "interior",
    label: "Interior",
    icon: Box,
    path: "/interior",
  },
  {
    id: "amenities",
    label: "Amenities",
    icon: Building2,
    path: "/amenities",
  },
  {
    id: "map",
    label: "Map",
    icon: MapPin,
    path: "/map",
  },
  {
    id: "drone",
    label: "Drone",
    icon: GiDeliveryDrone,
    path: "/drone",
  },
];

const LogoImage =
  "https://interactive.meraaquii.com/uploads/proj_img/proj_logo_1770199502_1.png";

function Sidebar() {
  const location = useLocation();
  const [showEntrance, setShowEntrance] = useState(false);

  // Amenities toggle
  const handleAmenitiesClick = (e) => {
    if (location.pathname === "/amenities") {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent("amenities:toggle"));
    }
  };

  // Drone toggle
  const handleDroneClick = (e) => {
    if (location.pathname === "/drone") {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent("drone:toggle"));
    }
  };

  return (
    <>
      <aside className="sidebar">
        {/* Logo */}
        <div className="sidebar-hamburger">
          <img src={LogoImage} alt="Logo" className="sidebar-logo" />
        </div>

        {/* Navigation */}
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
                    ? handleDroneClick
                    : undefined
              }
            >
              <span className="nav-icon">
                {id === "drone" ? (
                  <Icon size={24} />
                ) : (
                  <Icon size={24} strokeWidth={1.8} />
                )}
              </span>

              <span className="nav-label">{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Entrance Popup */}
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
