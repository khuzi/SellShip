import React, { useState, useEffect } from "react";
import Head from "next/head";

import Cookies from "universal-cookie";

import Header from "../components/header/header";
import Footer from "../components/footer/Footer";
import ChatPopup from "../components/chat/chat-popup";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import "../styles/compStyles/Accordion.css";
import "../styles/compStyles/card.css";
import "../styles/compStyles/Footer.css";
import "../styles/compStyles/form-input.scss";
import "../styles/compStyles/header.scss";
import "../styles/compStyles/myitems.css";
import "../styles/compStyles/product.css";
import "../styles/compStyles/productCard.css";
import "../styles/compStyles/profile.css";
import "../styles/compStyles/search.css";
import "../styles/compStyles/SearchFilter.css";
import "../styles/Home.css";
import "../styles/Help.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  let cookies = new Cookies();

  const handleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  const countryChange = (country) => {
    setCountry(country);
  };

  const changeLoggedIn = () => {
    setLoggedIn(!loggedIn);
  };

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then(async (data) => {
        setCountry(data.country_name);
      });
    if (cookies.get("login")) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [cookies]);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>
      <Header
        changeLoggedIn={changeLoggedIn}
        loggedIn={loggedIn}
        country={country}
        countryChange={countryChange}
        navbarState={navbarOpen}
        handleNavbar={handleNavbar}
      />
      {loggedIn && <ChatPopup />}
      <Component
        {...pageProps}
        countryChange={countryChange}
        country={country}
        loggedIn={loggedIn}
      />
      <Footer />
    </>
  );
}

export default MyApp;
