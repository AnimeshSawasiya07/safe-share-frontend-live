import { TextField } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../interceptor/axios";
import EndPoint from "../../api/EndPoint";

export function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async(e) => {
        try{
            e.preventDefault();

        if (!email) {
            setMessage("❌ Please enter your email.");
            return;
        }

        const response = await api.post(EndPoint.SEND_RESET_PASSWORD_LINK,{email})
        setMessage("✅ If this email exists, a reset link has been sent!");
        }catch(err){
            console.log(err);
            
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
            <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "15px" }}>
                <div className="text-center mb-4">
                    <i className="bi bi-shield-lock-fill text-primary fs-1"></i>
                    <h3 className="mt-2 fw-bold">Forgot Password</h3>
                    <p className="text-muted small">
                        Enter your registered email and we’ll send you a reset link
                    </p>
                </div>

                {message && (
                    <div
                        className={`alert ${message.includes("✅") ? "alert-success" : "alert-danger"
                            } py-2`}
                    >
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <TextField onChange={(e)=>{setEmail(prev=>e.target.value)}} variant="outlined" label="Email" type="email" sx={{ width: '22rem', height: '45px' }} />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Send Reset Link
                    </button>
                </form>

                <div className="text-center mt-3">
                    <Link to="/sign-in" className="text-decoration-none">
                        <i className="bi bi-arrow-left"></i> Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}