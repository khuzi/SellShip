import React, { useState } from "react";
import styled from "styled-components";
import Link from 'next/link';
import { useSpring, animated } from "react-spring";
import Modal from "react-bootstrap/Modal";
import SignUp from "../sign-up";
import SignIn from "../sign-in";
import CountryMenu from "./country-menu";

const CollapseMenu = (props) => {
  const { open } = useSpring({ open: props.navbarState ? 0 : 1 });

  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenSignIn, setIsOpenSignIn] = React.useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  const showModalSignIn = () => {
    setIsOpenSignIn(true);
  };

  const hideModalSignIn = () => {
    setIsOpenSignIn(false);
  };

  if (props.navbarState === true) {
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
        <CollapseWrapper
          style={{
            transform: open
              .interpolate({
                range: [0, 0.2, 0.3, 1],
                output: [0, -20, 0, -200],
              })
              .interpolate((openValue) => `translate3d(0, ${openValue}px, 0`),
          }}
        >
          {props.loggedIn ? (
            <NavLinks>
              {/* <li>
                <CountryMenu
                  onChange={props.onChange}
                  country={props.country}
                />
              </li> */}
              <li>
                <Link href="/addItem" onClick={props.handleNavbar}>
                  Add item
                </Link>
              </li>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <Link href="/" onClick={props.removeLogin}>
                  Sign out
                </Link>
              </li>
            </NavLinks>
          ) : (
            <NavLinks>
              <li>
                <button
                  className="hover:no-underline transition duration-200 ease-in hover:text-orange-300 text-orange-400 font-semibold mx-4 py-2"
                  onClick={showModalSignIn}
                >
                  Sign in
                </button>
              </li>
              <li>
                <button
                  className="hover:no-underline transition duration-200 ease-in hover:text-orange-300 text-orange-400 font-semibold mx-4 py-2"
                  onClick={showModal}
                >
                  Sign up
                </button>
              </li>
              {/* <li>
                <CountryMenu
                  onChange={props.onChange}
                  country={props.country}
                />
              </li> */}
            </NavLinks>
          )}
        </CollapseWrapper>
      </>
    );
  }
  return null;
};

export default CollapseMenu;

const CollapseWrapper = styled(animated.div)`
  background: #fff;
  position: fixed;
  top: 1.5rem;
  right: 0;
  float:right;
  width: 30%;
  z-index: 20;
  border-bottom: 1px solid #ff6d00;
  border-right: 1px solid #ff6d00;
`;

const NavLinks = styled.ul`
  list-style-type: none;
  padding: 3rem 1rem 2rem 2rem;
  & li {
    transition: all 300ms linear 0s;
  }
  & a {
    font-size: 1.4rem;
    line-height: 2;
    color: #ff6d00;
    text-decoration: none;
    cursor: pointer;
    &:hover {
      color: #fdcb6e;
      border-bottom: 1px solid #fdcb6e;
    }
  }
`;
