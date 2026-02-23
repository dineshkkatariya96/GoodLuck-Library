import { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaChair, FaExclamationCircle, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate("/");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      const userMenu = document.querySelector('[data-user-menu]');
      if (userMenu && !userMenu.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showDropdown]);
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

  const userAvatarStyle = {
    width: 45,
    height: 45,
    borderRadius: "50%",
    background: "#fff",
    color: "#dc3545",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    fontWeight: 700,
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    position: "relative",
  };

  const dropdownStyle = {
    position: "absolute",
    top: "100%",
    right: 0,
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    minWidth: 200,
    zIndex: 10000,
    marginTop: 10,
    pointerEvents: "auto",
    overflow: "hidden",
  };

  const dropdownItemStyle = {
    padding: "12px 16px",
    color: "#333",
    display: "flex",
    alignItems: "center",
    gap: 8,
    cursor: "pointer",
    transition: "background 0.2s",
    borderBottom: "1px solid #eee",
    fontSize: 16,
    pointerEvents: "auto",
    userSelect: "none",
    width: "100%",
    textAlign: "left",
    fontFamily: "inherit",
  };

  return (
    <nav style={navStyle}>
      <div style={linksContainerStyle}>
        <NavLink to="/" style={({ isActive }) => ({ ...linkStyle, ...(isActive ? linkHoverStyle : {}) })}>
          <FaHome /> Home
        </NavLink>
        {user && user.role === "admin" ? (
          <>
            <NavLink to="/admin" style={({ isActive }) => ({ ...linkStyle, ...(isActive ? linkHoverStyle : {}) })}>
              <FaHome /> Admin Panel
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/dashboard" style={({ isActive }) => ({ ...linkStyle, ...(isActive ? linkHoverStyle : {}) })}>
              <FaChair /> Seats
            </NavLink>
            <NavLink to="/problem" style={({ isActive }) => ({ ...linkStyle, ...(isActive ? linkHoverStyle : {}) })}>
              <FaExclamationCircle /> Problem
            </NavLink>
          </>
        )}
      </div>

      <div style={{ position: "relative", zIndex: 100 }} data-user-menu>
        {user ? (
          <>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowDropdown(!showDropdown);
              }}
              style={{
                ...userAvatarStyle,
                border: "none",
                padding: 0,
              }}
            >
              {user.name?.charAt(0).toUpperCase()}
            </button>
            {showDropdown && (
              <div
                style={dropdownStyle}
              >
                <div style={{ padding: "12px 16px", color: "#666", fontSize: 14, borderBottom: "1px solid #eee" }}>
                  {user.name}
                </div>
                <button
                  style={{
                    ...dropdownItemStyle,
                    background: "transparent",
                    border: "none",
                    color: "#333",
                    fontWeight: "500",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f4ff")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigate("/profile");
                    setShowDropdown(false);
                  }}
                >
                  <FaUser /> View Profile
                </button>
                <button
                  style={{
                    ...dropdownItemStyle,
                    background: "transparent",
                    border: "none",
                    color: "#333",
                    fontWeight: "500",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f4ff")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowDropdown(false);
                    setTimeout(() => handleLogout(), 100);
                  }}
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <NavLink to="/login" style={({ isActive }) => ({ ...linkStyle, ...(isActive ? linkHoverStyle : {}) })}>
            <FaSignInAlt /> Login
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;