import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

// @desc  Get all transactions
// @route GET /api/v1/transactions
// @access Public

const getTransactions = async (req, res, next) => {
  try {
    // find same user and display those in json
    const user = req.user._id;
    const test = await User.findById(user._id).select("-password");
    const transactions = await Transaction.find({ user: user });
    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc  Post transaction
// @route POST /api/v1/transactions
// @access Public

const addTransaction = async (req, res, next) => {
  try {
    const { text, amount } = req.body;
    const user = req.user._id;
    const transaction = new Transaction({
      user,
      text,
      amount,
    });
    const createdTransaction = await transaction.save();

    console.log(createdTransaction);
    return res.status(201).json({
      success: true,
      data: createdTransaction,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((x) => x.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

// @desc  Delete transaction
// @route DELETE /api/v1/transactions/:id
// @access Public

const deleteTransactions = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: "No Transaction found",
      });
    }

    await transaction.remove();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
};

export { addTransaction, deleteTransactions, getTransactions };
