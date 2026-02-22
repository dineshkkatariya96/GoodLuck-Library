import { FaChair } from "react-icons/fa";
import { useState } from "react";

function SeatCard({ seat, onBook }) {
  const { seatNumber, isBooked, membershipExpiry } = seat;
  const [showExpiry, setShowExpiry] = useState(false);
  
  const getExpiryInfo = () => {
    if (membershipExpiry) {
      const expiryDate = new Date(membershipExpiry);
      const daysLeft = Math.ceil((expiryDate - new Date()) / (1000 * 60 * 60 * 24));
      return { expiryDate, daysLeft };
    }
    return null;
  };
  
  const expiryInfo = getExpiryInfo();
  
  return (
    <div
      style={{
        background: isBooked ? "#f8d7da" : "#d1e7dd",
        border: isBooked ? "2px solid #dc3545" : "2px solid #198754",
        borderRadius: 12,
        padding: "2vw",
        textAlign: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        minWidth: 120,
        maxWidth: 220,
        width: "100%",
        margin: "auto",
        cursor: isBooked ? "pointer" : "default",
        transition: "background 0.2s",
      }}
      onMouseEnter={() => isBooked && setShowExpiry(true)}
      onMouseLeave={() => setShowExpiry(false)}
    >
      <FaChair size={32} color={isBooked ? "#dc3545" : "#198754"} />
      <div style={{ fontWeight: 700, fontSize: 20 }}>Seat {seatNumber}</div>
      <div style={{ color: isBooked ? "#dc3545" : "#198754", fontWeight: 600 }}>
        {isBooked ? "Booked" : "Available"}
      </div>
      {!isBooked && (
        <button
          style={{
            marginTop: 8,
            padding: "8px 16px",
            borderRadius: 8,
            background: "#2575fc",
            color: "#fff",
            border: "none",
            fontWeight: 600,
            cursor: "pointer",
            transition: "background 0.2s",
            width: "100%",
            maxWidth: 120,
          }}
          onClick={() => onBook(seatNumber)}
        >
          Book
        </button>
      )}
      {isBooked && showExpiry && expiryInfo && (
        <div style={{
          marginTop: 8,
          fontSize: 12,
          color: "#dc3545",
          fontWeight: 500,
          padding: "8px",
          background: "rgba(220, 53, 69, 0.1)",
          borderRadius: 6,
          width: "100%"
        }}>
          <div>Expires: {expiryInfo.expiryDate.toLocaleDateString()}</div>
          <div>{expiryInfo.daysLeft} days left</div>
        </div>
      )}
    </div>
  );
}

export default SeatCard;