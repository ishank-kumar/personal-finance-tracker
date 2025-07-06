import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { getTransactions } from "../services/api";

const MonthlyBarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getTransactions().then((res) => {
      const grouped = {};
      res.data.forEach(tx => {
        const month = new Date(tx.date).toLocaleString('default', { month: 'short' });
        grouped[month] = (grouped[month] || 0) + tx.amount;
      });
      const formatted = Object.entries(grouped).map(([month, amount]) => ({ month, amount }));
      setData(formatted);
    });
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" fill="#007bff" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyBarChart;