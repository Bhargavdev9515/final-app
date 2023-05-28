import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectWallet } from "./redux/WalletAction";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/navbar/Navbar";

const App = () => {
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
