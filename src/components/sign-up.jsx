import React from "react";
import FormInput from "./form-input/form-input";
import CustomButton from "./custom-button";
import 'react-phone-number-input/style.css'
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input'
import Cookies from "universal-cookie";
import Brand from "../assets/logo.png";


class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirm: "",
      error: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.processSignUp();
  };

 

  processSignUp = () => {
    let form = new FormData();
    form.append("first_name", this.state.firstName);
    form.append("last_name", this.state.lastName);
    form.append("email", this.state.email);
    form.append("phonenumber", this.state.phoneNumber);
    form.append("password", this.state.password);
    form.append("fcmtoken", "1");

    var options = {
      headers: { Content_Type: "multipart/form-data" },
      method: "POST",
      body: form,
    };

    fetch("https://api.sellship.co/api/signup", options)
      .then((response) => response.json())
      .then((data) => {
        if (data["id"]) {
          var userID = data["id"];
          var cookies = new Cookies();
          cookies.set("login", userID, { path: "/" });
          this.props.changeLoggedIn();
          window.location.path = "/";
          window.location.reload();
        } else {
          var message = data["status"]["message"];
          this.setState({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirm: "",
            error: "Error: " + message,
          });
        }
      });
  };


  handleemail = (e) => {
    this.setState({
      email: e.target.value
    });
  };


  handlefirstname = (e) => {
    this.setState({
      firstName: e.target.value
    });
  };

  handlelastname = (e) => {
    this.setState({
      lastName: e.target.value
    });
  };

  handlephone = (e) => {
    this.setState({
      phoneNumber: e.target.value
    });
  };

  handlepassword = (e) => {
    this.setState({
      password: e.target.value
    });
  };
 

  render() {
    return (
      <div className="mt-8 mx-auto h-auto justify-center align-middle">
        <div>
          <form onSubmit={this.handleSubmit}>
          <img
              className="z-10 my-auto mx-auto w-24 justify-center align-middle "
              src={Brand}
              alt=""
            />
            <p class="text-xl text-gray-600 text-center mt-2">Welcome to SellShip!</p>
            <div class="mt-2 flex items-center justify-between">
                <span class="border-b w-1/5 lg:w-1/4"></span>
                <span class="text-xs text-center text-gray-500 uppercase">Sign Up with Email</span>
                <span class="border-b w-1/5 lg:w-1/4"></span>
            </div>
            <div class="mt-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                <input class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"  onChange={this.handlefirstname}
              />
            </div>
            <div class="mt-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                <input class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"  onChange={this.handlelastname}
              />
            </div>
            <div class="mt-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                <PhoneInput
                class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                placeholder="Enter phone number"
                countrySelectProps={{ unicodeFlags: true }}
                international
                displayInitialValueAsLocalNumber
                defaultCountry="AE"
                onChange={ phone => this.setState({ phoneNumber: phone }) } />

                {/* <input class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="email"  onChange={this.handlephone} */}
              {/* /> */}
            </div>
            <div class="mt-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                <input class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="email"  onChange={this.handleemail}
              />
            </div>
            <div class="mt-4">
                <div class="flex justify-between">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                
                </div>
                <input class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="password"   onChange={this.handlepassword}
   />
            </div>
            <div class="mt-8">
                <button class="bg-purple-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600" type="submit">Sign Up</button>
            </div>
            <div class="mt-4 flex items-center justify-between">
                <span class="border-b w-1/5 md:w-1/4"></span>
                <a href="#" class="text-xs text-gray-500 uppercase">or Login</a>
                <span class="border-b w-1/5 md:w-1/4"></span>
            </div>            
          </form>

          {this.state.error ? <div>{this.state.error}</div> : null}
        </div>
      </div>
    );
  }
}
export default SignUp;
