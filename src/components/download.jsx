import React from "react";
import CustomButton from "./custom-button";
import FormInput from "./form-input/form-input";
import Cookies from "universal-cookie";
import "../assets/main.css";
import Brand from "../assets/logo.png";
import PlayStore from "../assets/playstore.png";
import AppStore from "../assets/appstore.png"

class Download extends React.Component {
  

  render() {
    return (
      
      <div className="mt-4 mb-4 mx-auto h-auto justify-center align-middle items-center  space-y-6">
        <div className="w-4/5 mx-auto">
        
            <div class="mt-2 flex items-center justify-between">
                <span class="border-b w-1/5 lg:w-1/4"></span>
                <span class="text-lg text-center text-black uppercase">Download App</span>
                <span class="border-b w-1/5 lg:w-1/4"></span>
            </div>
            
            <a href="https://apps.apple.com/us/app/sellship-local-classifieds/id1506496966?ls=1">
            <img
              className="z-10 my-auto mx-auto w-50 justify-center align-middle mt-6"
              src={AppStore}
              alt=""
            />
            </a>

            <a href="https://play.google.com/store/apps/details?id=com.zad.sellship">
            <img
              className="z-10 my-auto mx-auto w-50 justify-center align-middle mt-6"
              src={PlayStore}
              alt=""
            />
            </a>
            
        </div>
    </div>

    );
  }
}
export default Download;
