import React from "react";
import { GlobalContextProvider } from "./context/GlobalContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Dashboard from "./components/Dashboard";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
function App() {
  return (
    <Router>
      <GlobalContextProvider>
        <Routes>
          <Route index element={<Dashboard />} exact />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
        </Routes>
      </GlobalContextProvider>
    </Router>
  );
}

export default App;
