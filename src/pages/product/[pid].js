import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";

import CustomButton from "../../components/custom-button";
import PulseLoader from "react-spinners/PulseLoader";
import ImageGallery from "react-image-gallery";
import Cookies from "universal-cookie";
import { Card, Row, Col } from "react-bootstrap";
import AdSense from "react-adsense";
import { CgMenuGridO } from "react-icons/cg";
import { RiPriceTag2Line, RiStarSmileLine } from "react-icons/ri";

const Avatar = "/assets/user.svg";

import "react-image-gallery/styles/css/image-gallery.css";

const Product = ({ country }) => {
  const router = useRouter();
  const [productDetails, setProductDetails] = useState(null);
  const [userDetails, setUserDetails] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [currency, setCurrency] = useState("");

  const cookies = new Cookies();
  const userid = cookies.get("login");

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
    }
  };

  const getData = React.useCallback(async () => {
    await fetch("https://api.sellship.co/api/getitem/" + router.query.pid, {
      headers: {
        "ACCESS-CONTROL-ALLOW-ORIGIN": "*",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(async (data) => {
        setProductDetails(data);
        await fetch("https://api.sellship.co/api/user/" + data[0].userid, {
          headers: {
            "ACCESS-CONTROL-ALLOW-ORIGIN": "*",
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setUserDetails(data);
            setLoaded(true);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [router]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getData();
    currencyDetector(country);
  }, [country, getData]);

  if (loaded === false) {
    return (
      <div className="h-screen mt-48 mx-auto">
        <p style={{ textAlign: "center", marginTop: "4rem" }}>
          <PulseLoader size={25} color={"#ff7f20"} />
        </p>
      </div>
    );
  } else {
    const images = [];
    if (productDetails[0].image) {
      images.push({
        original: productDetails[0].image,
        thumbnail: productDetails[0].image,
      });
    }
    if (productDetails[0].image2) {
      images.push({
        original: productDetails[0].image2,
        thumbnail: productDetails[0].image2,
      });
    }
    if (productDetails[0].image3) {
      images.push({
        original: productDetails[0].image3,
        thumbnail: productDetails[0].image3,
      });
    }
    if (productDetails[0].image4) {
      images.push({
        original: productDetails[0].image4,
        thumbnail: productDetails[0].image4,
      });
    }
    if (productDetails[0].image5) {
      images.push({
        original: productDetails[0].image5,
        thumbnail: productDetails[0].image5,
      });
    }
    if (productDetails[0].image6) {
      images.push({
        original: productDetails[0].image6,
        thumbnail: productDetails[0].image6,
      });
    }

    return (
      <div className="h-auto md:mt-2 mx-auto py-5">
        <Head>
          <title>SellShip | Buy & Sell Anything</title>
        </Head>
        <div className="lg:flex md:flex align-middle mx-auto gap-10 w-11/12">
          <div className="mx-auto w-full h-full rounded-md">
            <ImageGallery
              className="image-gallery-thumbnail-image image-gallery-image image-gallery-thumbnails image-gallery-thumbnails-container "
              items={images}
              showFullscreenButton={false}
              thumbnailPosition="bottom"
              showNav={false}
              showPlayButton={false}
              lazyLoad={true}
            />
            <AdSense.Google
              client="ca-pub-9959700192389744"
              className=" h-50 hover:no-underline shadow-md rounded-md mt-4"
              slot="9593959425"
              style={{ display: "block" }}
              layout="in-article"
              format="fluid"
            />
          </div>
          <div className=" w-7/12 h-full">
            <div className="max-w-md">
              <h3 className="md:text-5xl text-4xl font-bold">
                {productDetails[0].name.replace(
                  /^./,
                  productDetails[0].name[0].toUpperCase()
                )}
              </h3>

              <div className="flex mb-4 mt-2">
                <div className="bg-purple-200 w-22 py-1 px-1 rounded-lg">
                  <h3 className="text-4xl font-bold text-purple-700">
                    {currency + productDetails[0].price}
                  </h3>
                </div>
              </div>

              <Card
                style={{
                  minHeight: "13rem",
                  flexGrow: 1,
                }}
                className="justify-content-center"
              >
                <Card.Body>
                  <Card.Text>
                    <Row>
                      <Col xs={6}>
                        <Row className="items-center">
                          <Col xs={1}>
                            <CgMenuGridO size={20} />
                          </Col>
                          <Col xs={7} className="text-lg my-2  text-left">
                            Category
                          </Col>
                        </Row>
                      </Col>
                      <Col
                        xs={6}
                        className="text-lg my-2 font-bold text-orange-400 text-right"
                      >
                        {productDetails[0].category}
                      </Col>
                    </Row>
                  </Card.Text>

                  <Card.Text>
                    <Row>
                      <Col xs={6}>
                        <Row className="items-center">
                          <Col xs={1}>
                            <RiPriceTag2Line size={20} />
                          </Col>
                          <Col xs={7} className="text-lg  my-2  text-left">
                            Brand
                          </Col>
                        </Row>
                      </Col>
                      <Col
                        xs={6}
                        className="text-lg my-2 font-bold text-orange-400 text-right"
                      >
                        {productDetails[0].brand}
                      </Col>
                    </Row>
                  </Card.Text>
                  <Card.Text>
                    <Row>
                      <Col xs={6}>
                        <Row className="items-center">
                          <Col xs={1}>
                            <RiStarSmileLine size={20} />
                          </Col>
                          <Col xs={7} className="text-lg my-2 text-left">
                            Condition
                          </Col>
                        </Row>
                      </Col>
                      <Col
                        xs={6}
                        className="text-lg my-2 font-bold text-orange-400 text-right"
                      >
                        {productDetails[0].condition}
                      </Col>
                    </Row>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card
                style={{
                  minHeight: "13rem",
                  flexGrow: 1,
                }}
                className="justify-content-center"
              >
                <Card.Body>
                  <Card.Text>
                    <Row>
                      <Col xs={6}>
                        <Row className="items-center">
                          <Col xs={8} className="text-lg my-2  text-left">
                            <div class="flex flex-row items-center mb-2 ">
                              {userDetails.profilepicture ? (
                                <img
                                  className="ml-1 w-12 h-12 rounded-full object-cover "
                                  src={userDetails.profilepicture}
                                  alt=""
                                />
                              ) : (
                                <img
                                  className="ml-1 w-12 h-12 rounded-full object-cover "
                                  src={Avatar}
                                  alt=""
                                />
                              )}
                              <Row className="items-center ml-3" xs={7}>
                                {userid === productDetails[0].userid ? (
                                  <Link href={`/profile`}>
                                    <a className="font-bold hover:no-underline hover:text-orange-300 text-orange-400 text-xl">
                                      {"Your Profile"}
                                    </a>
                                  </Link>
                                ) : (
                                  <Link
                                    href={`/profile/${productDetails[0].username}/${productDetails[0].userid}`}
                                  >
                                    <a className="font-bold hover:no-underline hover:text-orange-300 text-orange-400 text-xl">
                                      {productDetails[0].username}
                                    </a>
                                  </Link>
                                )}
                                <Row xs={7} className="items-center mt-1">
                                  <Col>
                                    <RiStarSmileLine size={18} />
                                  </Col>
                                  <Col>
                                    <RiStarSmileLine size={18} />
                                  </Col>
                                  <Col>
                                    <RiStarSmileLine size={18} />
                                  </Col>
                                </Row>
                              </Row>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                      <Col
                        xs={6}
                        className="text-lg my-2 font-bold text-orange-400 text-right"
                      >
                        {productDetails[0].category}
                      </Col>
                    </Row>
                  </Card.Text>
                </Card.Body>
              </Card>
              <p className="text-lg">{productDetails[0].description}</p>

              <div className="flex gap-4">
                <CustomButton>Make Offer</CustomButton>
                <CustomButton isInverted>Chat With seller</CustomButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Product;
