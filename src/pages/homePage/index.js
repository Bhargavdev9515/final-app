import React, { useEffect, useState } from "react";
import "./styles.css";
import { Row, Col, Image, Stack } from "react-bootstrap";
import img1 from '../../assets/images/level1.jpg';
import img2 from '../../assets/images/level2.jpg';
import img3 from '../../assets/images/level3.jpg';
import { useDispatch, useSelector } from "react-redux";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import UserNfts from "./UserNfts";
import UserActivity from "./UserActivity";
import WalletActionModal from "../../components/walletActionModal";
import { Container, Typography } from '@mui/material';


function HomePage() {

  const wallet = useSelector((state) => state.WalletConnect);
  const { web3, address, mint, mintoApp, token } = wallet;

  const [logo, setlogo] = useState("");
  const [NftName, setNftName] = useState("");
  const [description, setdescription] = useState("")

  const [walletOpen, setWalletOpen] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [Loading1, setLoading1] = useState(false);
  const [hashValue, setHashvalue] = useState("");

  const [getminted, setgetminted] = useState([]);
  const [Moralisdatas, setMoralisdatas] = useState([]);
  const [Nftsdata, setNftsdata] = useState([]);
  // useEffect(() => {
  //   if (address != "") {
  //     getdata();
  //     // getmoralisdata();
  //   }
  // }, [wallet.connected])


  // const nftdetailes = async (row) => {
  //   // const res = await axios.get('http://localhost:4000/getNFTs')
  //   // const result1 = res.data.result;
  //   var requestOptions = {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //     redirect: "follow",
  //   };
  //   fetch(process.env.REACT_APP_baseurl + "/getmintdata", requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       const result1 = result.result
  //       const steps = []
  //       console.log("result1", result1)
  //       const info = result1.map((dat) => {
  //         if (dat.Users) {
  //           row && row.map((value) => {
  //             if (value.token_id == Number(dat.Users)) {
  //               console.log(value.name)
  //               steps.push(dat)
  //             }
  //           })
  //         }
  //       });
  //       setNftsdata(steps)

  //     })
  //     .catch((e) => console.log("error", e));

  // }

  // const getdata = () => {
  //   var requestOptions = {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //     redirect: "follow",
  //   };
  //   fetch(process.env.REACT_APP_baseurl + "/getmintdata", requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log("result", result.result)
  //       let datas = [];
  //       result.result.map((row) => {
  //         if (row.From == address.toLowerCase()) {
  //           datas.push(row);
  //         }

  //       })
  //       setgetminted(datas);

  //     })
  //     .catch((e) => console.log("error", e));
  // }

  const nftname = (e) => {
    console.log("nftnames", e)
    setNftName(e)
  }

  const descriptions = (e) => {
    console.log("description", e)
    setdescription(e)
  }

  // const balance=async()=>{
  //    const ba=await token.methods.balanceOf(address).call();
  //    console
  // }

  return (
    <>
      <div className="main">
        <div className="content-container">
          <div className="hero">
            <Typography className="heroText">Welcome to the <span className="brand">Crypto Treasure</span> Find the treasure you seek!</Typography>
          </div>
          <div className="image-container">
            <img src={img1} className="level1 slide" />
            <img src={img2} className="level2 slide" />
            <img src={img3} className="level3 slide" />
          </div>
        </div>
      </div >
    </>
  );

}

export default HomePage;