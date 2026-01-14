import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../components/Layouts/Layout";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        answer,
        newPassword,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Layout>
      <h1 className="text-center mb-4">Forgot Password</h1>

      <form
        onSubmit={handleSubmit}
        className="col-md-6 mx-auto p-3 border bg-light"
      >
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Security Answer</label>
          <input
            type="text"
            className="form-control"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>New Password</label>
          <input
            type="password"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-primary w-100">
          Reset Password
        </button>
      </form>
    </Layout>
  );
}

export default ForgotPassword;
