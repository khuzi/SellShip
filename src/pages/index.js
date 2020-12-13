import React, { useState, useEffect, useCallback } from "react";
import Head from "next/head";

import axios from "axios";
import { Row, Col, Container } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";
import LoadingItem from "../components/loading-item.jsx";
import PulseLoader from "react-spinners/PulseLoader";
import ItemCard from "../components/ItemCard";
import ProductItemCard from "../components/ProductItemCard";
import Modal from "react-bootstrap/Modal";
import AdSense from "react-adsense";
import { BorderAllRounded } from "@material-ui/icons";
import Download from "../components/download";

const Electronics = "/assets/Electronics.svg";
const Beauty = "/assets/Beauty.svg";
const Book = "/assets/Book.svg";
const Sports = "/assets/Sports.svg";
const Fashion = "/assets/Fashion.svg";
const Motors = "/assets/Motors.svg";
const HomeSvg = "/assets/Home.svg";
const Toys = "/assets/Toys.svg";
const Garden = "/assets/Garden.svg";
const Vintage = "/assets/Vintage.svg";
const Luxury = "/assets/Luxury.svg";
const Handmade = "/assets/knitting.svg";
const Man = "/assets/Man.svg";
const Women = "/assets/Women.svg";
const MainImage = "/assets/homepagetop.PNG";
const downloadapp = "/assets/downloadapp.svg";

export default function Home(props) {
  const [limit, setLimit] = useState(20);
  const [isOpenDownload, setIsOpenDownload] = React.useState(false);
  const [country, setCountry] = useState("");
  const [items, setItems] = useState([]);
  const [currency, setCurrency] = useState("");
  const [skip, setSkip] = useState(0);

  const getItems = useCallback(
    async (country, skip, limit) => {
      const { data } = await axios.get(
        "https://api.sellship.co/api/recentitems/" +
          country +
          "/" +
          skip +
          "/" +
          limit
      );
      console.log(data);
      setItems(items.concat(data));
    },
    [items]
  );

  const showModalDownload = () => {
    setIsOpenDownload(true);
  };

  const hideModalDownload = () => {
    setIsOpenDownload(false);
  };

  const loadMore = () => {
    setSkip(skip + 20);
    setLimit(limit + 20);
    getItems(country, skip, limit);
  };

  const currencyDetector = (detectedCountry) => {
    switch (detectedCountry) {
      case "United Arab Emirates":
        setCurrency("AED ");
        break;
      case "United Kingdom":
        setCurrency("£ ");
        break;
      case "Canada":
      case "United States":
        setCurrency("$ ");
        break;
      default:
        setCurrency("$");
        break;
    }
  };

  useEffect(() => {
    if (items.length === 0) {
      try {
        fetch("https://ipapi.co/json/")
          .then((res) => res.json())
          .then(async (data) => {
            setCountry(data.country_name);
            props.countryChange(data.country_name);
            getItems(data.country_name, skip, limit);
          });
      } catch (e) {
        setCountry("United States");
        getItems(country, skip, limit);
      }
    }
    currencyDetector(country);
    console.log("Items = ", items);
  }, [items, country, getItems, skip, limit, props]);

  const categories = [
    { title: "Electronics", imageUrl: Electronics },
    { title: "Beauty", imageUrl: Beauty },
    { title: "Books", imageUrl: Book },
    { title: "Sports & Leisure ", imageUrl: Sports },
    { title: "Fashion", imageUrl: Fashion },
    { title: "Motors", imageUrl: Motors },
    { title: "Home & Garden", imageUrl: HomeSvg },
    { title: "Man", imageUrl: Man },
    { title: "Women", imageUrl: Women },
    { title: "Toys ", imageUrl: Toys },
    { title: "Vintage", imageUrl: Vintage },
    { title: "Luxury", imageUrl: Luxury },
    { title: "Garden", imageUrl: Garden },
    { title: "Handmade", imageUrl: Handmade },
  ];

  return (
    <div>
      <Head>
        <title>SellShip | Buy & Sell Anything</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container className="mt-4">
        <Modal show={isOpenDownload} onHide={hideModalDownload} size="md">
          <Modal.Body>
            <div>
              <Download />
            </div>
          </Modal.Body>
        </Modal>
        <div className="main-home">
          <Row>
            <img
              src={downloadapp}
              alt="Banner"
              className=" bg-auto h-50 w-screen "
              style={{
                borderRadius: "15px",
                objectFit: "cover",
                cursor: "pointer",
              }}
              onClick={showModalDownload}
            />
          </Row>
          <Row className="mt-4">
            <Col>
              <h3 className="section-haeding font-bold text-2xl">
                Discover by Category
              </h3>
            </Col>
          </Row>

          <Row className="mt-4">
            {categories.map(({ title, imageUrl }, index) => (
              <Col key={index} lg="2" sm="6" xs="6" md="3">
                <ItemCard title={title} imageUrl={imageUrl} country={country} />
              </Col>
            ))}
          </Row>
          <Row>
            <Col>
              <h3 className="section-haeding font-bold text-2xl">
                Recent Items
              </h3>
            </Col>
          </Row>

          <InfiniteScroll
            dataLength={items.length}
            next={loadMore}
            hasMore={true}
            className="mt-4"
            loader={
              <p
                style={{
                  textAlign: "center",
                  marginTop: "4rem",
                  marginBottom: "2rem",
                }}
              >
                <PulseLoader size={12} color={"#ff7f20"} />
              </p>
            }
            endMessage={<p>You've reached the end</p>}
          >
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {items.length !== 0
                ? items.map(
                    (
                      {
                        name,
                        image,
                        category,
                        condition,
                        price,
                        _id,
                        likes,
                        comments,
                      },
                      index
                    ) =>
                      index % 7 == 0 && index != 0 ? (
                        <AdSense.Google
                          client="ca-pub-9959700192389744"
                          className="transform hover:no-underline shadow-md rounded-md h-75 lg:h-80  md:h-80"
                          slot="9593959425"
                          style={{ display: "block" }}
                          layout="in-article"
                          format="fluid"
                        />
                      ) : (
                        <ProductItemCard
                          id={_id.$oid}
                          key={index}
                          name={name}
                          category={category}
                          condition={condition}
                          imageUrl={image}
                          price={currency + price}
                          likes={likes ? likes : 0}
                          comments={comments ? comments.length : 0}
                        />
                      )
                  )
                : [...Array(4)].map((e, i) => {
                    return <LoadingItem key={i}>Loading</LoadingItem>;
                  })}
            </div>
          </InfiniteScroll>
        </div>
      </Container>
    </div>
  );
}
