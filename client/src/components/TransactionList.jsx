import React, { useContext, useEffect } from "react";
import { Transaction } from "./Transaction";

import { GlobalContext } from "../context/GlobalContext";

export const TransactionList = () => {
  const { transactions, getTransactions, loading, user } =
    useContext(GlobalContext);

  let token;
  if (user && user._id) token = user.token;

  useEffect(() => {
    getTransactions(token);
  }, []);

  if (loading) {
    return "Loading...";
  }
  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.map((transaction) => (
          <Transaction key={transaction._id} transaction={transaction} />
        ))}
      </ul>
    </>
  );
};
