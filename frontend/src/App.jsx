import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

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

function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Topbar />

          <main className="p-6 bg-gray-100 min-h-screen">
            <Routes>
               {/* Customer Routes */}
              <Route path="/result" element={<Result />} />
              <Route path="/analyzing" element={<Analyzing />} />
              <Route path="/return" element={<ReturnRequest />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/home" element={<Home />} />

                {/* Admin Routes */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/returns" element={<Returns />} />
              <Route path="/trust" element={<Trust />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
