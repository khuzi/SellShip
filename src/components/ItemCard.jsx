import React, { Component } from "react";
import { Card, CardDeck } from "react-bootstrap";
import Link from "next/link";
// import '../assets/main.css';
// import "./css/card.css";
const knifeItem = "/assets/knifeItem.png";

export default class ItemCard extends Component {
  render() {
    return (
      <Link href={`/category/${this.props.country}/${this.props.title}`}>
        <a className="hover:no-underline hover:text-orange-200 transiton duration-200">
          <Card className="home-category-card">
            <Card.Img
              className={`card-image ${this.props.title}`}
              variant="top"
              src={this.props.imageUrl}
            />
            <Card.Body style={{ justifyContent: "center" }}>
              <Card.Title className="card-title">{this.props.title}</Card.Title>
            </Card.Body>
          </Card>
        </a>
      </Link>
    );
  }
}
