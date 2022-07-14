import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export const AddTransaction = ({ transaction }) => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  const { addTransaction, user } = useContext(GlobalContext);
  let token;

  const onSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      id: Math.floor(Math.random() * 10000000),
      text,
      amount: +amount,
    };
    if (user && user._id) {
      token = user.token;
    }
    addTransaction(newTransaction, token);
    setAmount("");
    setText("");
  };

  return (
    <>
      <h3>Add new transaction</h3>
      <form id="form" onSubmit={onSubmit}>
        <div className="form-control">
          <label>Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text..."
          />
        </div>
        <div className="form-control">
          <label>
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
          />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  );
};
