import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { FaGoogle } from "react-icons/fa";
function Login() {
  const { login } = useContext(AuthContext);
  const [tab, setTab] = useState("login");
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [signupForm, setSignupForm] = useState({ name: "", username: "", password: "" });

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };
  const handleSignupChange = (e) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    const { data } = await API.post("/api/auth/login", loginForm);
    login(data);
    alert("Login Success");
  };

  const submitSignup = async (e) => {
    e.preventDefault();
    await API.post("/api/auth/register", signupForm);
    alert("Registration successful. Please login.");
    setTab("login");
  };

  // Placeholder for Google login
  const handleGoogleLogin = () => {
    alert("Google login coming soon!");
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "40px auto",
        padding: 32,
        borderRadius: 16,
        background: "#f0f4ff",
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
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
            name="username"
            placeholder="Username"
            value={loginForm.username}
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
          <button
            type="button"
            onClick={handleGoogleLogin}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "12px 0",
              borderRadius: 8,
              background: "#fff",
              color: "#2575fc",
              border: "1px solid #2575fc",
              fontWeight: 600,
              fontSize: 18,
              cursor: "pointer",
              marginTop: 8,
            }}
          >
            <FaGoogle /> Login with Google
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
            style={{ padding: 12, borderRadius: 8, border: "1px solid #2575fc", fontSize: 16 }}
          />
          <input
            name="username"
            placeholder="Username"
            value={signupForm.username}
            onChange={handleSignupChange}
            style={{ padding: 12, borderRadius: 8, border: "1px solid #2575fc", fontSize: 16 }}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={signupForm.password}
            onChange={handleSignupChange}
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
            Sign Up
          </button>
          <button
            type="button"
            onClick={handleGoogleLogin}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "12px 0",
              borderRadius: 8,
              background: "#fff",
              color: "#2575fc",
              border: "1px solid #2575fc",
              fontWeight: 600,
              fontSize: 18,
              cursor: "pointer",
              marginTop: 8,
            }}
          >
            <FaGoogle /> Sign Up with Google
          </button>
        </form>
      )}
    </div>
  );
}

export default Login;