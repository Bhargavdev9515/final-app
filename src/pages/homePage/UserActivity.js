import React from 'react'
import { Row, Col, Stack } from "react-bootstrap";
import { useEffect, useState } from "react";

function UserActivity({ getminted }) {
  console.log("getminted", getminted)
  const [minted, getminteds] = useState([]);
  useEffect(() => {
    getminteds(getminted);
  }, [getminted])

  return (
    <div className="ranking_table metabloq_container mt-5">
      <br />
      <br />
      <>
        {console.log("getmintedss", minted)}
        {minted.map((data) => (

          <div>
            <Row className="ranking_table-body d-flex justify-content-between align-items-center">
              <Col>
                <div className="d-flex justify-content-start align-items-center ml-4">
                  <small className="lufga-bold mx-1">{data.Activity}</small>
                </div>
              </Col>
              <Col>
                <div className="d-flex justify-content-start align-items-center ml-4">
                  <a style={{ textDecoration: "none" }} className="mx-1" target="blank">{data.Hash.slice(0, 5) + "..." + data.Hash.slice(-5)}</a>
                </div>
              </Col>
              <Col className="text-center">
                {/* <Stack gap={2} direction="horizontal">
              <div className="d-flex flex-column"> */}
                <small >{data.Users}</small>
                {/* </div>
            </Stack> */}
              </Col>
              <Col className="text-center">
                <small className="lufga-bold">{data.Price}</small>
              </Col>
              <Col className="text-center">
                <small>{data.Quantity}</small>
              </Col>
              <Col className="text-center">
                <small>{data.From.slice(0, 4) + "..." + data.From.slice(-5)}</small>
              </Col>
              <Col className="text-center">
                <small>{data.To.slice(0, 4) + "..." + data.To.slice(-5)}</small>
              </Col>
              <Col className="text-center">
                <small>{data.createdAt.slice(0, 10)}</small>
              </Col>
            </Row>
          </div>
        ))
        }

        <hr style={{ backgroundColor: "gray" }} />
      </>
    </div>
  )
}

export default UserActivity