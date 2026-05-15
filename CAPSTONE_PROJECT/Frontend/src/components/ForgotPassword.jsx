import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../config/apiConfig";
import {
  pageBackground,
  formCard,
  formTitle,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  errorClass,
  successClass,
  loadingClass,
  linkClass,
} from "../styles/common";
import { NavLink } from "react-router";

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resetLink, setResetLink] = useState(null);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    setResetLink(null);
    try {
      const res = await axios.post(`${API_URL}/auth/forgot-password`, data);
      if (res.status === 200) {
        setResetLink(res.data.resetLink);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to process request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${pageBackground} flex items-center justify-center py-16 px-4`}>
      <div className={formCard}>
        <h2 className={formTitle}>Forgot Password</h2>

        {error && <p className={errorClass}>{error}</p>}
        
        {resetLink ? (
          <div className="text-center">
            <p className={successClass}>Reset link generated!</p>
            <p className="text-sm text-[#6e6e73] mt-4 mb-6">
              Since this is a demo, we've generated a reset link for you below. In a real application, this would be sent to your email.
            </p>
            <a 
              href={resetLink} 
              className={`${submitBtn} inline-block text-center no-underline`}
              style={{ display: 'block' }}
            >
              Go to Reset Password
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={formGroup}>
              <label className={labelClass}>Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className={inputClass}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && <p className={errorClass}>{errors.email.message}</p>}
            </div>

            <button type="submit" className={submitBtn} disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}

        <p className="text-center mt-6 text-sm">
          <NavLink to="/login" className={linkClass}>
            Back to Login
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
