import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";

import ProductItemCard from "../../../../components/ProductItemCard";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingItem from "../../../../components/loading-item.jsx";
import PulseLoader from "react-spinners/PulseLoader";

export default function SubCategory() {
  const router = useRouter();

  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [items, setItems] = useState([]);
  const [currency, setCurrency] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true);
    };
    const handleRouteComplete = () => {
      setLoading(false);
    };
    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", handleRouteComplete);
    };
  }, []);

  const getItems = useCallback(async () => {
    await fetch(
      "https://api.sellship.co/api/categories/" +
        router.query.categoryName +
        "/" +
        router.query.subcategory +
        "/" +
        router.query.country +
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
  }, [limit, router, skip]);

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
        setCurrency("");
        break;
    }
  };

  const loadMore = () => {
    setSkip(skip + 20);
    setLimit(limit + 20);
    getItems();
  };

  useEffect(() => {
    if (items.length === 0) {
      getItems();
    }
    currencyDetector(router.query.country);
  }, [items, getItems, limit, skip, router]);

  if (loading) {
    getItems();
  }

  return (
    <div className="w-11/12 mx-auto">
      <h1 className="font-bold text-2xl my-16">{router.query.subcategory}</h1>
      <InfiniteScroll
        dataLength={items.length}
        next={loadMore}
        hasMore={true}
        loader={
          <p style={{ textAlign: "center", marginTop: "4rem" }}>
            <PulseLoader size={20} color={"#ff7f20"} />
          </p>
        }
        endMessage={
          <p className="mx-auto text-center text-orange-400 font-bold my-10">
            You've reached the end
          </p>
        }
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-4 gap-4">
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
  );
}
