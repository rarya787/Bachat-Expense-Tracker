import express from "express";

import {
  getTransactions,
  addTransaction,
  deleteTransactions,
} from "../controllers/transactions.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").get(protect, getTransactions).post(protect, addTransaction);

router.route("/:id").delete(deleteTransactions);

export default router;
