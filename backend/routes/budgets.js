const express = require("express");
const router = express.Router();
const Budget = require("../models/Budget");

// GET all budgets
router.get("/", async (req, res) => {
  try {
    const budgets = await Budget.find();
    const response = {};
    budgets.forEach(b => {
      response[b.category] = b.amount;
    });
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT to update all budgets
router.put("/", async (req, res) => {
  const updates = req.body; // { groceries: 6000, rent: 11000, ... }
  try {
    const updatePromises = Object.entries(updates).map(async ([category, amount]) => {
      await Budget.findOneAndUpdate(
        { category },
        { amount },
        { upsert: true, new: true }
      );
    });
    await Promise.all(updatePromises);
    res.json({ message: "Budgets updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
