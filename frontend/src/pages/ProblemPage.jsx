import { useState } from "react";
import API from "../services/api";

function ProblemPage() {
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await API.post("/api/problems", { message });
    alert("Problem submitted");
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
      <h2 style={{ color: "#2575fc", textAlign: "center" }}>Raise Problem</h2>
      <textarea
        onChange={e => setMessage(e.target.value)}
        style={{ padding: 12, borderRadius: 8, border: "1px solid #2575fc", fontSize: 16, minHeight: 80 }}
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
        Submit
      </button>
    </form>
  );
}

export default ProblemPage;