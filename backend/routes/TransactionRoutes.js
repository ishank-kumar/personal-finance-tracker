const express = require("express");
const router = express.Router();
const controller = require("../controllers/TransactionController");

router.get("/", controller.getTransactions);
router.post("/", controller.addTransaction);
router.put("/:id", controller.updateTransaction);
router.delete("/:id", controller.deleteTransaction);

module.exports = router;