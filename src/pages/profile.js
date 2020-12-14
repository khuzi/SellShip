import React, { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import PulseLoader from "react-spinners/PulseLoader";
import SimpleTabs from "../components/tabs.jsx";
import ItemCard from "../components/ProductItemCard";
import Cookies from "universal-cookie";
import Rating from "@material-ui/lab/Rating";

const Avatar = "/assets/user.svg";

const UserStats = ({
  name,
  followers,
  sold,
  profilepicture,
  likes,
  reviewrating,
}) => {
  return (
    <div className="mx-auto w-4/5 h-70 mt-12 rounded-t-lg shadow-md">
      <div className="text-center  mt-10">
        <img
          className="w-32 mx-auto rounded-full mb-10"
          src={profilepicture ? profilepicture : Avatar}
          alt={"Profile"}
        />
        <p className="font-bold">{name}</p>
        <p>
          <Rating name="size-medium" defaultValue={reviewrating} readOnly />
        </p>
      </div>
      <div className="flex justify-center text-center mt-10 w-2/5 mx-auto">
        <span className="font-bold ml-8">
          Likes
          <p>{likes}</p>
        </span>
        <span className="font-bold ml-8">
          Sold
          <p>{sold}</p>
        </span>
        <span className="font-bold ml-8">
          Followers
          <p>{followers}</p>
        </span>
      </div>
    </div>
  );
};

const Profile = ({ loggedIn }) => {
  const router = useRouter();
  const cookies = new Cookies();
  const userid = cookies.get("login");
  const [userDetails, setUserDetails] = useState([]);
  const [userProducts, setUserProducts] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loggedIn) {
      router.push("/");
    }
  }, [loggedIn]);

  console.log(userDetails);
  console.log(favourites);
  const getUserData = useCallback(async () => {
    let id;
    router.query.sellerId ? (id = router.query.sellerId) : (id = userid);
    await fetch("https://api.sellship.co/api/user/" + id, {
      headers: {
        "ACCESS-CONTROL-ALLOW-ORIGIN": "*",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserDetails(data);
      })
      .catch((err) => console.log(err));
    await fetch("https://api.sellship.co/api/useritems/" + id, {
      headers: {
        "ACCESS-CONTROL-ALLOW-ORIGIN": "*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserProducts(data);
        setLoaded(true);
      })
      .catch((err) => console.log(err));
    await fetch("https://api.sellship.co/api/favourites/" + userid, {
      headers: {
        "ACCESS-CONTROL-ALLOW-ORIGIN": "*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const filteredFavourites = data.filter((el) => {
          return (el != null) & (el !== "");
        });
        setFavourites(filteredFavourites);
      })
      .catch((err) => {
        console.log("Profile Err", err);
      });
  }, [router, userid]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  if (!loaded) {
    return (
      <div className="text-center pt-90">
        <PulseLoader size={20} color={"#ff7f20"} />
      </div>
    );
  } else {
    return (
      <div className="">
        <Head>
          <title>SellShip | Buy & Sell Anything</title>
        </Head>
        <UserStats
          name={userDetails.first_name + " " + userDetails.last_name}
          followers={
            userDetails.follower != null ? userDetails.follower.length : 0
          }
          likes={(userDetails.likes = null ? userDetails.likes : 0)}
          sold={(userDetails.sold = null ? userDetails.sold.length : 0)}
          profilepicture={userDetails.profilepicture}
          reviewrating={
            (userDetails.reviewrating = null ? userDetails.reviewrating : 0)
          }
        />
        {router.query.sellerId ? (
          <div className="mx-auto w-4/5 h-auto mt-12 mb-4">
            <div className="">
              <SimpleTabs
                label1={userDetails.first_name + "'s Items"}
                child1={
                  <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-4 gap-4">
                    {userProducts.products?.map((x, index) => (
                      <ItemCard
                        key={index}
                        name={x.name}
                        imageUrl={x.image}
                        price={x.price}
                        likes={x.likes ? x.likes : 0}
                        // comments={x.comments?x.comments:0}
                        id={x._id.$oid}
                      />
                    ))}
                  </div>
                }
              />
            </div>
          </div>
        ) : (
          <div className="mx-auto w-4/5 h-auto mt-12">
            <div className="">
              <SimpleTabs
                label1={"My Items"}
                child1={
                  <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-4 gap-4">
                    if (this.userProducts.products){" "}
                    {userProducts.products?.map((x, index) => (
                      <ItemCard
                        key={index}
                        name={x.name}
                        imageUrl={x.image}
                        price={x.price}
                        likes={x.likes ? x.likes : 0}
                        // comments={x.comments?x.comments:0}
                        id={x._id.$oid}
                      />
                    ))}
                  </div>
                }
                label2={"My Favourites"}
                child2={
                  <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-4 gap-4">
                    {favourites?.map((x, index) => (
                      <ItemCard
                        key={index}
                        name={x.name}
                        imageUrl={x.image}
                        price={x.price}
                        likes={x.likes ? x.likes : 0}
                        // comments={x.comments?x.comments:0}
                        id={x._id.$oid}
                      />
                    ))}
                  </div>
                }
              />
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default Profile;
