import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    await API.post("/api/auth/register", form);
    alert("Registration successful. Please login.");
    navigate("/login");
  };

  return (
    <form
      onSubmit={submit}
      style={{
        maxWidth: 400,
        margin: "40px auto",
        padding: 32,
        borderRadius: 16,
        background: "#f0f4ff",
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <h2 style={{ color: "#2575fc", textAlign: "center" }}>Register</h2>
      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
        style={{ padding: 12, borderRadius: 8, border: "1px solid #2575fc", fontSize: 16 }}
      />
      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        style={{ padding: 12, borderRadius: 8, border: "1px solid #2575fc", fontSize: 16 }}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
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
        Register
      </button>
    </form>
  );
}

export default Register;