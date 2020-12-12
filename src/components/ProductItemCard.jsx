import React from "react";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import "../assets/main.css";
import { Description } from "@material-ui/icons";

const ProductItemCard = ({ name, imageUrl, category, condition,price,likes, comments, id }) => {
  return (
    <Link
      className="transform hover:transition duration-200 hover:scale-105 hover:no-underline shadow-md rounded-md"
      to={`/product/${id}`}
    >
      <div className="bg-white  rounded-md min-w-full h-75 lg:h-80  md:h-80">
        <div
          className="min-w-full h-70 rounded-t-md relative"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
          }}
        >
          <div className="rounded-full h-12 w-12 flex items-center bg-white justify-center origin-top-right flex justify-around absolute top-0 right-0 mr-2 mt-2">
            <span className="text-gray-600">
              <FavoriteBorderIcon/>
            </span>
          </div>
        </div>
        <div className="ml-2 pt-2 pb-3 md:pt-6 lg:pt-6">
          <p className="truncate text-base  text-lg">{name}</p>


          <p className="text-orange-400 font-bold text-lg pr-10">{price}</p>
          <p className="truncate text-base text-gray-600 text-md">{condition}</p>

          
        </div>
      </div>
    </Link>
  );
};

export default ProductItemCard;
