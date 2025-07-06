import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const BudgetChart = ({ spent = {}, budgets = {} }) => {
  const categories = Object.keys(budgets);

  if (!categories.length) return <p style={{ textAlign: "center" }}>No budget data to display.</p>;

  const data = categories.map((cat) => ({
    category: cat.charAt(0).toUpperCase() + cat.slice(1),
    Budget: budgets[cat],
    Spent: spent[cat] || 0,
  }));

  return (
    <div style={{ width: "100%", height: 300, marginTop: "2rem" }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Budget" fill="#8884d8" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Spent" fill="#82ca9d" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetChart;
