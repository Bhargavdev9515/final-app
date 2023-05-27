import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/homePage";
import Mint from "../pages/Minting";
import Staking from "../pages/Staking";

function AppRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route exact path="/Mint" element={<Mint />} />
      <Route exact path="/Staking" element={<Staking />} />
      {/* <Route exact path="/litePaper" element={<litePaper />} /> */}
    </Routes>
  );
}

export default AppRoutes;
