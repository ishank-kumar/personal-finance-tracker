// === FOLDER: frontend/src/App.js ===
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Transactions from "./components/TransactionForm";
import Budgets from "./pages/Budgets";
import Sidebar from "./components/Sidebar";
import "./styles/App.css";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <Router>
      <div className="app">
        <Sidebar
          isOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          closeSidebar={closeSidebar}
        />
        <div className="main-content" onClick={closeSidebar}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/budgets" element={<Budgets />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
