import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const Map = (props) => {
  const changeLocation = (e) => {
    var lat = e.latLng.lat();
    var long = e.latLng.lng();
    fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
        lat +
        "," +
        long +
        "&key=AIzaSyAL0gczX37-cNVHC_4aV6lWE3RSNqeamf4"
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.results[0]) {
          var components = data.results[0].address_components;
          props.setAddress(lat, long, components);
        }
      });
  };

  return (
      <GoogleMap
        defaultZoom={10}
        center={{ lat: props.latitude, lng: props.longitude }}
        onClick={changeLocation}
      >
        <Marker
          position={{
            lat: props.latitude,
            lng: props.longitude,
          }}
        />
      </GoogleMap>
  );
};

const AddItemMap = withScriptjs(withGoogleMap(Map));

export default AddItemMap;
