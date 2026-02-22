import { useEffect, useState } from "react";
import toast from "react-hot-toast";
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
        toast.error("Error fetching data");
          // Prototype: fallback to 20 seats if fetch fails
          setSeats(Array.from({ length: 20 }, (_, i) => ({ seatNumber: i + 1, isBooked: false })));
          setPlans([
            { _id: "plan1", name: "1 Month", price: 500, durationInMonths: 1 },
            { _id: "plan2", name: "2 Months", price: 950, durationInMonths: 2 },
            { _id: "plan3", name: "3 Months", price: 1300, durationInMonths: 3 },
            { _id: "plan4", name: "1 Year", price: 4000, durationInMonths: 12 },
          ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Book Seat Function
  const bookSeat = async (seatNumber) => {
    if (!selectedPlan) {
      toast.error("Please select a plan first");
      return;
    }
    try {
      const res = await API.post("/api/seats/book", {
        seatNumber,
        planId: selectedPlan,
      });
      if (res.data && res.data.success) {
        toast.success("Seat booked successfully 🎉");
        
        // Find the selected plan to get expiry info
        const plan = plans.find(p => p._id === selectedPlan);
        if (plan) {
          const expiryDate = new Date(res.data.expiryDate);
          toast.success(`Your membership expires on ${expiryDate.toLocaleDateString()}`);
        }
        
        // Refresh seats to show updated status
        const updatedSeats = await API.get("/api/seats");
        setSeats(updatedSeats.data);
      } else {
        toast.success("Booking submitted. Please check your seat status.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed");
    }
  };

  if (loading) {
      return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
        <h2 style={{ padding: 20, color: "#2575fc", fontSize: "2em" }}>Loading...</h2>
      </div>;
  }

  return (
    <div style={{ padding: "2vw", minHeight: "80vh", boxSizing: "border-box" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", background: "#fff", borderRadius: 16, boxShadow: "0 4px 16px rgba(0,0,0,0.08)", padding: "3vw", boxSizing: "border-box" }}>
        <h2 style={{ color: "#2575fc", fontSize: "2em", textAlign: "center", marginBottom: 24 }}>Select Membership Plan</h2>
        <form onSubmit={e => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <select
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
            style={{
              padding: 12,
              borderRadius: 8,
              border: "1px solid #2575fc",
              fontSize: 16,
              width: "100%",
              background: "#f0f4ff",
              marginBottom: 8,
            }}
            required
          >
            <option value="">-- Select Plan --</option>
            {plans.map((plan) => (
              <option key={plan._id} value={plan._id}>
                {plan.name} ({plan.durationInMonths} Month{plan.durationInMonths > 1 ? "s" : ""}) - ₹{plan.price}
              </option>
            ))}
          </select>
        </form>
        <h2 style={{ color: "#2575fc", fontSize: "1.5em", textAlign: "center", margin: "24px 0 16px 0" }}>Available Seats</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 20,
            width: "100%",
            margin: "auto",
          }}
        >
          {seats.map((seat, idx) => (
            <SeatCard
              key={seat._id || idx}
              seat={seat}
              onBook={bookSeat}
            />
          ))}
        </div>
        {/* Submit button for booking (if needed) */}
        {/* If you want a separate booking form, add here */}
      </div>
    </div>
  );
}

export default Dashboard;