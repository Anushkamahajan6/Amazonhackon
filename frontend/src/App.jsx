import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyReturns from "./pages/MyReturns";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Returns from "./pages/Returns";
import Trust from "./pages/Trust";
import Topbar from "./components/Topbar";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import ReturnRequest from "./pages/ReturnRequest";
import Analyzing from "./pages/Analyzing";
import Result from "./pages/Result";
import AdminLayout from "./layouts/AdminLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer Routes */}
        <Route path="/result" element={<Result />} />
        <Route path="/analyzing" element={<Analyzing />} />
        <Route path="/return" element={<ReturnRequest />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/home" element={<Home />} />

        <Route path="/my-returns" element={<MyReturns />} />
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/trust" element={<Trust />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
