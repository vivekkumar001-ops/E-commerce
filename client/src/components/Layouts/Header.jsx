import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/Cart";
import { Badge } from "antd";

function Header() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [cart, setCart] = useCart();

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");

    // optional: clear cart on logout (recommended)
    setCart([]);
    localStorage.removeItem("cart");

    toast.success("Logout Successfully");
    navigate("/login");
  };

  // active link style
  const navLinkClass = ({ isActive }) =>
    `nav-link ${isActive ? "active fw-semibold" : ""}`;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
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
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* MENU */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* LEFT LINKS */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className={navLinkClass} to="/">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className={navLinkClass} to="/about">
                About
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className={navLinkClass} to="/policy">
                Policy
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className={navLinkClass} to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>

          {/* RIGHT SIDE */}
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            {/* CART (always visible) */}
         
            {!auth?.user ? (
              <>
                <li className="nav-item">
                  <NavLink to="/login" className="btn btn-outline-light">
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
                {/* use button instead of to="#" */}
                <button
                  className="nav-link dropdown-toggle btn btn-link text-white text-decoration-none"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {auth?.user?.name}
                </button>

                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                    >
                      Dashboard
                    </NavLink>
                  </li>

                  <li>
                    <button
                      onClick={handleLogout}
                      className="dropdown-item text-danger"
                      type="button"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}
               <li className="nav-item">
              <NavLink className={navLinkClass} to="/cart">
                <Badge count={cart?.length || 0} showZero offset={[6, -2]}>
                  <span className="text-white">🛒 Cart</span>
                </Badge>
              </NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
