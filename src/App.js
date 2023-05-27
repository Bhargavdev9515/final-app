import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectWallet } from "./redux/WalletAction";
import useWindowDimensions from "./helpers/useWindowDimensions"
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { Container } from "@mui/material";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

const App = () => {
  const { width } = useWindowDimensions();
  const wallet = useSelector(state => state.WalletConnect);
  const dispatch = useDispatch();
  useEffect(() => {
    const { web3Modal } = wallet;
    if (web3Modal.cachedProvider) {
      dispatch(connectWallet("metamask"))
    }
  }, []);
  return (
    <div className="App">
      <Navbar />
      <AppRoutes />
    </div>
  );
}

export default App;
