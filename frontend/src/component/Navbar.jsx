import { Link, NavLink } from "react-router-dom";
import { FaHome, FaChair, FaExclamationCircle, FaSignInAlt } from "react-icons/fa";

function Navbar() {
  const linkStyle = {
    color: "#fff",
    fontWeight: 600,
    fontSize: 18,
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 18px",
    borderRadius: 8,
    transition: "background 0.2s, transform 0.2s",
    textDecoration: "none",
    boxShadow: "0 1px 4px rgba(106,17,203,0.08)",
  };
  const linkHoverStyle = {
    background: "rgba(255,255,255,0.12)",
    color: "#fff",
    transform: "scale(1.08)",
  };
  const navStyle = {
    padding: "16px 32px",
    background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    flexWrap: "wrap",
  };
  const linksContainerStyle = {
    display: "flex",
    gap: 24,
    flexWrap: "wrap",
  };
  return (
    <nav style={navStyle}>
      <div style={linksContainerStyle}>
        <NavLink to="/" style={({ isActive }) => ({ ...linkStyle, ...(isActive ? linkHoverStyle : {}) })}>
          <FaHome /> Home
        </NavLink>
        <NavLink to="/dashboard" style={({ isActive }) => ({ ...linkStyle, ...(isActive ? linkHoverStyle : {}) })}>
          <FaChair /> Seats
        </NavLink>
        <NavLink to="/problem" style={({ isActive }) => ({ ...linkStyle, ...(isActive ? linkHoverStyle : {}) })}>
          <FaExclamationCircle /> Problem
        </NavLink>
      </div>
      <NavLink to="/login" style={({ isActive }) => ({ ...linkStyle, ...(isActive ? linkHoverStyle : {}) })}>
        <FaSignInAlt /> Login
      </NavLink>
    </nav>
  );
}

export default Navbar;