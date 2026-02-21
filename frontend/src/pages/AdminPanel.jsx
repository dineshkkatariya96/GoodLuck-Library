import { useEffect, useState } from "react";
import API from "../services/api";

function AdminPanel() {
  const [plans, setPlans] = useState([]);
  const [problems, setProblems] = useState([]);

  const [planData, setPlanData] = useState({
    name: "",
    durationInMonths: "",
    price: "",
  });

  const [seatCount, setSeatCount] = useState("");

  useEffect(() => {
    API.get("/api/plans").then(res => setPlans(res.data));
    API.get("/api/problems").then(res => setProblems(res.data));
  }, []);

  const createPlan = async () => {
    await API.post("/api/plans", planData);
    alert("Plan Created");
    window.location.reload();
  };

  const createSeats = async () => {
    await API.post("/api/seats/create", {
      totalSeats: seatCount,
    });
    alert("Seats Created");
  };

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "40px auto",
        padding: 32,
        borderRadius: 16,
        background: "#f0f4ff",
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
      }}
    >
      <h2 style={{ color: "#2575fc", textAlign: "center" }}>Admin Panel</h2>

      <div style={{ marginBottom: 32 }}>
        <h3 style={{ color: "#198754" }}>Create Plan</h3>
        <input
          placeholder="Plan Name"
          onChange={(e) =>
            setPlanData({ ...planData, name: e.target.value })
          }
          style={{ padding: 12, borderRadius: 8, border: "1px solid #2575fc", fontSize: 16, marginBottom: 8, width: "100%" }}
        />
        <input
          placeholder="Duration (Months)"
          onChange={(e) =>
            setPlanData({ ...planData, durationInMonths: e.target.value })
          }
          style={{ padding: 12, borderRadius: 8, border: "1px solid #2575fc", fontSize: 16, marginBottom: 8, width: "100%" }}
        />
        <input
          placeholder="Price"
          onChange={(e) =>
            setPlanData({ ...planData, price: e.target.value })
          }
          style={{ padding: 12, borderRadius: 8, border: "1px solid #2575fc", fontSize: 16, marginBottom: 8, width: "100%" }}
        />
        <button
          onClick={createPlan}
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
            width: "100%",
          }}
        >
          Create Plan
        </button>
      </div>

      <hr />

      <div style={{ marginBottom: 32 }}>
        <h3 style={{ color: "#198754" }}>Create Seats</h3>
        <input
          placeholder="Total Seats"
          onChange={(e) => setSeatCount(e.target.value)}
          style={{ padding: 12, borderRadius: 8, border: "1px solid #2575fc", fontSize: 16, marginBottom: 8, width: "100%" }}
        />
        <button
          onClick={createSeats}
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
            width: "100%",
          }}
        >
          Generate Seats
        </button>
      </div>

      <hr />

      <div>
        <h3 style={{ color: "#dc3545" }}>Raised Problems</h3>
        {problems.map((p) => (
          <div
            key={p._id}
            style={{
              background: "#fff",
              borderRadius: 8,
              padding: 12,
              marginBottom: 8,
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <strong style={{ color: "#2575fc" }}>{p.user?.name}</strong>: {p.message}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPanel;