import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="text-center">
      <div className="list-group dashboard-menu">
        <h4>User Panel</h4>

        <NavLink
          to="/dashboard/user/profile"
          className={({ isActive }) =>
            `list-group-item list-group-item-action ${
              isActive ? "active" : ""
            }`
          }
        >
          👤 Profile
        </NavLink>

        <NavLink
          to="/dashboard/user/orders"
          className={({ isActive }) =>
            `list-group-item list-group-item-action ${
              isActive ? "active" : ""
            }`
          }
        >
          🛒 Orders
        </NavLink>

      </div>
    </div>
  );
};

export default UserMenu;
