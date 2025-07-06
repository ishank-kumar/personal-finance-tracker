import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import SummaryCard from "../components/SummaryCard";
import BudgetChart from "../components/BudgetChart";
import "../styles/Budgets.css";

const DEFAULT_BUDGETS = {
  groceries: 5000,
  rent: 10000,
  utilities: 3000,
  entertainment: 2000,
  bills: 1500,
  others: 1000,
};

// Set base URL of deployed backend
const BASE_URL = "https://personal-finance-tracker-1-5zii.onrender.com";

const Budgets = () => {
  const [, setTransactions] = useState([]);
  const [spent, setSpent] = useState({});
  const [budgets, setBudgets] = useState(DEFAULT_BUDGETS);

  const calculateSpending = (transactions) => {
    const categorySpent = {};
    transactions.forEach((tx) => {
      if (!categorySpent[tx.category]) categorySpent[tx.category] = 0;
      categorySpent[tx.category] += parseFloat(tx.amount);
    });
    setSpent(categorySpent);
  };

  const loadData = useCallback(async () => {
    try {
      // Fetch transactions
      const txRes = await axios.get(`${BASE_URL}/api/transactions`);
      setTransactions(txRes.data);
      calculateSpending(txRes.data);

      // Fetch budgets from DB
      const budgetRes = await axios.get(`${BASE_URL}/api/budgets`);
      const data = budgetRes.data;

      if (!data || Object.keys(data).length === 0) {
        await axios.put(`${BASE_URL}/api/budgets`, DEFAULT_BUDGETS);
        setBudgets(DEFAULT_BUDGETS);
      } else {
        setBudgets(data);
      }
    } catch (err) {
      console.error("Error loading data:", err);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleBudgetChange = async (category, value) => {
    const updated = {
      ...budgets,
      [category]: value,
    };

    setBudgets(updated);

    try {
      await axios.put(`${BASE_URL}/api/budgets`, updated);
    } catch (err) {
      console.error("Failed to update budget:", err);
    }
  };

  return (
    <div className="dashboard">
      <h2>Budget Overview</h2>

      <div className="summary-scroll-wrapper">
        <div className="summary">
          {Object.keys(budgets)
            .sort((a, b) => (a === "others" ? 1 : b === "others" ? -1 : 0))
            .map((cat) => (
              <SummaryCard
                key={cat}
                category={cat}
                spent={spent[cat] || 0}
                budget={budgets[cat]}
                onBudgetChange={handleBudgetChange}
              />
            ))}
        </div>
      </div>

      <div className="charts">
        <BudgetChart
          spent={Object.fromEntries(
            Object.entries(spent).sort(([a], [b]) => (a === "others" ? 1 : b === "others" ? -1 : 0))
          )}
          budgets={Object.fromEntries(
            Object.entries(budgets).sort(([a], [b]) => (a === "others" ? 1 : b === "others" ? -1 : 0))
          )}
        />
      </div>
    </div>
  );
};

export default Budgets;
