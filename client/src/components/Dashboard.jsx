import React, { useEffect, useContext } from "react";
import { AddTransaction } from "./AddTransaction";
import { Balance } from "./Balance";
import { Header } from "./Header";
import { IncomeExpenses } from "./IncomeExpenses";
import { TransactionList } from "./TransactionList";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";

const Dashboard = () => {
  const { user } = useContext(GlobalContext);
  const notify = () =>
    toast.success("Login Successful", {
      duration: 2000,
      position: "top-right",
    });

  let navigate = useNavigate();
  console.log(user);
  useEffect(() => {
    if (user && user._id) notify();
    else {
      navigate("/login");
    }
  }, [user]);
  return (
    <>
      <div>
        <Toaster />
      </div>
      <Navbar />
      <Header />
      <div className="container">
        <Balance />
        <IncomeExpenses />
        <TransactionList />
        <AddTransaction />
      </div>
    </>
  );
};

export default Dashboard;
