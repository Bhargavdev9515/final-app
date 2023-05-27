import React, { useEffect, useState } from "react";
// import "./styles.css";
import { Row, Col } from "react-bootstrap";
import styles from "./minting.module.css"



// const placeholder = require("../../assets/images/placeholder.jpg").default;

function UserNfts() {
  const [nftdatas, setnftdatas] = useState([]);
  useEffect(() => {
    // setnftdatas(Nftsdata)
  }, [])
  return (
    <Row className="metabloq_container mt-5">
      <h4 className="text-center"></h4>
      <br />
      {console.log("nftdatas", nftdatas)}
      {nftdatas.map((row) => (
        <Col xxl={3} xl={3} lg={3} md={3} sm={6} xs={6} className="mb-3">
          <div className="nft-card">
            <div className="img-container">
              <img
                src={row.logo}
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
              />
            </div>
            <span>{row.NftName}</span>
          </div>
        </Col>
      ))}
    </Row>
  );
}

export default UserNfts;
