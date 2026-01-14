import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layouts/Layout";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });

      if (res && res.data) {
        toast.success(res.data.message || "Registered successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Register - E-commerce App">
      <h1 className="text-center mb-4">Register</h1>

      <form
        onSubmit={handleSubmit}
        className="col-md-6 offset-md-3 w-50 mx-auto p-3 border bg-light"
      >
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            placeholder="Enter email"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form-control"
            placeholder="Enter phone number"
            required
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
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="form-control"
            placeholder="Enter address"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Security Answer:</label>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="form-control"
            placeholder="Your security answer"
            required
          />
        </div>

        <button className="btn btn-primary w-100">Register</button>
      </form>
    </Layout>
  );
};

export default Register;