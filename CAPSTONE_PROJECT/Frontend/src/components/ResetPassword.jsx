import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, NavLink } from "react-router";
import axios from "axios";
import { API_URL } from "../config/apiConfig";
import { toast } from "react-hot-toast";
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
  linkClass,
} from "../styles/common";

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Get email from query params
    const params = new URLSearchParams(location.search);
    const emailParam = params.get("email");
    if (emailParam) {
      setEmail(emailParam);
    } else {
      setError("Invalid or expired reset link.");
    }
  }, [location]);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.put(`${API_URL}/auth/reset-password`, {
        email,
        newPassword: data.password,
      });
      if (res.status === 200) {
        setSuccess(true);
        toast.success("Password reset successfully!");
        setTimeout(() => navigate("/login"), 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={`${pageBackground} flex items-center justify-center py-16 px-4`}>
        <div className={formCard}>
          <h2 className={formTitle}>Success!</h2>
          <p className={successClass}>Your password has been reset successfully.</p>
          <p className="text-center mt-6 text-sm text-[#6e6e73]">
            Redirecting to login page in 3 seconds...
          </p>
          <p className="text-center mt-4">
            <NavLink to="/login" className={linkClass}>
              Go to Login now
            </NavLink>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${pageBackground} flex items-center justify-center py-16 px-4`}>
      <div className={formCard}>
        <h2 className={formTitle}>Reset Password</h2>
        
        {error && <p className={errorClass}>{error}</p>}
        
        {email && !error && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <p className="text-sm text-[#6e6e73] mb-6 text-center">
              Resetting password for: <strong>{email}</strong>
            </p>

            <div className={formGroup}>
              <label className={labelClass}>New Password</label>
              <input
                type="password"
                placeholder="Min. 8 characters"
                className={inputClass}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              {errors.password && <p className={errorClass}>{errors.password.message}</p>}
            </div>

            <div className={formGroup}>
              <label className={labelClass}>Confirm New Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                className={inputClass}
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && <p className={errorClass}>{errors.confirmPassword.message}</p>}
            </div>

            <button type="submit" className={submitBtn} disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
