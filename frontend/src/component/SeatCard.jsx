import { FaChair } from "react-icons/fa";

function SeatCard({ seat, onBook }) {
  const { seatNumber, isBooked } = seat;
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
      }}
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
    </div>
  );
}

export default SeatCard;