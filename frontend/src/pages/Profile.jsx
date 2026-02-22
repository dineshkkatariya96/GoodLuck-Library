import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaUser, FaEnvelope, FaCalendarAlt, FaChair, FaSignOutAlt, FaArrowLeft } from "react-icons/fa";

function Profile() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    logout();
    toast.success("Logged out successfully!");
    setTimeout(() => navigate("/"), 1000);
  };

  const formatDate = (date) => {
    if (!date) return "Not assigned";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDaysRemaining = (expiryDate) => {
    if (!expiryDate) return null;
    const expiry = new Date(expiryDate);
    const now = new Date();
    const daysLeft = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
    return daysLeft > 0 ? daysLeft : 0;
  };

  if (!user) {
    return (
      <div style={{ padding: "40px 20px", textAlign: "center", minHeight: "80vh" }}>
        <h2 style={{ color: "#2575fc" }}>Please log in to view your profile</h2>
      </div>
    );
  }

  const daysRemaining = getDaysRemaining(user.membershipExpiry);
  const membershipStatus = daysRemaining > 0 ? "Active" : "Inactive";

  return (
    <div style={{ padding: "20px", minHeight: "80vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <button
            onClick={() => navigate("/")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 20px",
              background: "rgba(255,255,255,0.2)",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontWeight: 600,
              cursor: "pointer",
              fontSize: 16,
              transition: "background 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.background = "rgba(255,255,255,0.3)")}
            onMouseOut={(e) => (e.target.style.background = "rgba(255,255,255,0.2)")}
          >
            <FaArrowLeft /> Back
          </button>
          <h1 style={{ color: "#fff", fontSize: "2.5em", textAlign: "center", flex: 1 }}>My Profile</h1>
          <div style={{ width: 100 }} />
        </div>

        {/* Main Card */}
        <div style={{
          background: "#fff",
          borderRadius: 20,
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
          overflow: "hidden",
        }}>
          {/* Profile Header */}
          <div style={{
            background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
            padding: "40px 20px",
            textAlign: "center",
            color: "#fff",
          }}>
            <div style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "#fff",
              color: "#dc3545",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 50,
              fontWeight: 700,
              margin: "0 auto 16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}>
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <h2 style={{ fontSize: "1.8em", margin: 0, marginBottom: 8 }}>{user.name}</h2>
            <p style={{ fontSize: "1.1em", margin: 0, opacity: 0.9 }}>User Profile</p>
          </div>

          {/* Profile Details */}
          <div style={{ padding: "40px" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 24,
              marginBottom: 32,
            }}>
              {/* Email Card */}
              <div style={{
                background: "#f0f4ff",
                borderRadius: 12,
                padding: 20,
                border: "2px solid #2575fc",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <FaEnvelope style={{ color: "#2575fc", fontSize: 20 }} />
                  <label style={{ color: "#666", fontWeight: 600, fontSize: 14 }}>Email Address</label>
                </div>
                <p style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "#333" }}>{user.email}</p>
              </div>

              {/* Seat Card */}
              <div style={{
                background: "#f0f4ff",
                borderRadius: 12,
                padding: 20,
                border: "2px solid #2575fc",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <FaChair style={{ color: "#2575fc", fontSize: 20 }} />
                  <label style={{ color: "#666", fontWeight: 600, fontSize: 14 }}>Assigned Seat</label>
                </div>
                <p style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "#333" }}>
                  {user.seatNumber ? `Seat ${user.seatNumber}` : "No seat assigned"}
                </p>
              </div>

              {/* Membership Expiry Card */}
              <div style={{
                background: "#f0f4ff",
                borderRadius: 12,
                padding: 20,
                border: "2px solid #2575fc",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <FaCalendarAlt style={{ color: "#2575fc", fontSize: 20 }} />
                  <label style={{ color: "#666", fontWeight: 600, fontSize: 14 }}>Membership Expiry</label>
                </div>
                <p style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "#333" }}>
                  {formatDate(user.membershipExpiry)}
                </p>
              </div>
            </div>

            {/* Membership Status */}
            {user.seatNumber && (
              <div style={{
                background: membershipStatus === "Active" ? "#d1e7dd" : "#f8d7da",
                border: membershipStatus === "Active" ? "2px solid #198754" : "2px solid #dc3545",
                borderRadius: 12,
                padding: 20,
                marginBottom: 32,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <h3 style={{
                      margin: 0,
                      fontSize: 18,
                      fontWeight: 700,
                      color: membershipStatus === "Active" ? "#198754" : "#dc3545",
                      marginBottom: 4,
                    }}>
                      Membership Status: {membershipStatus}
                    </h3>
                    {daysRemaining > 0 && (
                      <p style={{
                        margin: 0,
                        fontSize: 16,
                        color: membershipStatus === "Active" ? "#198754" : "#dc3545",
                      }}>
                        {daysRemaining} days remaining
                      </p>
                    )}
                  </div>
                  <div style={{
                    fontSize: 40,
                    fontWeight: 700,
                    color: membershipStatus === "Active" ? "#198754" : "#dc3545",
                  }}>
                    {membershipStatus === "Active" ? "✓" : "✕"}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
            }}>
              <button
                onClick={() => navigate("/dashboard")}
                style={{
                  padding: "14px 32px",
                  borderRadius: 8,
                  background: "#2575fc",
                  color: "#fff",
                  border: "none",
                  fontWeight: 600,
                  fontSize: 16,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: "0 4px 12px rgba(37, 117, 252, 0.3)",
                }}
                onMouseOver={(e) => (e.target.style.transform = "translateY(-2px)")}
                onMouseOut={(e) => (e.target.style.transform = "translateY(0)")}
              >
                Go to Dashboard
              </button>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                style={{
                  padding: "14px 32px",
                  borderRadius: 8,
                  background: "#dc3545",
                  color: "#fff",
                  border: "none",
                  fontWeight: 600,
                  fontSize: 16,
                  cursor: isLoggingOut ? "not-allowed" : "pointer",
                  transition: "all 0.2s",
                  boxShadow: "0 4px 12px rgba(220, 53, 69, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  opacity: isLoggingOut ? 0.7 : 1,
                }}
                onMouseOver={(e) => !isLoggingOut && (e.target.style.transform = "translateY(-2px)")}
                onMouseOut={(e) => (e.target.style.transform = "translateY(0)")}
              >
                <FaSignOutAlt /> {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
