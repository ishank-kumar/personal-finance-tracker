import React from "react";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "../styles/Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar, closeSidebar }) => {
  return (
    <>
      {/* Hamburger Toggle */}
      <button className="menu-toggle" onClick={toggleSidebar}>
        <FaBars />
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">💸 Finance Tracker</div>
        <nav className="sidebar-nav">
          <NavLink to="/" onClick={closeSidebar}>
            Dashboard
          </NavLink>
          <NavLink to="/transactions" onClick={closeSidebar}>
            Transactions
          </NavLink>
          <NavLink to="/budgets" onClick={closeSidebar}>
            Budgets
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
