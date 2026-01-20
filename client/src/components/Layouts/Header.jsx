import { NavLink } from "react-router-dom";
import React from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/Cart";
import { Badge } from "antd";

function Header() {
  const {auth, setAuth } = useAuth();
  const [cart, setCart] = useCart();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        {/* BRAND */}
        <NavLink to="/" className="navbar-brand fw-bold">
          MyShop
        </NavLink>

        {/* TOGGLER */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* MENU */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>

            <li className="nav-item">             
              <NavLink className="nav-link" to="/cart">
                Cart
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/policy">
                Policy
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>
          

          {/* RIGHT SIDE */}
          <ul className="navbar-nav ms-auto">

            {!auth?.user ? (
              <>
                <li className="nav-item">
                  <NavLink to="/login" className="btn btn-outline-light me-2">
                    Login
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/register" className="btn btn-success">
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  {auth?.user?.name}
                </NavLink>

                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                    >
                      Dashboard
                    </NavLink>
                  </li>

                  <li>
                    <button
                      onClick={handleLogout}
                      className="dropdown-item text-danger"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}
              <li className="nav-item">
                <Badge count={cart.length} showZero>
                  <NavLink className="nav-link" to="/cart">
                      Cart
                  </NavLink>
                </Badge>
              </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;