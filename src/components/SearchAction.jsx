import React, { Component } from "react";
import icons from "../image/suit-img.jpg";
import { DropdownButton, Dropdown } from "react-bootstrap";
import RangeSlider from "./Slider";

import "./css/search.css";

export default class SearchAction extends Component {
  constructor() {
    super();
    this.state = {
      typesOfwear: [
        { name: "coats", icon: "../img/suit-img.jpg" },
        { name: "tops", icon: "../img/suit-img.jpg" },
        { name: "knitwear", icon: "../img/suit-img.jpg" },
      ],
    };
  }

  render() {
    return (
      <div>
        <div className="actionsBtn1" style={{}}>
          {/* <div className="actions" style={{ height: "30px" }}>
            <h5 style={{ marginTop: "10px" }}>HOME</h5>
            <i
              style={{ marginTop: "5px" }}
              class="fa fa-home"
              aria-hidden="true"
            ></i>
          </div>

          <div className="actions">
            <h5>NEW IN</h5>
            <i class="fa fa-fighter-jet" aria-hidden="true"></i>
          </div>

          <div className="actions">
            <h5>COATS</h5>
            <img style={{ width: "50px", height: "50px" }} src={icons} />
          </div>
          <div className="actions">
            <h5>TOPS</h5>
            <img style={{}} src={icons} />
          </div>
          <div className="actions">
            <h5
              style={{
                fontStyle: "italic",
                marginLeft: "28px",
                fontSize: "10px",
                fontWeight: "900",
              }}
            >
              KNITWEAR
            </h5>
            <img style={{ width: "50px", height: "50px" }} src={icons} />
          </div> */}
          <div className="search-wrapper">
            <div
              className="type"
              style={{ marginTop: "10px", marginLeft: "10px", width: "100%" }}
            >
              <p className="type-text">Types</p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  width: "220px",
                  marginTop: "-5px",
                }}
              >
                <button className="type-btn .type-btn-coats">Coats</button>
                <button className="type-btn .type-btn-tops">Tops</button>
                <button className="type-btn .type-btn-knits">Knit Wear</button>
              </div>
            </div>
            <div
              className="type"
              style={{ marginTop: "10px", marginLeft: "10px", width: "100%" }}
            >
              <p className="type-text">Price</p>
              <div className="range-slider">
                <div style={{ width: "220px" }}>
                  <RangeSlider />
                </div>
              </div>
            </div>
            <div
              className="type"
              style={{ marginTop: "10px", marginLeft: "10px", width: "100%" }}
            >
              <p className="type-text">Size</p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  width: "220px",
                  marginTop: "-5px",
                }}
              >
                <button className="type-btn" style={{ width: "23.3%" }}>
                  Small
                </button>
                <button className="type-btn" style={{ width: "" }}>
                  Medium
                </button>
                <button className="type-btn" style={{ width: "" }}>
                  Large
                </button>
              </div>
            </div>
            <div
              className="type"
              style={{ marginTop: "10px", marginLeft: "10px", width: "100%" }}
            >
              <p className="type-text">Colour</p>

              <div class="dropdown">
                <button class="dropbtn dropbtn-colour">Colour</button>
                <div class="dropdown-content">
                  <a href="#">Red</a>
                  <a href="#">Black</a>
                  <a href="#">Brown</a>
                </div>
              </div>
            </div>
            <div
              className="type"
              style={{ marginTop: "10px", marginLeft: "10px", width: "100%" }}
            >
              <p className="type-text">Style</p>

              <div class="dropdown">
                <button class="dropbtn">Style</button>
                <div class="dropdown-content">
                  <a href="#">Western</a>
                  <a href="#">Men</a>
                  <a href="#">Women</a>
                </div>
              </div>
            </div>

            <div
              className="actionbtnfilter"
              style={{ margin: "10px", alignItems: "center" }}
            >
              <button>Cancel</button>
              <button className="btn-apply">Apply</button>
            </div>
          </div>
        </div>
      
      </div>
    );
  }
}
