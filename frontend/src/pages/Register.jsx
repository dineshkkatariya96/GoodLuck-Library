import { useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { FaPhone } from "react-icons/fa";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    countryCode: "+91",
    mobileNumber: "",
  });

  const [otpState, setOtpState] = useState({
    otpSent: false,
    otpCode: "",
    userOtp: "",
    isLoading: false,
  });

  const countryCodes = [
    { code: "+91", countryName: "India" },
    { code: "+1", countryName: "USA/Canada" },
    { code: "+44", countryName: "UK" },
    { code: "+86", countryName: "China" },
    { code: "+81", countryName: "Japan" },
    { code: "+61", countryName: "Australia" },
    { code: "+33", countryName: "France" },
    { code: "+49", countryName: "Germany" },
    { code: "+39", countryName: "Italy" },
    { code: "+34", countryName: "Spain" },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (e) => {
    setOtpState({ ...otpState, userOtp: e.target.value });
  };

  const isValidMobileNumber = () => {
    return form.mobileNumber && form.mobileNumber.length === 10 && /^\d+$/.test(form.mobileNumber);
  };

  const generateOtp = async (e) => {
    e.preventDefault();

    if (!form.mobileNumber) {
      toast.error("Please enter a mobile number");
      return;
    }

    if (form.mobileNumber.length !== 10) {
      toast.error("Enter a valid 10 digit mobile number");
      return;
    }

    if (!/^\d+$/.test(form.mobileNumber)) {
      toast.error("Mobile number should contain only digits");
      return;
    }

    try {
      setOtpState({ ...otpState, isLoading: true });
      const response = await API.post("/api/auth/generate-otp", {
        mobileNumber: form.mobileNumber,
        countryCode: form.countryCode,
      });

      if (response.data.success) {
        setOtpState({
          otpSent: true,
          otpCode: response.data.otp,
          userOtp: "",
          isLoading: false,
        });
        toast.success("OTP sent to your mobile number!");
      }
    } catch (error) {
      setOtpState({ ...otpState, isLoading: false });
      toast.error(error.response?.data?.message || "Failed to generate OTP");
    }
  };

  const verifyOtp = (e) => {
    e.preventDefault();

    if (!otpState.userOtp) {
      toast.error("Please enter the OTP");
      return;
    }

    if (otpState.userOtp === otpState.otpCode.toString()) {
      toast.success("OTP verified successfully!");
      return true;
    } else {
      toast.error("Invalid OTP. Please try again");
      return false;
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!otpState.otpSent) {
      toast.error("Please generate and verify OTP first");
      return;
    }

    if (!verifyOtp(e)) {
      return;
    }

    try {
      await API.post("/api/auth/register", form);
      toast.success("Registration successful. Please login.");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form
      onSubmit={submit}
      style={{
        maxWidth: 550,
        width: "90vw",
        margin: "40px auto",
        padding: "6vw",
        borderRadius: 16,
        background: "#f0f4ff",
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ color: "#2575fc", textAlign: "center" }}>Register</h2>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
        style={{ padding: 12, borderRadius: 8, border: "1px solid #2575fc", fontSize: 16 }}
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        style={{ padding: 12, borderRadius: 8, border: "1px solid #2575fc", fontSize: 16 }}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        style={{ padding: 12, borderRadius: 8, border: "1px solid #2575fc", fontSize: 16 }}
      />

      {/* Country Code and Mobile Number with OTP */}
      <div style={{ display: "flex", gap: 12 }}>
        <select
          name="countryCode"
          value={form.countryCode}
          onChange={handleChange}
          disabled={otpState.otpSent}
          style={{
            flex: 0.35,
            padding: 12,
            borderRadius: 8,
            border: "1px solid #2575fc",
            fontSize: 16,
            background: "#fff",
            cursor: otpState.otpSent ? "not-allowed" : "pointer",
            opacity: otpState.otpSent ? 0.6 : 1,
          }}
        >
          {countryCodes.map((country) => (
            <option key={country.code} value={country.code}>
              {country.code}({country.countryName})
            </option>
          ))}
        </select>

        <input
          name="mobileNumber"
          type="tel"
          placeholder="Mobile Number"
          value={form.mobileNumber}
          onChange={handleChange}
          maxLength="10"
          disabled={otpState.otpSent}
          style={{
            flex: 0.35,
            padding: 12,
            borderRadius: 8,
            border: isValidMobileNumber() ? "2px solid #198754" : "1px solid #2575fc",
            fontSize: 16,
            backgroundColor: otpState.otpSent ? "#e8e8e8" : "#fff",
            cursor: otpState.otpSent ? "not-allowed" : "text",
            opacity: otpState.otpSent ? 0.6 : 1,
          }}
        />

        <button
          onClick={generateOtp}
          disabled={!isValidMobileNumber() || otpState.isLoading || otpState.otpSent}
          style={{
            flex: 0.3,
            padding: 12,
            borderRadius: 8,
            background: !isValidMobileNumber() || otpState.otpSent ? "#ccc" : "#198754",
            color: "#fff",
            border: "none",
            fontWeight: 600,
            fontSize: 14,
            cursor: !isValidMobileNumber() || otpState.otpSent ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          <FaPhone size={14} /> {otpState.isLoading ? "Sending..." : otpState.otpSent ? "✓ Sent" : "Get OTP"}
        </button>
      </div>

      {/* OTP Input Field */}
      {otpState.otpSent && (
        <div style={{ animation: "slideIn 0.3s ease-in" }}>
          <input
            type="text"
            placeholder="Enter 4-digit OTP"
            value={otpState.userOtp}
            onChange={handleOtpChange}
            maxLength="4"
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 8,
              border: "2px solid #2575fc",
              fontSize: 16,
              textAlign: "center",
              letterspacing: "5px",
              boxSizing: "border-box",
            }}
          />
          <p style={{ fontSize: 12, color: "#666", margin: "8px 0 0 0", textAlign: "center" }}>
            OTP sent to {form.countryCode} {form.mobileNumber}
          </p>
        </div>
      )}

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