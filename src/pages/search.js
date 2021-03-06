import React, { Component } from "react";
import Head from 'next/head';
import SearchFilters from "../components/SearchFilters";
import SearchAction from "../components/SearchAction";
import { Container, Row, Col } from "react-bootstrap";

const mainPhoto = "/assets/coupon_img.jpeg";

export default class Search extends Component {
  render() {
    return (
      <Container className="margin-top-container">
        <Head>
          <title>SellShip | Buy & Sell Anything</title>
        </Head>
        <Row>
          <Col>
            <img className="photo-jmbo" src={mainPhoto} />
            <div className="jmboText">
              <h2 style={{ fontWeight: "bolder", fontStyle: "italic" }}>
                $20 OFF $100 PLUS
              </h2>
              <h2 className="free-delivery-text">GET FREE NEXT-DAY DELIVERY</h2>
              <h5 className="code-text">With code: 20100</h5>
              <button className="ok-button">OK</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg="4" md="4" sm="12">
            <SearchAction />
          </Col>
          <Col lg="8" md="8" sm="12">
            <SearchFilters />
          </Col>
        </Row>
      </Container>
    );
  }
}
