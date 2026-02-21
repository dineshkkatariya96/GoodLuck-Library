import { useEffect, useState } from "react";
import API from "../services/api";
import SeatCard from "../component/SeatCard";

function Dashboard() {
  const [seats, setSeats] = useState([]);
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch seats & plans
  useEffect(() => {
    const fetchData = async () => {
      try {
        const seatRes = await API.get("/api/seats");
        const planRes = await API.get("/api/plans");

        setSeats(seatRes.data);
        setPlans(planRes.data);
      } catch (error) {
        alert("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Book Seat Function
  const bookSeat = async (seatNumber) => {
    if (!selectedPlan) {
      return alert("Please select a plan first");
    }

    try {
      await API.post("/api/seats/book", {
        seatNumber,
        planId: selectedPlan,
      });

      alert("Seat booked successfully 🎉");

      // Update seat state without reload
      setSeats((prevSeats) =>
        prevSeats.map((seat) =>
          seat.seatNumber === seatNumber
            ? { ...seat, isBooked: true }
            : seat
        )
      );
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    }
  };

  if (loading) {
    return <h2 style={{ padding: 20 }}>Loading...</h2>;
  }

  return (
    <div style={{ padding: 20 }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h2 style={{ color: "#2575fc" }}>Select Membership Plan</h2>
        <select
          value={selectedPlan}
          onChange={(e) => setSelectedPlan(e.target.value)}
          style={{
            padding: 12,
            marginBottom: 24,
            borderRadius: 8,
            border: "1px solid #2575fc",
            fontSize: 16,
            width: "100%",
            background: "#f0f4ff",
          }}
        >
          <option value="">-- Select Plan --</option>
          {plans.map((plan) => (
            <option key={plan._id} value={plan._id}>
              {plan.name} ({plan.durationInMonths} Month) - ₹{plan.price}
            </option>
          ))}
        </select>

        <h2 style={{ color: "#2575fc" }}>Available Seats</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 20,
          }}
        >
          {seats.map((seat) => (
            <SeatCard
              key={seat._id}
              seat={seat}
              onBook={bookSeat}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;