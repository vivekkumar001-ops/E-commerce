import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="card shadow-sm">
      <div className="card-header bg-dark text-light text-center fw-bold">
        Admin Panel
      </div>

      <div className="list-group list-group-flush">

        <NavLink
          to="/dashboard/admin/create-category"
          className={({ isActive }) =>
            `list-group-item list-group-item-action ${
              isActive ? "active" : ""
            }`
          }
        >
          📂 Create Category
        </NavLink>

        <NavLink
          to="/dashboard/admin/create-product"
          className={({ isActive }) =>
            `list-group-item list-group-item-action ${
              isActive ? "active" : ""
            }`
          }
        >
          📦 Create Product
        </NavLink>

        <NavLink
          to="/dashboard/admin/products"
          className={({ isActive }) =>
            `list-group-item list-group-item-action ${
              isActive ? "active" : ""
            }`
          }
        >
          🛒 Products
        </NavLink>

        <NavLink
          to="/dashboard/admin/orders"
          className={({ isActive }) =>
            `list-group-item list-group-item-action ${
              isActive ? "active" : ""
            }`
          }
        >
          📑 Orders
        </NavLink>

        <NavLink
          to="/dashboard/admin/users"
          className={({ isActive }) =>
            `list-group-item list-group-item-action ${
              isActive ? "active" : ""
            }`
          }
        >
          👥 Users
        </NavLink>

      </div>
    </div>
  );
};

export default AdminMenu;
