import React from "react";
import "./styles.css";
import img1 from '../../assets/images/level1.jpg';
import img2 from '../../assets/images/level2.jpg';
import img3 from '../../assets/images/level3.jpg';
import 'react-toastify/dist/ReactToastify.css';
import { Typography } from '@mui/material';


function HomePage() {


  return (
    <>
      <div className="main">
        <div className="content-container">
          <div className="hero">
            <Typography className="heroText">Welcome to the <span className="brand">Crypto Treasure</span> Find the treasure you seek!</Typography>
          </div>
          <div className="image-container">
            <img alt="" src={img1} className="level1 slide" />
            <img alt="" src={img2} className="level2 slide" />
            <img alt="" src={img3} className="level3 slide" />
          </div>
        </div>
      </div >
    </>
  );

}

export default HomePage;