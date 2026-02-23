import { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";
import API from "../services/api";
import { FaChair, FaUser, FaPhone, FaEnvelope, FaCalendarAlt, FaEdit, FaTrash } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

function AdminPanel() {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("plans");
  const [plans, setPlans] = useState([]);
  const [problems, setProblems] = useState([]);
  const [seats, setSeats] = useState([]);
  const [editingPlanId, setEditingPlanId] = useState(null);

  const [planData, setPlanData] = useState({
    name: "",
    durationInMonths: "",
    price: "",
  });

  const [seatCount, setSeatCount] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const plansRes = await API.get("/api/plans");
      if (plansRes.data) setPlans(plansRes.data);
    } catch (error) {
      toast.error("Failed to load plans");
    }

    try {
      const problemsRes = await API.get("/api/problems");
      if (problemsRes.data) setProblems(problemsRes.data);
    } catch (error) {
      toast.error("Failed to load problems");
    }
  };

  const fetchSeatsWithUsers = async () => {
    try {
      const seatsRes = await API.get("/api/seats/admin/details");
      if (seatsRes.data) setSeats(seatsRes.data);
    } catch (error) {
      toast.error("Failed to load seat details");
    }
  };

  const createPlan = async () => {
    try {
      if (!planData.name || !planData.durationInMonths || !planData.price) {
        toast.error("Please fill in all plan details");
        return;
      }

      await API.post("/api/plans", {
        ...planData,
        durationInMonths: parseInt(planData.durationInMonths),
        price: parseInt(planData.price),
      });

      toast.success("Plan created successfully! 🎉");
      setPlanData({ name: "", durationInMonths: "", price: "" });
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create plan");
    }
  };

  const createSeats = async () => {
    try {
      if (!seatCount || seatCount <= 0) {
        toast.error("Please enter a valid number of seats");
        return;
      }

      await API.post("/api/seats/create", {
        totalSeats: parseInt(seatCount),
      });

      toast.success(`${seatCount} seats created successfully! 🎉`);
      setSeatCount("");
      fetchSeatsWithUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create seats");
    }
  };

  const updatePlan = async (planId) => {
    try {
      if (!planData.name || !planData.durationInMonths || !planData.price) {
        toast.error("Please fill in all plan details");
        return;
      }

      await API.put(`/api/plans/${planId}`, {
        name: planData.name,
        durationInMonths: parseInt(planData.durationInMonths),
        price: parseInt(planData.price),
      });

      toast.success("Plan updated successfully! ✏️");
      setPlanData({ name: "", durationInMonths: "", price: "" });
      setEditingPlanId(null);
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update plan");
    }
  };

  const deletePlan = async (planId) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      try {
        await API.delete(`/api/plans/${planId}`);
        toast.success("Plan deleted successfully! 🗑️");
        fetchData();
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to delete plan");
      }
    }
  };

  const deleteSeat = async (seatId) => {
    if (window.confirm("Are you sure you want to remove this seat?")) {
      try {
        await API.delete(`/api/seats/${seatId}`);
        toast.success("Seat removed successfully! 🗑️");
        fetchSeatsWithUsers();
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to remove seat");
      }
    }
  };

  const startEditingPlan = (plan) => {
    setEditingPlanId(plan._id);
    setPlanData({
      name: plan.name,
      durationInMonths: plan.durationInMonths.toString(),
      price: plan.price.toString(),
    });
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        padding: "40px 20px",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h1 style={{ color: "#fff", textAlign: "center", marginBottom: 40, fontSize: "2.5em" }}>
          Admin Control Panel 🎛️
        </h1>

        {/* Tab Navigation */}
        <div
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 32,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {["plans", "seats", "details", "problems"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                if (tab === "details") fetchSeatsWithUsers();
              }}
              style={{
                padding: "12px 24px",
                borderRadius: 8,
                background: activeTab === tab ? "#fff" : "rgba(255,255,255,0.2)",
                color: activeTab === tab ? "#667eea" : "#fff",
                border: "none",
                fontWeight: 600,
                fontSize: 16,
                cursor: "pointer",
                transition: "all 0.3s",
                textTransform: "capitalize",
              }}
            >
              {tab === "plans" && "📋 Plans"}
              {tab === "seats" && "🪑 Seats"}
              {tab === "details" && "👥 Seat Details"}
              {tab === "problems" && "⚠️ Problems"}
            </button>
          ))}
        </div>

        {/* Plans Tab */}
        {activeTab === "plans" && (
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: "40px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ color: "#2575fc", marginBottom: 24 }}>
              📋 {editingPlanId ? "Edit" : "Create"} Membership Plan
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <input
                placeholder="Plan Name (e.g., 1 Month Plan)"
                value={planData.name}
                onChange={(e) => setPlanData({ ...planData, name: e.target.value })}
                style={{ padding: 12, borderRadius: 8, border: "1px solid #2575fc", fontSize: 16 }}
              />
              <input
                type="number"
                placeholder="Duration (Months)"
                value={planData.durationInMonths}
                onChange={(e) => setPlanData({ ...planData, durationInMonths: e.target.value })}
                style={{ padding: 12, borderRadius: 8, border: "1px solid #2575fc", fontSize: 16 }}
              />
              <input
                type="number"
                placeholder="Price (₹)"
                value={planData.price}
                onChange={(e) => setPlanData({ ...planData, price: e.target.value })}
                style={{ padding: 12, borderRadius: 8, border: "1px solid #2575fc", fontSize: 16 }}
              />
              <div style={{ display: "flex", gap: 12 }}>
                <button
                  onClick={() => editingPlanId ? updatePlan(editingPlanId) : createPlan()}
                  style={{
                    flex: 1,
                    padding: "14px 0",
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
                  {editingPlanId ? "Update Plan" : "Create Plan"}
                </button>
                {editingPlanId && (
                  <button
                    onClick={() => {
                      setEditingPlanId(null);
                      setPlanData({ name: "", durationInMonths: "", price: "" });
                    }}
                    style={{
                      padding: "14px 24px",
                      borderRadius: 8,
                      background: "#999",
                      color: "#fff",
                      border: "none",
                      fontWeight: 600,
                      fontSize: 16,
                      cursor: "pointer",
                      marginTop: 8,
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            <hr style={{ margin: "32px 0" }} />

            <h3 style={{ color: "#333", marginBottom: 16 }}>Available Plans:</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
              {plans.map((plan) => (
                <div
                  key={plan._id}
                  style={{
                    background: "#f0f4ff",
                    borderRadius: 12,
                    padding: 20,
                    border: "2px solid #2575fc",
                  }}
                >
                  <h4 style={{ color: "#2575fc", marginBottom: 8 }}>{plan.name}</h4>
                  <p style={{ color: "#666", margin: "4px 0" }}>
                    ⏱️ {plan.durationInMonths} month{plan.durationInMonths > 1 ? "s" : ""}
                  </p>
                  <p style={{ color: "#198754", fontWeight: 600, fontSize: 18, margin: 0, marginBottom: 16 }}>₹{plan.price}</p>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => startEditingPlan(plan)}
                      style={{
                        flex: 1,
                        padding: "8px 12px",
                        borderRadius: 6,
                        background: "#ffc107",
                        color: "#333",
                        border: "none",
                        fontWeight: 600,
                        fontSize: 14,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                      }}
                    >
                      <FaEdit size={12} /> Edit
                    </button>
                    <button
                      onClick={() => deletePlan(plan._id)}
                      style={{
                        flex: 1,
                        padding: "8px 12px",
                        borderRadius: 6,
                        background: "#dc3545",
                        color: "#fff",
                        border: "none",
                        fontWeight: 600,
                        fontSize: 14,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                      }}
                    >
                      <FaTrash size={12} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Seats Tab */}
        {activeTab === "seats" && (
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: "40px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ color: "#2575fc", marginBottom: 24 }}>🪑 Create Seating</h2>
            <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
              <input
                type="number"
                placeholder="Total Number of Seats"
                value={seatCount}
                onChange={(e) => setSeatCount(e.target.value)}
                style={{
                  flex: 1,
                  padding: 12,
                  borderRadius: 8,
                  border: "1px solid #2575fc",
                  fontSize: 16,
                }}
              />
              <button
                onClick={createSeats}
                style={{
                  padding: "12px 32px",
                  borderRadius: 8,
                  background: "#198754",
                  color: "#fff",
                  border: "none",
                  fontWeight: 600,
                  fontSize: 16,
                  cursor: "pointer",
                }}
              >
                Generate Seats
              </button>
            </div>
            <p style={{ color: "#666", fontSize: 14 }}>
              ℹ️ Once seats are created, they cannot be recreated. This system will generate a new seating arrangement.
            </p>
          </div>
        )}

        {/* Seat Details Tab */}
        {activeTab === "details" && (
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: "40px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ color: "#2575fc", marginBottom: 24 }}>👥 Seat & User Details</h2>

            {seats.length === 0 ? (
              <p style={{ color: "#666", textAlign: "center", padding: "40px 0" }}>
                No seats created yet. Please create seats first.
              </p>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: 20,
                }}
              >
                {seats.map((seat) => (
                  <div
                    key={seat._id}
                    style={{
                      background: seat.isBooked ? "#f0f4ff" : "#f9f9f9",
                      borderRadius: 12,
                      padding: 20,
                      border: seat.isBooked ? "2px solid #2575fc" : "2px solid #ddd",
                      transition: "all 0.3s",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                      <FaChair size={24} color={seat.isBooked ? "#2575fc" : "#999"} />
                      <h3 style={{ color: "#333", margin: 0 }}>Seat {seat.seatNumber}</h3>
                      <span
                        style={{
                          marginLeft: "auto",
                          padding: "4px 12px",
                          borderRadius: 20,
                          background: seat.isBooked ? "#d1e7dd" : "#e9ecef",
                          color: seat.isBooked ? "#198754" : "#666",
                          fontSize: 12,
                          fontWeight: 600,
                        }}
                      >
                        {seat.isBooked ? "BOOKED" : "AVAILABLE"}
                      </span>
                    </div>

                    {seat.isBooked && seat.user ? (
                      <>
                        <div style={{ marginBottom: 12, paddingBottom: 12, borderBottom: "1px solid #eee" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                            <FaUser size={16} color="#2575fc" />
                            <span style={{ color: "#333", fontWeight: 600 }}>{seat.user.name}</span>
                          </div>

                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                            <FaEnvelope size={14} color="#2575fc" />
                            <span style={{ color: "#666", fontSize: 14 }}>{seat.user.email}</span>
                          </div>

                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                            <FaPhone size={14} color="#2575fc" />
                            <span style={{ color: "#666", fontSize: 14 }}>
                              {seat.user.countryCode}({seat.user.countryCode === "+91" ? "India" : "Other"}) {seat.user.mobileNumber}
                            </span>
                          </div>
                        </div>

                        <div style={{ background: "#f0f4ff", borderRadius: 8, padding: 12, marginBottom: 12 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                            <FaCalendarAlt size={14} color="#2575fc" />
                            <span style={{ color: "#666", fontSize: 13 }}>
                              Expires: {new Date(seat.membershipExpiry).toLocaleDateString()}
                            </span>
                          </div>
                          <span
                            style={{
                              fontSize: 12,
                              color: new Date(seat.membershipExpiry) > new Date() ? "#198754" : "#dc3545",
                              fontWeight: 600,
                            }}
                          >
                            {new Date(seat.membershipExpiry) > new Date()
                              ? "✓ Active Membership"
                              : "✕ Membership Expired"}
                          </span>
                        </div>

                        <button
                          onClick={() => deleteSeat(seat._id)}
                          style={{
                            width: "100%",
                            padding: "8px 12px",
                            borderRadius: 6,
                            background: "#dc3545",
                            color: "#fff",
                            border: "none",
                            fontWeight: 600,
                            fontSize: 14,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 6,
                          }}
                        >
                          <FaTrash size={12} /> Remove Seat
                        </button>
                      </>
                    ) : (
                      <>
                        <p style={{ color: "#999", textAlign: "center", margin: 0, marginBottom: 12 }}>Not booked yet</p>
                        <button
                          onClick={() => deleteSeat(seat._id)}
                          style={{
                            width: "100%",
                            padding: "8px 12px",
                            borderRadius: 6,
                            background: "#dc3545",
                            color: "#fff",
                            border: "none",
                            fontWeight: 600,
                            fontSize: 14,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 6,
                          }}
                        >
                          <FaTrash size={12} /> Remove Seat
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Problems Tab */}
        {activeTab === "problems" && (
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: "40px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ color: "#dc3545", marginBottom: 24 }}>⚠️ Raised Problems</h2>
            {problems.length === 0 ? (
              <p style={{ color: "#666", textAlign: "center", padding: "40px 0" }}>No problems reported yet.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {problems.map((p) => (
                  <div
                    key={p._id}
                    style={{
                      background: "#f9f9f9",
                      borderRadius: 8,
                      padding: 16,
                      borderLeft: "4px solid #dc3545",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <strong style={{ color: "#2575fc" }}>{p.user?.name || "Unknown"}</strong>
                      <span style={{ color: "#999", fontSize: 12 }}>
                        {new Date(p.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p style={{ color: "#333", margin: 0 }}>{p.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;