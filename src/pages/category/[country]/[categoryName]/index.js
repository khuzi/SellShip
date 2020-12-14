import React, { useEffect, useState, useCallback } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import ProductItemCard from "../../../../components/ProductItemCard";
import PulseLoader from "react-spinners/PulseLoader";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingItem from "../../../../components/loading-item";
import { Row, Col, Container } from "react-bootstrap";

const Category = () => {
  const router = useRouter();

  const [limit, setLimit] = useState(20);
  const [skip, setSkip] = useState(10);
  const [country, setCountry] = useState("");
  const [items, setItems] = useState([]);
  const [currency, setCurrency] = useState("");

  const getItems = useCallback(
    async (country, skip, limit) => {
      await fetch(
        "https://api.sellship.co/api/categories/all/" +
          router.query.categoryName +
          "/" +
          country +
          "/" +
          skip +
          "/" +
          limit,
        {
          headers: {
            "ACCESS-CONTROL-ALLOW-ORIGIN": "*",
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => setItems(data));
    },
    [router]
  );

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
        setCurrency("$ ");
        break;
    }
  };

  const loadMore = () => {
    setSkip(skip + 20);
    setLimit(limit + 20);
    getItems(router.query.country, skip, limit);
  };

  useEffect(() => {
    try {
      fetch("https://ipapi.co/json/")
        .then((res) => res.json())
        .then(async (data) => {
          setCountry(data.country_name);
          getItems(data.country_name, skip, limit);
        });
    } catch (e) {
      setCountry("United States");
      getItems(router.query.country, skip, limit);
    }
    currencyDetector(router.query.country);
  }, [items, getItems, limit, router, skip]);

  return (
    <Container className="mt-4">
      <Head>
        <title>SellShip | Buy & Sell Anything</title>
      </Head>
      <div className="main-home">
        <Row>
          <Col>
            <h3 className="section-haeding font-bold text-2xl">
              {router.query.categoryName}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {items.length !== 0
              ? items.map(
                  ({ name, image, price, _id, likes, comments }, index) => (
                    <ProductItemCard
                      id={_id.$oid}
                      key={index}
                      name={name}
                      imageUrl={image}
                      price={currency + price}
                      likes={likes ? likes : 0}
                      comments={comments ? comments.length : 0}
                    />
                  )
                )
              : [...Array(4)].map((e, i) => {
                  return <LoadingItem key={i} />;
                })}
          </div>
        </InfiniteScroll>
      </div>
    </Container>
  );
};

export default Category;
