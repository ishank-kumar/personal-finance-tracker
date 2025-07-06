// === FOLDER: frontend/src/components/SummaryCard.js ===
import React from "react";
import "../styles/SummaryCard.css";

const SummaryCard = ({ category, spent, budget, onBudgetChange }) => {
  const isOver = spent > budget;

  return (
    <div className={`summary-card ${isOver ? "over-budget" : "within-budget"}`}>
      <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
      <p>Spent: ₹{spent || 0}</p>

      <p>
        Budget: ₹
        <input
          type="number"
          value={budget}
          onChange={(e) => onBudgetChange(category, parseFloat(e.target.value) || 0)}
          className="budget-input"
        />
      </p>

      <p className="status-text" style={{ color: isOver ? "red" : "green" }}>
        {isOver ? "Over budget" : "Within budget"}
      </p>
    </div>
  );
};

export default SummaryCard;
