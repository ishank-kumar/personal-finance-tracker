const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  amount: Number,
  date: Date,
  description: String,
  category: String,
});

module.exports = mongoose.model("Transaction", TransactionSchema);