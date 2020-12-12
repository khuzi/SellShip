import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import "./Footer.css";

function Footer() {
  return (
    // <div className="main-footer">
    //   <div
    //     className=""
    //     style={{
    //       display: "flex",
    //       width: "80%",
    //       margin: "0 auto",
    //       flexWrap: "wrap",
    //     }}
    //   >
    <Container className="footer-container" style={{marginTop:"40px"}}>
          <Row>
           <Col md="2" lg="2" sm="6" xs="6">
            <h6>Follow us</h6>
            <ul className="list-unstyled">
              <li>facebook</li>
              <li>Instagram</li>
              <li>Tweeter</li>
              <li>Whatsapp</li>
              <li>lorem 2</li>
            </ul>
            </Col>

          {/* Container */}
            <Col md="2" lg="2" sm="6" xs="6">
            <h6>Cars & Property</h6>
            <ul className="list-unstyled">
              <li>Cars</li>
              <li>Car Accessories</li>
              <li>Property</li>
              <li>Motorbike</li>
            </ul>
            </Col>

          {/* Container1 */}
          <Col md="2" lg="2" sm="6"  xs="6">
            <h6>Fashion</h6>
            <ul className="list-unstyled">
              <li>Men's fashion</li>
              <li>Women's fashion</li>
              <li>Health & Beauty</li>
              <li>Luxury</li>
            </ul>
            </Col>

          {/* Container1 */}
          <Col md="2" lg="2" sm="6"  xs="6">
            <h6>Home & Living</h6>
            <ul className="list-unstyled">
              <li>Furniture</li>
              <li>Gardening</li>
              <li>Home Appliences</li>
              <li>Assitive Devices</li>
              <li>Babies & Kids</li>
              <li>Books & Stationery</li>
            </ul>
            </Col>

          <Col md="2" lg="2" sm="6"  xs="6">
            <h6>Mobile & Elecrtonics</h6>
            <ul className="list-unstyled">
              <li>Electronics</li>
              <li>Mobile & Tablets</li>
            </ul>
            </Col>

          <Col md="2" lg="2" sm="6"  xs="6">
            <h6>Hobbies & Games</h6>
            <ul className="list-unstyled">
              <li>Learning & Enrichments</li>
              <li>Photography</li>
              <li>Pet Supplies </li>
              <li>Design & Carft</li>
              <li>Food & Drinks </li>
              <li>Music & Media</li>
              <li>Toys & Games</li>
              <li>Vintage & Collection</li>
              <li>Travel</li>
              <li>Sports</li>
              <li>Entertainment</li>
              <li>Bicycle</li>
            </ul>
            </Col>

          <Col md="2" lg="2" sm="6"  xs="6">
            <h6>Jobs & Services</h6>
            <ul className="list-unstyled">
              <li>Jobs</li>
              <li>Lifestyle Services</li>
              <li>Business Services</li>
              <li>Home Services</li>
            </ul>
            </Col>
            <Col md="2" lg="2" sm="6"  xs="6">
            <h6>others</h6>
            <ul className="list-unstyled">
              <li>Bullet Board</li>
              <li>Everything Else</li>
              <li>Free Items</li>
            </ul>
            </Col>
        </Row>
        
      
      <Container><Row><Col>
      <div className="">
        <img style={{ height: "60px" }} src="assets/navImage.png" />
        <a href="/help">Help Centre</a>
        <a href={{}}>Contact Us</a>
        <a href={{}}>Press</a>
        <a href={{}}>Jobs</a>
        <a href={{}}>Advertise with US</a>
        <a href={{}}>Terms</a>
        <a href={{}}>Privacy</a>
      </div>
      </Col></Row></Container>
    </Container>
  );
}
export default Footer;
