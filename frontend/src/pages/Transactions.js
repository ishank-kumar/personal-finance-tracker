// === FOLDER: frontend/src/pages/Transactions.js ===
import React, { useEffect, useState } from "react";
import axios from "axios";
import TransactionForm from "../components/TransactionForm";
import "../styles/TransactionForm.css";

// ✅ Base URL for deployed backend
const BASE_URL = "https://personal-finance-tracker-1-5zii.onrender.com";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  const loadTransactions = () => {
    axios.get(`${BASE_URL}/api/transactions`)
      .then(res => setTransactions(res.data))
      .catch(err => console.error("Error loading transactions:", err));
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <div className="transactions-page">
      <TransactionForm onTransactionAdded={loadTransactions} />
      <ul className="transaction-list">
        {transactions.map((t) => (
          <li key={t._id}>
            <div>{t.description}</div>
            <div>
              ₹{t.amount} | {t.category} | {new Date(t.date).toLocaleDateString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;
