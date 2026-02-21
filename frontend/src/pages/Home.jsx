function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "70vh",
        background: "linear-gradient(135deg, #f8ffae 0%, #43c6ac 100%)",
        borderRadius: 16,
        margin: "2vw",
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        padding: "4vw",
        width: "100%",
        maxWidth: 1200,
        boxSizing: "border-box",
      }}
    >
      <img
        src="https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80"
        alt="Library"
        style={{ width: "100%", maxWidth: 500, borderRadius: 16, marginBottom: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.12)", objectFit: "cover" }}
      />
      <h1 style={{ color: "#2575fc", fontSize: "2.5em", marginBottom: 16, textAlign: "center", wordBreak: "break-word" }}>
        Welcome to GoodLuck Study Library <span role="img" aria-label="books">📚</span>
      </h1>
      <p style={{ fontSize: 20, color: "#333", marginBottom: 8, textAlign: "center" }}>Calm & Silent Environment</p>
      <h3 style={{ color: "#198754", marginBottom: 16, textAlign: "center" }}>Helpline: +91 9636590409</h3>
      <div style={{ color: "#444", fontSize: 18, maxWidth: 600, textAlign: "center", marginBottom: 24 }}>
        GoodLuck Study Library is your perfect destination for focused learning and personal growth. Enjoy a peaceful atmosphere, high-speed WiFi, comfortable seating, and a wide range of resources. Our friendly staff is always ready to help you achieve your academic goals. Whether you're preparing for exams, working on projects, or simply seeking a quiet place to read, our library offers everything you need for success. Join us and experience the difference!
      </div>
      <div
        style={{
          display: "flex",
          gap: 24,
          marginTop: 16,
          flexWrap: "wrap",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80"
          alt="Study Area"
          style={{ width: "30vw", maxWidth: 180, height: "18vw", maxHeight: 120, objectFit: "cover", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.10)" }}
        />
        <img
          src="https://images.unsplash.com/photo-1503676382389-8bfa157be7d6?auto=format&fit=crop&w=400&q=80"
          alt="Books"
          style={{ width: "30vw", maxWidth: 180, height: "18vw", maxHeight: 120, objectFit: "cover", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.10)" }}
        />
        <img
          src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80"
          alt="Reading"
          style={{ width: "30vw", maxWidth: 180, height: "18vw", maxHeight: 120, objectFit: "cover", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.10)" }}
        />
      </div>
    </div>
  );
}

export default Home;