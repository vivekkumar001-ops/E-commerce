import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layouts/UserMenu";
import Layout from "../../components/Layouts/Layout";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";

const Profile = () => {
  // =========================
  // CONTEXT
  // =========================
  const { auth, setAuth } = useAuth();

  // =========================
  // STATE
  // =========================
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // =========================
  // LOAD USER DATA
  // =========================
  useEffect(() => {
    if (auth?.user) {
      const { name, email, phone, address } = auth.user;
      setName(name || "");
      setEmail(email || "");
      setPhone(phone || "");
      setAddress(address || "");
    }
  }, [auth?.user]);

  // =========================
  // SUBMIT FORM
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name,
        phone,
        address,
      };

      if (password) {
        payload.password = password;
      }

      const { data } = await axios.put(
        "/api/v1/auth/profile",
        payload
      );

      if (data?.error) {
        toast.error(data.error);
      } else {
        // ✅ update auth context
        setAuth((prev) => ({
          ...prev,
          user: data.updatedUser,
        }));

        // ✅ safe localStorage update
        const ls = localStorage.getItem("auth");
        if (ls) {
          const authData = JSON.parse(ls);
          authData.user = data.updatedUser;
          localStorage.setItem("auth", JSON.stringify(authData));
        }

        toast.success("Profile Updated Successfully");
        setPassword("");
      }
    } catch (error) {
      console.log(error);
      toast.error("Profile update failed");
    }
  };

  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>

          <div className="col-md-8">
            <div className="form-container" style={{ marginTop: "-40px" }}>
              <form onSubmit={handleSubmit}>
                <h4 className="title">USER PROFILE</h4>

                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Name"
                    autoFocus
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    className="form-control"
                    disabled
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Enter New Password (optional)"
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Phone"
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Address"
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
