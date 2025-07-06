// === FOLDER: frontend/src/pages/Transactions.js ===
import React, { useEffect, useState } from "react";
import axios from "axios";
import TransactionForm from "../components/TransactionForm";
import "../styles/TransactionForm.css";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  const loadTransactions = () => {
    axios.get("http://localhost:5000/api/transactions")
      .then(res => setTransactions(res.data));
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
            <div>₹{t.amount} | {t.category} | {new Date(t.date).toLocaleDateString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;
