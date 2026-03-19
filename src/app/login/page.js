"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState("email"); // "email", "customer-otp", "admin-password"
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleNext = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (!email.includes("@")) return setErrorMsg("Enter a valid Email address.");
    
    // Intercept exactly for the designated Admin email
    if (email.toLowerCase() === "shannugannu6@gmail.com") {
      setStep("admin-password");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep("customer-otp");
      } else {
        setErrorMsg(data.error || "Failed to send OTP.");
      }
    } catch (err) {
      setErrorMsg("Network error trying to connect to server.");
    }
    setLoading(false);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (otp.length < 4) return setErrorMsg("Enter valid 4-digit OTP.");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ email, otp, role: "customer" }),
      });
      if (res.ok) {
        router.refresh(); 
        router.push("/");
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Invalid OTP.");
      }
    } catch (err) {
      setErrorMsg("Network error.");
    }
    setLoading(false);
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/admin-login", {
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        router.refresh(); 
        router.push("/admin/dashboard");
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Invalid Password.");
      }
    } catch (err) {
      setErrorMsg("Network error.");
    }
    setLoading(false);
  };

  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
      <div style={{ background: "var(--surface)", width: "100%", maxWidth: "400px", borderRadius: "24px", padding: "32px 24px", boxShadow: "var(--shadow-md)", textAlign: "center" }}>
        
        <div style={{ fontSize: "50px", marginBottom: "16px" }}>{step === "admin-password" ? "👔" : "📧"}</div>
        <h1 style={{ color: "var(--primary)", fontWeight: "800", marginBottom: "8px" }}>Godavari Ruchulu {step === "admin-password" ? "Admin" : "Login"}</h1>
        <p style={{ color: "var(--text-muted)", marginBottom: "32px", fontSize: "0.95rem" }}>
          {step === "email" && "Enter your Email address to log in."}
          {step === "customer-otp" && "Enter the 4-digit code sent to your email."}
          {step === "admin-password" && "Enter the admin password to continue."}
        </p>

        {errorMsg && <p style={{ color: "var(--primary)", background: "rgba(230, 57, 70, 0.1)", padding: "10px", borderRadius: "8px", marginBottom: "16px", fontSize: "0.9rem", fontWeight: "600" }}>{errorMsg}</p>}

        {step === "email" && (
          <form onSubmit={handleNext}>
            <input 
              type="email" 
              placeholder="Email Profile (e.g. user@gmail.com)" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              required
            />
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Processing..." : "Continue"}
            </button>
          </form>
        )}

        {step === "customer-otp" && (
          <form onSubmit={handleVerifyOtp}>
            <input 
              type="text" 
              maxLength="4"
              placeholder="4-digit OTP" 
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="input-field"
              style={{ textAlign: "center", fontSize: "1.5rem", letterSpacing: "8px", fontWeight: "800" }}
              required
            />
            <button type="submit" className="btn-success" style={{ width: "100%", padding: "16px", borderRadius: "16px", marginTop: "8px" }} disabled={loading}>
              {loading ? "Verifying..." : "Login"}
            </button>
            <button type="button" onClick={() => setStep("email")} style={{ background: "transparent", border: "none", color: "var(--text-muted)", marginTop: "16px", textDecoration: "underline", cursor: "pointer", fontWeight: "600" }}>
              Change Email
            </button>
          </form>
        )}

        {step === "admin-password" && (
          <form onSubmit={handleAdminLogin}>
            <input 
              type="password" 
              placeholder="Admin Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
            />
            <button type="submit" className="btn-success" style={{ width: "100%", padding: "16px", borderRadius: "16px", marginTop: "8px" }} disabled={loading}>
              {loading ? "Verifying..." : "Login to Dashboard"}
            </button>
            <button type="button" onClick={() => setStep("email")} style={{ background: "transparent", border: "none", color: "var(--text-muted)", marginTop: "16px", textDecoration: "underline", cursor: "pointer", fontWeight: "600" }}>
              Change Email
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
