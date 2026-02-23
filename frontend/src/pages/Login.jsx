import { useState, useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
function Login() {
  const { user, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tab, setTab] = useState("login");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  // Changed username to email to match backend expectation
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({ 
    name: "", 
    email: "", 
    password: "",
    countryCode: "+91",
    mobileNumber: ""
  });

  const countryCodes = [
    { code: "+91", countryName: "India" },
    { code: "+1", countryName: "USA/Canada" },
    { code: "+44", countryName: "UK" },
    { code: "+86", countryName: "China" },
    { code: "+81", countryName: "Japan" },
    { code: "+61", countryName: "Australia" },
    { code: "+33", countryName: "France" },
    { code: "+49", countryName: "Germany" },
    { code: "+39", countryName: "Italy" },
    { code: "+34", countryName: "Spain" },
  ];

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };
  
  const handleSignupChange = (e) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    setIsLoggingOut(true);
    logout();
    toast.success("Logged out successfully!");
    setTimeout(() => window.location.reload(), 1000);
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/api/auth/login", loginForm);
      login(data);
      // Success Alert
      toast.success("Logged in successfully!");
      // Redirect to home after successful login
      setTimeout(() => navigate("/"), 1000); 
    } catch (error) {
      // 404 "User not found" handler for first-time users
      if (error.response && error.response.status === 404) {
        toast.error("You are not registered. Please sign up first and login again.");
        setTab("signup"); // Automatically switch to signup tab
      } else {
        toast.error(error.response?.data?.message || "Login failed");
      }
    }
  };

  const submitSignup = async (e) => {
    e.preventDefault();
    try {
      if (!signupForm.mobileNumber) {
        toast.error("Please enter a mobile number");
        return;
      }
      
      if (signupForm.mobileNumber.length < 7) {
        toast.error("Mobile number should be at least 7 digits");
        return;
      }

      await API.post("/api/auth/register", signupForm);
      toast.success("Registration successful! Your data has been saved. Please login now.");
      setTab("login");
      setSignupForm({ name: "", email: "", password: "", countryCode: "+91", mobileNumber: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  // If user is already logged in, show profile view
  if (user) {
    return (
      <div
        style={{
          maxWidth: 500,
          width: "90vw",
          margin: "40px auto",
          padding: "40px 30px",
          borderRadius: 16,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
          boxSizing: "border-box",
          color: "#fff",
        }}
      >
        <div style={{
          textAlign: "center",
          marginBottom: 32,
        }}>
          <div style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "#fff",
            color: "#dc3545",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 40,
            fontWeight: 700,
            margin: "0 auto 16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}>
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <h2 style={{ margin: 0, fontSize: "1.8em", marginBottom: 8 }}>
            Welcome back, {user.name}!
          </h2>
          <p style={{ margin: 0, fontSize: "1.1em", opacity: 0.95 }}>
            You are already logged in
          </p>
        </div>

        {/* User Details */}
        <div style={{
          background: "rgba(255,255,255,0.15)",
          borderRadius: 12,
          padding: 20,
          marginBottom: 24,
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.2)",
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 16,
            paddingBottom: 12,
            borderBottom: "1px solid rgba(255,255,255,0.2)",
          }}>
            <FaUser style={{ fontSize: 18 }} />
            <div>
              <p style={{ margin: 0, fontSize: 12, opacity: 0.8 }}>Full Name</p>
              <p style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>{user.name}</p>
            </div>
          </div>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}>
            <span style={{ fontSize: 18 }}>✉️</span>
            <div>
              <p style={{ margin: 0, fontSize: 12, opacity: 0.8 }}>Email Address</p>
              <p style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>{user.email}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}>
          <button
            onClick={() => navigate("/profile")}
            style={{
              width: "100%",
              padding: "14px 0",
              borderRadius: 8,
              background: "#fff",
              color: "#667eea",
              border: "none",
              fontWeight: 600,
              fontSize: 16,
              cursor: "pointer",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
            onMouseOver={(e) => (e.target.style.transform = "translateY(-2px)")}
            onMouseOut={(e) => (e.target.style.transform = "translateY(0)")}
          >
            <FaUser /> View Full Profile
          </button>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            style={{
              width: "100%",
              padding: "14px 0",
              borderRadius: 8,
              background: "rgba(255,255,255,0.2)",
              color: "#fff",
              border: "2px solid rgba(255,255,255,0.4)",
              fontWeight: 600,
              fontSize: 16,
              cursor: isLoggingOut ? "not-allowed" : "pointer",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              opacity: isLoggingOut ? 0.7 : 1,
            }}
            onMouseOver={(e) => !isLoggingOut && (e.target.style.background = "rgba(255,255,255,0.3)")}
            onMouseOut={(e) => (e.target.style.background = "rgba(255,255,255,0.2)")}
          >
            <FaSignOutAlt /> {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    );
  }

  return (
      <div
        style={{
          maxWidth: 550,
          width: "90vw",
          margin: "40px auto",
          padding: "6vw",
          borderRadius: 16,
          background: "#f0f4ff",
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          boxSizing: "border-box",
        }}
      >
      <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 24 }}>
        <button
          style={{
            padding: "10px 24px",
            borderRadius: 8,
            background: tab === "login" ? "#2575fc" : "#e0e0e0",
            color: tab === "login" ? "#fff" : "#333",
            border: "none",
            fontWeight: 600,
            fontSize: 16,
            cursor: "pointer",
            boxShadow: tab === "login" ? "0 2px 8px rgba(37,117,252,0.12)" : "none",
            transition: "background 0.2s",
          }}
          onClick={() => setTab("login")}
        >
          Login
        </button>
        <button
          style={{
            padding: "10px 24px",
            borderRadius: 8,
            background: tab === "signup" ? "#2575fc" : "#e0e0e0",
            color: tab === "signup" ? "#fff" : "#333",
            border: "none",
            fontWeight: 600,
            fontSize: 16,
            cursor: "pointer",
            boxShadow: tab === "signup" ? "0 2px 8px rgba(37,117,252,0.12)" : "none",
            transition: "background 0.2s",
          }}
          onClick={() => setTab("signup")}
        >
          Sign Up
        </button>
      </div>

      {tab === "login" ? (
        <form onSubmit={submitLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h2 style={{ color: "#2575fc", textAlign: "center" }}>Login</h2>
          <input
            name="email"
            placeholder="Email"
            value={loginForm.email}
            onChange={handleLoginChange}
            style={{ padding: 12, borderRadius: 8, border: "1px solid #2575fc", fontSize: 16 }}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={loginForm.password}
            onChange={handleLoginChange}
            style={{ padding: 12, borderRadius: 8, border: "1px solid #2575fc", fontSize: 16 }}
          />
          <button
            style={{
              padding: "12px 0",
              borderRadius: 8,
              background: "#2575fc",
              color: "#fff",
              border: "none",
              fontWeight: 600,
              fontSize: 18,
              cursor: "pointer",
              marginTop: 8,
            }}
          >
            Login
          </button>
        </form>
      ) : (
        <form onSubmit={submitSignup} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h2 style={{ color: "#2575fc", textAlign: "center" }}>Sign Up</h2>
          <input
            name="name"
            placeholder="Name"
            value={signupForm.name}
            onChange={handleSignupChange}
            required
            style={{ padding: 12, borderRadius: 8, border: "1px solid #2575fc", fontSize: 16 }}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={signupForm.email}
            onChange={handleSignupChange}
            required
            style={{ padding: 12, borderRadius: 8, border: "1px solid #2575fc", fontSize: 16 }}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={signupForm.password}
            onChange={handleSignupChange}
            required
            style={{ padding: 12, borderRadius: 8, border: "1px solid #2575fc", fontSize: 16 }}
          />

          {/* Country Code and Mobile Number */}
          <div style={{ display: "flex", gap: 12 }}>
            <select
              name="countryCode"
              value={signupForm.countryCode}
              onChange={handleSignupChange}
              style={{
                flex: 0.4,
                padding: 12,
                borderRadius: 8,
                border: "1px solid #2575fc",
                fontSize: 16,
                background: "#fff",
                cursor: "pointer",
              }}
            >
              {countryCodes.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.code}({country.countryName})
                </option>
              ))}
            </select>

            <input
              name="mobileNumber"
              type="tel"
              placeholder="Mobile Number"
              value={signupForm.mobileNumber}
              onChange={handleSignupChange}
              required
              style={{
                flex: 0.6,
                padding: 12,
                borderRadius: 8,
                border: "1px solid #2575fc",
                fontSize: 16,
              }}
            />
          </div>

          <button
            style={{
              padding: "12px 0",
              borderRadius: 8,
              background: "#2575fc",
              color: "#fff",
              border: "none",
              fontWeight: 600,
              fontSize: 18,
              cursor: "pointer",
              marginTop: 8,
            }}
          >
            Sign Up
          </button>
        </form>
      )}
    </div>
  );
}

export default Login;