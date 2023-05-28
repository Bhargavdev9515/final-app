import React from "react";
import { Box, Typography, Modal, Radio } from "@mui/material";
import {
  useDispatch,
  // useSelector
} from "react-redux";

import { connectWallet } from "../../redux/WalletAction";
import CloseIcon from "@mui/icons-material/Close";
import { Stack } from "react-bootstrap";
import "./styles.css"
import metamask from "../../assets/images/metamask.png"
import coinbase from "../../assets/images/coinbase.png"
import walletconnect from "../../assets/images/wallet.png"


function ConenctWallet({ openWallet, setOpenWallet }) {

  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = React.useState("");
  const [selectedwallet, setSelectedwallet] = React.useState("");

  const handleChange = (event) => {
    setSelectedValue(event.title);
    setSelectedwallet(event.wallet);
  };

  const walletData = [
    {
      title: "Metamask",
      icon: metamask,
      wallet: "metamask",
    },
    {
      title: "Coinbase Wallet",
      icon: coinbase,
      wallet: "coinbasewallet",
    },
    {
      title: "WalletConnect",
      icon: walletconnect,
      wallet: "walletconnect",
    },
  ];

  const connect = (walletname) => {
    setOpenWallet(false);
    dispatch(connectWallet(walletname));
  };

  return (
    <Box>
      <Modal open={openWallet} onClose={() => setOpenWallet(false)} BackdropProps={{ style: { backgroundColor: "rgba(3,6,20,0.9)" } }}>
        <Box className="modal-box">
          <div className="connectwallet_modal">
            <Box className="connect_header">
              <Typography variant="h5" className="walletTitle">
                Connect Wallet
              </Typography>
              <CloseIcon size={25} onClick={() => setOpenWallet(false)} style={{ cursor: "pointer" }} />
            </Box>
            <Box className="itemContainer">
              {/* {cono} */}
              {walletData.map((item, index) => (
                <Box className="radioContainer" key={index}>
                  <Box className="radioTitle">
                    <img alt="" className="icons" src={item.icon} />
                    <Typography variant="body1" className="title">
                      {item.title}
                    </Typography>
                  </Box>
                  <Radio
                    checked={selectedValue === item.title}
                    onChange={() => handleChange(item)}
                    value={item.title}
                    name="radio-buttons"
                    inputProps={{ "aria-label": item.title }}
                    style={{ border: ".5px solid white!important" }}
                  />
                </Box>
              ))}

            </Box>
            <Stack gap={3} style={{ height: "65px" }} className="d-flex justify-content-center align-items-center">
              <button
                className="poc_gradient-btn py-3 "
                onClick={() => { console.log(selectedwallet); connect(selectedwallet) }}
              >
                Connect Wallet
              </button>
            </Stack>
          </div>
        </Box>
      </Modal>
    </Box>
  );
}

export default ConenctWallet;
