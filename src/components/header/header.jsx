import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import { useSpring, animated, config } from "react-spring";
import Link from "next/link";
const Brand = "/assets/logo.png";
import BurgerMenu from "./burger-menu";
import CollapseMenu from "./collapse-menu";
import CountryMenu from "./country-menu";
import Cookies from "universal-cookie";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const Avatar = "/assets/user.svg";

import SearchBar from "material-ui-search-bar";
import SignUp from "../sign-up";
import SignIn from "../sign-in";
import Download from "../download";
import { CATEGORIES, SUBCATEGORIES } from "./categories";
import fetch from "isomorphic-fetch";
import { AsyncTypeahead } from "react-bootstrap-typeahead";

const Header = (props) => {
  const [profilepicture, setProfilePicture] = useState("");
  const [country, setCountry] = useState("");

  const barAnimation = useSpring({
    from: { transform: "translate3d(0, -10rem, 0)" },
    transform: "translate3d(0, 0, 0)",
  });

  // const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query) => {
    // setIsLoading(true);
    fetch(
      `https://api.sellship.co/api/searchresults/${props.country}/${query}`
    ).then(async (resp) => {
      const json = await resp.json();
      const options = json;
      // setIsLoading(false);
      setOptions(options);
    });
  };

  // Bypass client-side filtering by returning `true`. Results are already
  // filtered by the search endpoint, so no need to do it again.
  const filterBy = () => true;

  const linkAnimation = useSpring({
    from: { transform: "translate3d(0, 30px, 0)", opacity: 0 },
    to: { transform: "translate3d(0, 0, 0)", opacity: 1 },
    delay: 800,
    config: config.wobbly,
  });

  const cookies = new Cookies();

  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenDownload, setIsOpenDownload] = React.useState(false);
  const [isOpenSignIn, setIsOpenSignIn] = React.useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  const showModalDownload = () => {
    setIsOpenDownload(true);
  };

  const hideModalDownload = () => {
    setIsOpenDownload(false);
  };

  const showModalSignIn = () => {
    setIsOpenSignIn(true);
  };

  const hideModalSignIn = () => {
    setIsOpenSignIn(false);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const userid = cookies.get("login");
        const resp = await fetch("https://api.sellship.co/api/user/" + userid, {
          headers: {
            "ACCESS-CONTROl-ALLOW-ORIGIN": "*",
          },
        });
        resp.json().then((resi) => {
          setProfilePicture(resi.profilepicture);
        });
      } catch (error) {
        console.log("Header-FetchData-Error = ", error);
      }
    }
    fetchData();
  }, []);

  const removeLogin = () => {
    cookies.remove("login", { path: "/" });
    window.location = "/";
  };

  return (
    <>
      <Modal show={isOpen} onHide={hideModal} size="md">
        <Modal.Body>
          <SignUp changeLoggedIn={props.changeLoggedIn} />
        </Modal.Body>
      </Modal>

      <Modal show={isOpenSignIn} onHide={hideModalSignIn} size="md">
        <Modal.Body>
          <div>
            <SignIn changeLoggedIn={props.changeLoggedIn} />
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={isOpenDownload} onHide={hideModalDownload} size="md">
        <Modal.Body>
          <div>
            <Download />
          </div>
        </Modal.Body>
      </Modal>
      <NavBar style={barAnimation}>
        <div className="flex justify-between bg-white h-16 ">
          <Link href="/">
            <a className="my-auto ml-9 lg:ml-20">
              <img
                className="z-10 my-auto w-24 lg:w-24 lg:h-8 mr-6"
                src={Brand}
                alt=""
              />
            </a>
          </Link>
          <AsyncTypeahead
            className="my-auto flex-initial w-50 sm-50 md:w-60 lg:w-80 xl:w-130 mx-auto shadow-sm  "
            filterBy={filterBy}
            id="async-example"
            // isLoading={isLoading}
            labelKey="searchKey"
            minLength={4}
            onSearch={handleSearch}
            options={options}
            placeholder="Search SellShip"
            renderMenuItemChildren={(option, props) => (
              <Fragment>
                <span>{option}</span>
              </Fragment>
            )}
          />

          {props.loggedIn ? (
            <div
              className="hidden relative md:flex items-center	justify-around my-auto lg:mr-12 ml-4"
              style={linkAnimation}
            >
              <button className="bg-purple-700 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center m-2 ">
                <svg
                  className="text-white fill-current w-4 h-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                </svg>
                <span className="whitespace-no-wrap text-white">
                  Download App
                </span>
              </button>

              <Link href="/addItem">
                <a className="transition duration-200 ease-in  mx-2 ">
                  <button className="bg-purple-700 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded">
                    Sell
                  </button>
                </a>
              </Link>

              <ProfileDropdown className="dropdown inline-block relative">
                <button className="text-orange-400 font-semibold py-2 px-4 mr-2 rounded inline-flex items-center">
                  {profilepicture ? (
                    <img
                      className="ml-1 w-12 h-12 rounded-full object-cover"
                      src={profilepicture}
                      alt=""
                    />
                  ) : (
                    <img
                      className="ml-1 w-12 h-12 rounded-full object-cover"
                      src={Avatar}
                      alt=""
                    />
                  )}
                  <ExpandMoreIcon className="profile-arrow" />
                </button>
                <ul className="dropdown-content absolute hidden text-gray-700 pt-1 bg-white rounded-md overflow-hidden shadow-lg">
                  <li>
                    <Link href="/profile">
                      <a className="rounded-t hover:no-underline transition duration-200 ease-in hover:text-orange-300 text-orange-400 py-2 px-4 block whitespace-no-wrap">
                        Profile
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="rounded-t hover:no-underline transition duration-200 ease-in hover:text-orange-300 text-orange-400 py-2 px-4 block whitespace-no-wrap"
                      href="/"
                    >
                      <a onClick={removeLogin}>Sign Out</a>
                    </Link>
                  </li>
                </ul>
              </ProfileDropdown>
            </div>
          ) : (
            <div
              className="hidden relative md:flex items-center	justify-around my-auto lg:mr-18 ml-4"
              style={linkAnimation}
            >
              <button
                className="bg-purple-700 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center m-2 "
                onClick={showModalDownload}
              >
                <svg
                  className="text-white fill-current w-4 h-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                </svg>
                <span className="whitespace-no-wrap text-white">
                  Download App
                </span>
              </button>

              <div
                className="text-gray-700 text-center bg-gray-400 rounded  text-center px-4 py-2 m-2"
                onClick={showModalSignIn}
                style={{ cursor: "pointer" }}
              >
                Login
              </div>
              <div
                className="whitespace-no-wrap bg-purple-700 hover:bg-gray-400 text-white font-bold rounded px-4 py-2 m-2"
                onClick={showModal}
                style={{ cursor: "pointer" }}
              >
                Sign Up
              </div>
            </div>
          )}
          <BurgerWrapper>
            <BurgerMenu
              navbarState={props.navbarState}
              handleNavbar={props.handleNavbar}
            />
          </BurgerWrapper>
        </div>

        <div className="bg-purple-700  h-11 items-center mt-1  -mx-3 overflow-y-auto whitespace-no-wrap scroll-hidden">
          <ul className="flex content-between flex justify-between mx-auto items-center pl-4 pr-4 overflow-x-auto">
            {CATEGORIES.map((category, index) => (
              <CategoryDropdown
                key={index}
                className="text-white text-center mx-auto py-3 pl-4 pr-4"
              >
                <Link href={`/category/${props.country}/${category}/`}>
                  <a
                    key={index + 20}
                    className="hover:no-underline hover:text-white"
                  >
                    {category}
                  </a>
                </Link>

                <ul className="dropdown-content absolute hidden text-gray-500 pt-1 bg-white rounded-md  shadow-md">
                  {SUBCATEGORIES[category].map((subcategory, index) => (
                    <li style={{ padding: "0rem", margin: "0" }} key={index}>
                      <Link
                        href={`/category/${props.country}/${category}/${subcategory}`}
                      >
                        <a>{subcategory}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CategoryDropdown>
            ))}
          </ul>
        </div>
      </NavBar>
      <CollapseMenu
        loggedIn={props.loggedIn}
        changeLoggedIn={props.changeLoggedIn}
        removeLogin={removeLogin}
        country={props.country}
        onChange={props.countryChange}
        navbarState={props.navbarState}
        handleNavbar={props.handleNavbar}
      />
    </>
  );
};

export default Header;
const NavBar = styled(animated.nav)`
  font-family: "Open Sans", sans-serif;
  display: flex;
  flex-direction: column;
  position: sticky;
  width: 100%;
  top: 0;
  background: #fff;
  z-index: 1000;
  font-size: 1rem;
  box-shadow: 0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;
const BurgerWrapper = styled.div`
  margin: auto 2.4rem auto 0rem;
  @media (min-width: 800px) {
    display: none;
  }
`;
const ProfileDropdown = styled.div`
  &:hover > .dropdown-content {
    display: block;
  }
  &:hover .profile-arrow {
    transition: 0.3s ease;
    transform: rotate(180deg);
  }
`;
const CategoryDropdown = styled.li`
  font-family: "Open Sans", sans-serif;
  width: 100%;
  padding: 5px;
  &:hover > .dropdown-content {
    display: block;
  }
`;
