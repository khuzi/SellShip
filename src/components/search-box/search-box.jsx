import React from "react";
import { withScriptjs } from "react-google-maps";
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";
import styled from 'styled-components';

const SearchInput = styled.input`
  box-sizing: border-box;
  border: 1px solid transparent;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  font-size: 14px;
  outline: none;
  height: 100%;
  text-overflow: ellipses;
`

const SearchBox = (props) => {
  const refs = {}

  const onSearchBoxMounted = ref => {
    refs.searchBox = ref;
  }

  const onPlacesChanged = () => {
    const places = refs.searchBox.getPlaces();
    if (places[0]) {
      var info = places[0];
      var lat = info.geometry.location.lat();
      var long = info.geometry.location.lng();
      var components = info.address_components;
      props.setAddress(lat, long, components);
    }
  }

  return (
      <StandaloneSearchBox
        ref={onSearchBoxMounted}
        onPlacesChanged={onPlacesChanged}
      >
        <SearchInput type="text" placeholder="Search for your location"
          style={{
            width: `100%`
          }}/>
      </StandaloneSearchBox>
  );
};

const Search = withScriptjs(SearchBox);

export default Search;
