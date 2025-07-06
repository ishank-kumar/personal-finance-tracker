import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/TransactionForm.css";

const TransactionForm = ({ onTransactionAdded }) => {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("groceries");
  const [toastVisible, setToastVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [editId, setEditId] = useState(null);
  const [modalData, setModalData] = useState(null);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/transactions");
      setTransactions(res.data.reverse());
    } catch (error) {
      console.error("Failed to load transactions", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !date || !description || !category) return;

    const transaction = { amount, date, description, category };

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/transactions/${editId}`, transaction);
        setEditId(null);
      } else {
        await axios.post("http://localhost:5000/api/transactions", transaction);
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 3000);
      }

      // Clear form
      setAmount("");
      setDate("");
      setDescription("");
      setCategory("groceries");

      fetchTransactions();
      if (onTransactionAdded) onTransactionAdded();
    } catch (error) {
      console.error("Transaction error:", error);
    }
  };

  const handleEdit = (tx) => {
    setAmount(tx.amount);
    setDate(tx.date.slice(0, 10));
    setDescription(tx.description);
    setCategory(tx.category);
    setEditId(tx._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/transactions/${id}`);
      fetchTransactions();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const openModal = (tx) => setModalData(tx);
  const closeModal = () => setModalData(null);

  return (
    <div className="transactions-page">
      <form className="transaction-form" onSubmit={handleSubmit}>
        {toastVisible && <div className="toast">Transaction added!</div>}
        <h3>{editId ? "Edit Transaction" : "Add Transaction"}</h3>

        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 2500"
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Electricity bill"
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="groceries">Groceries</option>
            <option value="utilities">Utilities</option>
            <option value="rent">Rent</option>
            <option value="entertainment">Entertainment</option>
            <option value="bills">Bills</option>
            <option value="others">Others</option>
          </select>
        </div>

        <button type="submit">{editId ? "Update" : "Add"}</button>
      </form>

      <ul className="transaction-list">
        {transactions.map((tx) => (
          <li key={tx._id} className="transaction-card">
            <div>
              <strong>₹{tx.amount}</strong> — {tx.description}
              <br />
              <small>{tx.date.slice(0, 10)} | {tx.category}</small>
            </div>
            <div className="card-actions">
              <button title="View" className="icon-btn" onClick={() => openModal(tx)}>🔍</button>
              <button title="Edit" className="icon-btn" onClick={() => handleEdit(tx)}>✏️</button>
              <button title="Delete" className="icon-btn delete" onClick={() => handleDelete(tx._id)}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>

      {modalData && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Transaction Details</h3>
            <p><strong>Amount:</strong> ₹{modalData.amount}</p>
            <p><strong>Date:</strong> {modalData.date.slice(0, 10)}</p>
            <p><strong>Description:</strong> {modalData.description}</p>
            <p><strong>Category:</strong> {modalData.category}</p>
            <button onClick={closeModal} className="close-btn">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionForm;
