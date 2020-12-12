import React, { Component } from "react";
import { Card, CardDeck } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../assets/main.css';
import "./css/card.css";
// import knifeItem from "../../image/knifeItem.png";

export default class ItemCard extends Component {
  render() {
    return (
      <Link to={`/category/${this.props.country}/${this.props.title}`} className='hover:no-underline hover:text-orange-200 transiton duration-200'>
        <Card
          className="home-category-card"
        >
          <Card.Img
            className={`card-image ${this.props.title}`}
            variant="top"
            src={this.props.imageUrl}
          />
          <Card.Body style={{ justifyContent: "center" }}>
            <Card.Title className="card-title">{this.props.title}</Card.Title>

          </Card.Body>
        </Card>
      </Link>
    );
  }
}
