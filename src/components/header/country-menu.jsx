import React, {Component} from 'react';
import styled from "styled-components";
import Dropdown from "react-bootstrap/Dropdown";

const CountryDropdown = styled(Dropdown)`
  display: inline-block;
`

export default class CountryMenu extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      countries: [],
      currCountry : null,
      showMenu: false,
      button: props.country
    }
    this.changeCountry = this.changeCountry.bind(this);
  }

  componentDidMount() {
    fetch("https://api.sellship.co/api/getcountries",
      {
        headers: {"ACCESS-CONTROL-ALLOW-ORIGIN" : "*",}
      })
      .then(response=> response.json())
      .then(data=> this.setState({countries: data}))
  }

  changeCountry(e, country) {
    e.preventDefault();
    this.props.onChange(country);
    this.setState({button: country});
  }

  componentDidUpdate() {
    if (this.props.country !== this.state.button) {
      this.setState({button: this.props.country});
    }
  }

  render(){
    const buttonStyle = {
      backgroundColor: "#ffff",
      color: "#ED8936", 
      borderStyle: "solid",
      borderColor: "#ffff",
      fontWeight: 'bold',
      boxShadow: "0 2px 4px -1px rgba(0, 0, 0, 0.1)",
      height: 42,
      
    }

    return(
      <CountryDropdown>
        <Dropdown.Toggle style={buttonStyle} >
          {this.state.button}
        </Dropdown.Toggle>
        <Dropdown.Menu className="border-none shadow-lg">
          {this.state.countries.map( (country) =>{
            return(
              <Dropdown.Item as="button" key={country} style={{fontSize: 16, color: "#ED8936", fontWeight: "500"}} onClick={(e) => this.changeCountry(e, country)} >{country}</Dropdown.Item>
              );
            })
          }
        </Dropdown.Menu>
      

      </CountryDropdown>
    )
  }
}