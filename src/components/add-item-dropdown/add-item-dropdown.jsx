import React from "react";
import styled from "styled-components";
import Dropdown from "react-bootstrap/Dropdown";

const AddDropdown = styled(Dropdown)`
  display: inline-block;
  position: relative;
  padding: 0.25rem;
`;

export default class AddItemDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.changeOption = this.changeOption.bind(this);
  }

  changeOption(e, option) {
    e.preventDefault();
    this.setState({ label: option });
    this.props.change(option);
  }

  render() {
    const activeStyle = {
      backgroundColor: "#fff",
      color: "grey",
      outline: "none",
      boxShadow: "none",
      borderStyle: "solid",
      borderColor: "grey",
      overflow: "hidden",
      textOverflow: "ellipsis",
      margin: "0",
      width: "14vw",
      height: "6vh",
    };

    const inactiveStyle = {
      backgroundColor: "#fff",
      color: "gainsboro",
      outline: "none",
      boxShadow: "none",
      borderStyle: "solid",
      borderColor: "gainsboro",
      overflow: "hidden",
      textOverflow: "ellipsis",
      margin: "0",
      width: "14vw",
      height: "6vh",
    };

    const dropdownMenu = {
      maxHeight: "90vh",
      overflowY: "auto",
    };

    return (
      <AddDropdown>
        <Dropdown.Toggle
          style={this.props.options ? activeStyle : inactiveStyle}
        >
          {this.props.label}
        </Dropdown.Toggle>
        {this.props.options ? (
          <Dropdown.Menu style={dropdownMenu}>
            {this.props.options.map((option) => {
              return (
                <Dropdown.Item
                  style={{ overflowY: "scroll" }}
                  as="button"
                  key={option}
                  onClick={(e) => this.changeOption(e, option)}
                >
                  {option}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        ) : null}
      </AddDropdown>
    );
  }
}
