import React, { Component } from "react";
import ItemCard from "./ProductItemCard";
import { DropdownButton, Dropdown } from "react-bootstrap";
import MaskGroup from "../image/assetss/Mask Group 25.png";
import {Col,Row} from 'react-bootstrap'
import MaskGroup24 from "../image/assetss/Mask Group 24.png";
import "./css/search.css";

export default class SearchFilters extends Component {
  render() {
    return (
      <Row>
      {[
        { title: "Water Sunglasses", imageUrl: MaskGroup },
        { title: "Golden Zizi Bag", imageUrl: MaskGroup24 },
        { title: "Water Sunglasses", imageUrl: MaskGroup },
        { title: "Golden Zizi Bag", imageUrl: MaskGroup24 },
        { title: "Water Sunglasses", imageUrl: MaskGroup },
        { title: "Golden Zizi Bag", imageUrl: MaskGroup24 },
      ].map((x) => (
        <Col  lg="3" sm="6" xs="6" md="3">
        <ItemCard title={x.title} imageUrl={x.imageUrl} />
        </Col>
      ))}
      </Row>
    );
  }
}
