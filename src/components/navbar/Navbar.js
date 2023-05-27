import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectWallet, connectFailed } from "../../redux/WalletAction";
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import ConenctWallet from "../connectwallet";
import logo from '../../assets/images/logo.png';
import "./styles.css";


const Navbar = () => {

  const [openWallet, setOpenWallet] = useState(false);
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      dispatch(connectWallet("metamask"))
    }
  }, []);

  //connect wallet
  const dispatch = useDispatch();
  const wallet = useSelector((state) => state.WalletConnect);

  const { connected } = wallet;
  const connect = () => {
    setOpenWallet(true);
  };

  const errorDiv = () => {
    return <p>Wallet Disconnected!</p>;
  };

  const { web3Modal } = wallet;
  const disconnect = () => {
    web3Modal.clearCachedProvider();
    dispatch(connectFailed(errorDiv()));
    window.location.reload();
  };

  return (
    <AppBar position="static" color="transparent" className="navbar" elevation={0} >
      <Toolbar className="flex-container">
        <Typography variant="h4" component={Link} to="/" className="navbar-brand">
          <img src={logo} alt="logo" className="logo" /> CryptoTreasure
        </Typography>

        <div className="links">
          <Button component={Link} to="/Mint" className="minting">
            TreasuryNFT
          </Button>
          <Button component={Link} to="/Staking" className="staking">
            StakedNFTs
          </Button>
          <Button
            component="a"
            href={process.env.PUBLIC_URL + '/litePaper.pdf'}
            target="_blank"
            rel="noopener noreferrer"
            className="Litepaper"
          >
            LitePaper
          </Button>

        </div>
        <div className="nav">
          {!wallet.connected && (
            <Button
              variant="contained"
              onClick={connect}
              className="btn"
              size="large"
            >
              Connect Wallet
            </Button>
          )}
          {wallet.connected && (
            <Button
              variant="contained"
              color="primary"
              onClick={disconnect}
              className="btn btn-primary"
            >
              <small>{wallet.address.slice(0, 5) + '...' + wallet.address.slice(-5)}</small>
            </Button>
          )}
        </div>
      </Toolbar>
      <ConenctWallet openWallet={openWallet} setOpenWallet={setOpenWallet} />
    </AppBar>);

}

export default Navbar;
