import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import MyReturns from "./pages/MyReturns";
import Dashboard from "./pages/Dashboard";
import Returns from "./pages/Returns";
import Trust from "./pages/Trust";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import ReturnRequest from "./pages/ReturnRequest";
import Analyzing from "./pages/Analyzing";
import Result from "./pages/Result";
import Marketplace from "./pages/Marketplace";

import AdminLayout from "./layouts/AdminLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/return" element={<ReturnRequest />} />
        <Route path="/analyzing" element={<Analyzing />} />
        <Route path="/result" element={<Result />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/my-returns" element={<MyReturns />} />

        {/* Admin Routes */}
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