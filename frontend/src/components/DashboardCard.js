// === FOLDER: frontend/src/components/DashboardCard.js ===
import React from "react";
import "../styles/DashboardCard.css";

const DashboardCard = ({ title, value, icon }) => {
  return (
    <div className="dashboard-card">
      <div className="dashboard-card-icon">{icon}</div>
      <div className="dashboard-card-info">
        <p className="dashboard-card-title">{title}</p>
        <h3 className="dashboard-card-value">{value}</h3>
      </div>
    </div>
  );
};

export default DashboardCard;
