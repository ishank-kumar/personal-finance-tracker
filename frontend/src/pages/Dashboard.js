import React, { useEffect, useState } from "react";
import DashboardCard from "../components/DashboardCard";
import { FaRupeeSign, FaChartPie, FaWallet, FaPiggyBank } from "react-icons/fa";
import MonthlyBarChart from "../components/BarChart";
import CategoryPieChart from "../components/PieChart";
import axios from "axios";
import "../styles/Dashboard.css";

// ✅ Set base URL of deployed backend
const BASE_URL = "https://personal-finance-tracker-1-5zii.onrender.com";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(0);
  const [topCategory, setTopCategory] = useState("TBD");

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // ✅ Fetch transactions from live backend
      const txRes = await axios.get(`${BASE_URL}/api/transactions`);
      const txData = txRes.data;
      setTransactions(txData);

      // Calculate total spent
      const totalAmt = txData.reduce((acc, t) => acc + parseFloat(t.amount), 0);
      setTotalSpent(totalAmt);

      // Calculate top category
      const categoryTotals = {};
      txData.forEach((t) => {
        categoryTotals[t.category] =
          (categoryTotals[t.category] || 0) + parseFloat(t.amount);
      });
      const topCat = Object.entries(categoryTotals).reduce(
        (a, b) => (b[1] > a[1] ? b : a),
        ["TBD", 0]
      );
      setTopCategory(topCat[0]);

      // ✅ Fetch budgets from live backend
      const budgetRes = await axios.get(`${BASE_URL}/api/budgets`);
      const budgetData = budgetRes.data;

      // Calculate total budget and remaining
      const budgetSum = Object.values(budgetData).reduce(
        (acc, val) => acc + parseFloat(val),
        0
      );
      setTotalBudget(budgetSum);
      setRemainingBudget(budgetSum - totalAmt);
    } catch (error) {
      console.error("Dashboard load error:", error);
    }
  };

  return (
    <div className="dashboard-page">
      <h2 className="dashboard-title">📊 Dashboard Overview</h2>

      <div className="summary-cards">
        <DashboardCard
          title="Total Budget"
          value={`₹${totalBudget.toFixed(2)}`}
          icon={<FaPiggyBank />}
        />
        <DashboardCard
          title="Total Spent"
          value={`₹${totalSpent.toFixed(2)}`}
          icon={<FaRupeeSign />}
        />
        <DashboardCard
          title="Remaining Budget"
          value={`₹${remainingBudget.toFixed(2)}`}
          icon={<FaWallet />}
        />
        <DashboardCard
          title="Top Category"
          value={topCategory}
          icon={<FaChartPie />}
        />
      </div>

      <div className="charts-container">
        <div className="chart-box">
          <h3>Monthly Expenses by Category</h3>
          <MonthlyBarChart data={transactions} />
        </div>

        <div className="chart-box">
          <h3>Category Distribution</h3>
          <CategoryPieChart data={transactions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
