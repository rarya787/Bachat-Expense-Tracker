import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  text: {
    type: String,
    trim: true,
    required: [true, "Please enter something here"],
  },
  amount: {
    type: Number,
    required: [true, "Please add some amount"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;
