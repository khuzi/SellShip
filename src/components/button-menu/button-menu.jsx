import React from "react";
// import "../../assets/main.css";
import styled from 'styled-components';

const Wrapper = styled.span`
  margin-right: 1vw;
`

const ButtonMenu = (props) => {
  return(
    props.labels.map((label) => {
      var text;
      if(props.unit){
        text = "Up to " + label + " " + props.unit;
      } else {
        text = label;
      }
      return(
        <Wrapper>
        {label === props.selected?
          <button id={label} className="bg-purple-700 text-white rounded py-2 px-4 font-semibold" onClick={props.change}>
            {text}
          </button>
          :
          <button id={label} className="bg-transparent text-purple-700 py-2 px-4 border border-purple-700 rounded font-semibold" onClick={props.change}>
            {text}
          </button>}
        </Wrapper>
        
      );
    })
  );
};

export default ButtonMenu;