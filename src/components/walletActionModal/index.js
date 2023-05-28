import React from "react";
import { Box, CardMedia, Typography, Modal, Radio } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Stack } from "react-bootstrap";
import img1 from "../../assets/images/wallet1.svg"
import img2 from "../../assets/images/wallet2.svg"
import img3 from "../../assets/images/wallet3.svg"
import loader from "../../assets/images/loading.gif"
import "../connectwallet/styles.css"

function WalletActionModal(props) {
  let { walletOpen, setWalletOpen, loader1, loader2, hashValue } = props;

  const link = process.env.REACT_APP_transactionHashlink + "" + hashValue;
  // console.log("hashValue",hashValue)
  return (
    <Box>
      <Modal open={walletOpen} onClose={() => setWalletOpen(false)} BackdropProps={{ style: { backgroundColor: "rgba(3,6,20,0.9)" } }}>
        <Box className="modal-box">
          <div className="connectwallet_modal">
            <Box className="connect_header">
              <Typography variant="h5" className="walletTitle">
                Wallet Action
              </Typography>
              <CloseIcon size={25} onClick={() => setWalletOpen(false)} />
            </Box>
            <Box className="itemContainer">
              {/* {walletData.map((item, index) => ( */}
              <Box className="radioContainer" >
                <Box className="radioTitle">
                  <CardMedia
                    component="img"
                    image={img1}
                    style={{ width: "30px", height: "30px" }}
                  />
                  <p style={{ opacity: ".6", margin: "0 .5em", color: "black" }}>
                    Request to Send Wallet
                  </p>
                </Box>
                <Radio
                  checked={true}
                  value={"Request to Send Wallet"}
                  name="radio-buttons"
                  inputProps={{ "aria-label ": "Request to Send Wallet" }}
                  style={{ border: ".5px solid white!important" }}
                />
              </Box>
              <Box className="radioContainer">
                <Box className="radioTitle">
                  <CardMedia
                    component="img"
                    image={img2}
                    style={{ width: "30px", height: "30px" }}
                  />
                  <p style={{ opacity: ".6", margin: "0 .5em", color: "black" }}>
                    Transaction Underway
                  </p>
                </Box>
                {loader1 ?
                  <img src={loader} style={{ width: "20px", height: "20px" }} alt="loader" />
                  :
                  <Radio
                    checked={!loader1 && !loader2}
                    value={"Transaction Underway"}
                    name="radio-buttons"
                    inputProps={{ "aria-label": "Transaction Underway" }}
                    style={{ border: ".5px solid white!important" }}
                  />
                }
              </Box>
              <Box className="radioContainer">
                <Box className="radioTitle">
                  <CardMedia
                    component="img"
                    image={img3}
                    style={{ width: "30px", height: "30px" }}
                  />
                  <p style={{ opacity: ".6", margin: "0 .5em", color: "black" }}>
                    Waiting for Confirmation
                  </p>
                </Box>
                {loader2 ?
                  <img src={loader} style={{ width: "20px", height: "20px" }} alt="loader" />
                  :
                  <Radio
                    checked={!loader2 && !loader1}
                    value={"Waiting for Confirmation"}
                    name="radio-buttons"
                    inputProps={{ "aria-label": "Waiting for Confirmation" }}
                    style={{ border: ".5px solid white!important" }}
                  />
                }
              </Box>
              <Stack gap={3} style={{ height: "65px" }} className="d-flex justify-content-center align-items-center">
                <button
                  className="poc_gradient-btn py-3"
                  disabled={hashValue === undefined}
                  onClick={() => { setWalletOpen(false) }}
                >
                  {/* {console.log("link",link)} */}
                  {hashValue === undefined ? <div style={{ textDecoration: "none" }}> <small style={{ color: "white" }}>CHECK IN SCAN</small> </div> :
                    <a href={link} target='blank' style={{ textDecoration: "none" }}>
                      <small style={{ color: "white" }}>CHECK IN SCAN</small></a>
                  }
                </button>
              </Stack>
            </Box>
          </div>
        </Box>
      </Modal>
    </Box>
  );
}

export default WalletActionModal;
