import React, { useState } from "react";
import Layout from "../../components/Layouts/Layout";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });

      if (data.success) {
        toast.success(data.message);

        const authData = {
          user: data.user,
          token: data.token,
        };

        // ✅ Context update
        setAuth(authData);

        // ✅ LocalStorage fix
        localStorage.setItem("auth", JSON.stringify(authData));

        navigate(location.state || "/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <Layout title="Login - E-commerce App">
      <h1 className="text-center mb-4">Login</h1>

      <form
        onSubmit={handleSubmit}
        className="col-md-6 offset-md-3 w-50 mx-auto p-3 border bg-light"
      >
        <div className="mb-3">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <button className="btn btn-primary w-100">Login</button>

        <Link to="/forgotpassword">
          <button type="button" className="btn btn-secondary w-100 mt-3">
            Forgot Password
          </button>
        </Link>
      </form>
    </Layout>
  );
}

export default Login;
