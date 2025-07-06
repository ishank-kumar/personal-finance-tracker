import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { getTransactions } from "../services/api";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const CategoryPieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getTransactions().then((res) => {
      const grouped = {};
      res.data.forEach(tx => {
        grouped[tx.category] = (grouped[tx.category] || 0) + tx.amount;
      });
      const formatted = Object.entries(grouped).map(([category, amount]) => ({ name: category, value: amount }));
      setData(formatted);
    });
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CategoryPieChart;