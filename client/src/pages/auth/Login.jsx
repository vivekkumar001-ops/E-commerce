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

  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });

      if (res.data.success) {
        toast.success(res.data.message);

        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });

        // save auth data
        localStorage.setItem("auth", JSON.stringify(res.data));

        navigate(location.state || "/");
      } else {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "login failed");
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
          <label className="form-label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            placeholder="Enter email"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            placeholder="Enter password"
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
