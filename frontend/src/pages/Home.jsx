import { FaWater, FaWifi, FaToilet, FaClock, FaBook, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

function Home() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Introduction Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "70vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "4vw",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80"
          alt="Library"
          style={{
            width: "100%",
            maxWidth: 500,
            borderRadius: 16,
            marginBottom: 24,
            boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
            objectFit: "cover",
            height: "300px",
          }}
        />
        <h1
          style={{
            color: "#fff",
            fontSize: "2.8em",
            marginBottom: 16,
            textAlign: "center",
            fontWeight: 700,
            textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          Welcome to GoodLuck Study Library 📚
        </h1>
        <p
          style={{
            fontSize: "1.3em",
            color: "#e0e0e0",
            marginBottom: 24,
            textAlign: "center",
            fontStyle: "italic",
          }}
        >
          Your Perfect Destination for Focused Learning
        </p>
        <div
          style={{
            color: "#f0f0f0",
            fontSize: "1.05em",
            maxWidth: 700,
            textAlign: "center",
            marginBottom: 24,
            lineHeight: "1.6",
          }}
        >
          GoodLuck Study Library is your perfect destination for focused learning and personal growth. Enjoy a peaceful
          atmosphere, high-speed WiFi, comfortable seating, and a wide range of resources. Our friendly staff is always
          ready to help you achieve your academic goals. Whether you're preparing for exams, working on projects, or
          simply seeking a quiet place to read, our library offers everything you need for success.
        </div>

        <div
          style={{
            display: "flex",
            gap: 24,
            marginTop: 24,
            flexWrap: "wrap",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80"
            alt="Study Area"
            style={{
              width: "30vw",
              maxWidth: 180,
              height: "18vw",
              maxHeight: 120,
              objectFit: "cover",
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
          />
          <img
            src="https://images.unsplash.com/photo-1503676382389-8bfa157be7d6?auto=format&fit=crop&w=400&q=80"
            alt="Books"
            style={{
              width: "30vw",
              maxWidth: 180,
              height: "18vw",
              maxHeight: 120,
              objectFit: "cover",
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
          />
          <img
            src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80"
            alt="Reading"
            style={{
              width: "30vw",
              maxWidth: 180,
              height: "18vw",
              maxHeight: 120,
              objectFit: "cover",
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
          />
        </div>
      </div>

      {/* Enrolled Students Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 20px",
          background: "#f8f9fa",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            textAlign: "center",
            maxWidth: 400,
          }}
        >
          <div
            style={{
              fontSize: "4.5em",
              fontWeight: 700,
              color: "#2575fc",
              marginBottom: 16,
            }}
          >
            200+
          </div>
          <h2
            style={{
              fontSize: "1.8em",
              color: "#333",
              marginBottom: 12,
            }}
          >
            Students Enrolled
          </h2>
          <p
            style={{
              fontSize: "1.1em",
              color: "#666",
              lineHeight: "1.6",
            }}
          >
            Join our growing community of dedicated learners who have found success at GoodLuck Study Library
          </p>
        </div>
      </div>

      {/* Facilities Section */}
      <div
        style={{
          padding: "60px 20px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            fontSize: "2.2em",
            color: "#fff",
            textAlign: "center",
            marginBottom: 48,
            fontWeight: 700,
          }}
        >
          Available Facilities ✨
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 24,
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          {/* Water */}
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 24,
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "transform 0.3s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-8px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <FaWater size={48} color="#2575fc" style={{ marginBottom: 16 }} />
            <h3 style={{ color: "#333", fontSize: "1.3em", marginBottom: 8 }}>Fresh Water</h3>
            <p style={{ color: "#666", fontSize: "0.95em" }}>Purified drinking water available 24/7</p>
          </div>

          {/* WiFi */}
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 24,
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "transform 0.3s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-8px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <FaWifi size={48} color="#2575fc" style={{ marginBottom: 16 }} />
            <h3 style={{ color: "#333", fontSize: "1.3em", marginBottom: 8 }}>High-Speed WiFi</h3>
            <p style={{ color: "#666", fontSize: "0.95em" }}>24/7 uninterrupted internet connectivity</p>
          </div>

          {/* Washroom */}
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 24,
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "transform 0.3s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-8px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <FaToilet size={48} color="#2575fc" style={{ marginBottom: 16 }} />
            <h3 style={{ color: "#333", fontSize: "1.3em", marginBottom: 8 }}>Clean Washrooms</h3>
            <p style={{ color: "#666", fontSize: "0.95em" }}>Hygienic facilities maintained spotlessly</p>
          </div>

          {/* 24/7 Access */}
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 24,
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "transform 0.3s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-8px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <FaClock size={48} color="#2575fc" style={{ marginBottom: 16 }} />
            <h3 style={{ color: "#333", fontSize: "1.3em", marginBottom: 8 }}>24/7 Access</h3>
            <p style={{ color: "#666", fontSize: "0.95em" }}>Round-the-clock study environment</p>
          </div>

          {/* Books & Resources */}
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 24,
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "transform 0.3s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-8px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <FaBook size={48} color="#2575fc" style={{ marginBottom: 16 }} />
            <h3 style={{ color: "#333", fontSize: "1.3em", marginBottom: 8 }}>Vast Library</h3>
            <p style={{ color: "#666", fontSize: "0.95em" }}>Large collection of books and resources</p>
          </div>

          {/* AC & Comfortable Seating */}
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 24,
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "transform 0.3s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-8px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <div style={{ fontSize: "2.5em", marginBottom: 16 }}>❄️</div>
            <h3 style={{ color: "#333", fontSize: "1.3em", marginBottom: 8 }}>AC & Comfort</h3>
            <p style={{ color: "#666", fontSize: "0.95em" }}>Air-conditioned with comfortable seating</p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div
        style={{
          padding: "60px 20px",
          background: "#f8f9fa",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            fontSize: "2.2em",
            color: "#333",
            textAlign: "center",
            marginBottom: 48,
            fontWeight: 700,
          }}
        >
          Contact Us 📞
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 32,
            maxWidth: 1000,
            margin: "0 auto",
          }}
        >
          {/* Address */}
          <div
            style={{
              textAlign: "center",
              padding: 24,
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <FaMapMarkerAlt size={40} color="#2575fc" style={{ marginBottom: 16, display: "block", margin: "0 auto 16px" }} />
            <h3 style={{ color: "#333", fontSize: "1.2em", marginBottom: 12, fontWeight: 600 }}>Address</h3>
            <p style={{ color: "#666", fontSize: "1em", lineHeight: "1.6" }}>
              Main Market, Mandha
              <br />
              Rajasthan - 332742
            </p>
          </div>

          {/* Phone */}
          <div
            style={{
              textAlign: "center",
              padding: 24,
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <FaPhone size={40} color="#2575fc" style={{ marginBottom: 16, display: "block", margin: "0 auto 16px" }} />
            <h3 style={{ color: "#333", fontSize: "1.2em", marginBottom: 12, fontWeight: 600 }}>Phone</h3>
            <p style={{ color: "#666", fontSize: "1em" }}>
              <a href="tel:+919636590409" style={{ color: "#2575fc", textDecoration: "none", fontWeight: 600 }}>
                +91 9636590409
              </a>
            </p>
          </div>

          {/* Email */}
          <div
            style={{
              textAlign: "center",
              padding: 24,
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <FaEnvelope size={40} color="#2575fc" style={{ marginBottom: 16, display: "block", margin: "0 auto 16px" }} />
            <h3 style={{ color: "#333", fontSize: "1.2em", marginBottom: 12, fontWeight: 600 }}>Email</h3>
            <p style={{ color: "#666", fontSize: "1em" }}>
              <a href="mailto:dinesh@gmail.com" style={{ color: "#2575fc", textDecoration: "none", fontWeight: 600 }}>
                dinesh@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;