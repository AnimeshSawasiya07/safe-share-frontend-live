import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import api from "../../interceptor/axios";
import EndPoint from "../../api/EndPoint";

export default function ResetPassword(){
    const {token} = useParams()
    const navigate = useNavigate();

  const [newPassword, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("❌ Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post(EndPoint.RESET_PASSWORD+`/${token}`, 
        { newPassword }
      );

      setMessage("✅ Password reset successful! Redirecting to login...");
      setLoading(false);

      setTimeout(() => navigate("/sign-in"), 2000); // 2 sec baad login page
    } catch (err) {
        console.log(err);
        
      setLoading(false);
      setMessage(
        err.response?.data?.message || "❌ Something went wrong. Try again."
      );
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg p-4 rounded-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">🔑 Reset Your Password</h3>
        <p className="text-muted text-center mb-4">
          Enter your new password below
        </p>

        {message && (
          <div
            className={`alert ${
              message.includes("✅") ? "alert-success" : "alert-danger"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">New Password</label>
            <input
              type="password"
              className="form-control rounded-3"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Confirm Password</label>
            <input
              type="password"
              className="form-control rounded-3"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 rounded-3"
            disabled={loading}
          >
            {loading ? "⏳ Resetting..." : "🔒 Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}