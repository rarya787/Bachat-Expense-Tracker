import React, { createContext, useContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
console.log(userInfoFromStorage);

// Initial state
const initialState = {
  transactions: [],
  user: userInfoFromStorage,
  error: null,
  loading: true,
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  async function getTransactions(token) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await axios.get("/api/v1/transactions", config);
      console.log(res);
      dispatch({
        type: "GET_TRANSACTIONS",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function deleteTransaction(id) {
    try {
      await axios.delete(`/api/v1/transactions/${id}`);

      dispatch({
        type: "DELETE_TRANSACTION",
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function addTransaction(transaction, token) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await axios.post("/api/v1/transactions", transaction, config);
      console.log(res);
      dispatch({
        type: "ADD_TRANSACTION",
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function login({ email, password }) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "/api/v1/user/login",
        { email, password },
        config
      );
      console.log(res.data);
      dispatch({
        type: "LOGIN_SUCCESSFUL",
        payload: res.data,
      });
      localStorage.setItem("userInfo", JSON.stringify(res.data));
    } catch (error) {
      console.error(error);
      dispatch({
        type: "LOGIN_ERROR",
        payload: error,
      });
    }
  }

  async function register({ name, email, password }) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "/api/v1/user/register",
        { name, email, password },
        config
      );
      console.log(res.data);
      dispatch({
        type: "REGISTER_SUCCESSFUL",
        payload: res.data,
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: "REGISTER_ERROR",
        payload: error,
      });
    }
  }

  async function logout() {
    localStorage.removeItem("userInfo");
    dispatch({
      type: "LOGOUT",
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        user: state.user,
        error: state.error,
        loading: state.loading,
        getTransactions,
        deleteTransaction,
        addTransaction,
        login,
        register,
        logout,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
