import React from "react";
import Head from "next/head";
import { withRouter } from "next/router";

import styled from "styled-components";
import MultiImageUpload from "../components/multi-image-upload/multi-image-upload";
import Dropdown from "../components/add-item-dropdown/add-item-dropdown";
import FormInput from "../components/form-input/form-input";
import FormTextArea from "../components/form-textarea/form-textarea";
import Cookies from "universal-cookie";
import AddItemMap from "../components/add-item-map/add-item-map";
import CustomButton from "../components/custom-button";
import Search from "../components/search-box/search-box";
import ButtonMenu from "../components/button-menu/button-menu";
import ItemAdded from "../components/item-added/item-added";

const Images = styled.div`
  text-align: center;
  padding-top: 10px;
  white-space: nowrap;
  overflow: scroll;
  border-style: none;
`;

const AddItemForm = styled.div`
  justify-content: center;
  margin: 0 auto;
  width: 50vw;
  padding-bottom: 10vh;
`;

const Detail = styled.div`
  width: 100%;
  padding-left: 2vw;
  padding-right: 2vw;
  vertical-align: middle;
  display: inline-block;
  justify-content: center;
`;

const Title = styled.p`
  color: grey;
  font-size: 16px;
  margin-bottom: 1vh;
`;

const StyledSelection = styled.div`
  white-space: nowrap;
  overflow: scroll;
  padding-bottom: 4vh;
  margin-bottom: 10vh;
`;

const Buttons = styled.div`
  width: 100%;
  display: inline-grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  grid-row-gap: 1vh;
  padding-top: 7vh;
  padding-bottom: 10vh;
`;

const Delivery = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding-bottom: 10vh;
  overflow: wrap;
`;

const Size = styled.input`
  border-radius: 5px;
  margin: 0.25rem;
  border: 1px solid grey;
  outline: none;
  width: 14vw;
  height: 6vh;
  text-align: center;
  color: grey;
`;

const MapDiv = styled.div`
  height: 100%;
  width: 100%;
  background-color: silver;
`;

const Submit = styled.div`
  justify-content: center;
  display: flex;
  padding-top: 10vh;
`;

const ErrorMessage = styled.div`
  padding-top: 10px;
  text-align: center;
  color: red;
`;

const categories = [
  "Electronics",
  "Fashion & Accessories",
  "Beauty",
  "Home & Garden",
  "Baby & Child",
  "Sport & Leisure",
  "Books",
  "Motors",
  "Property",
  "Other",
];

const conditions = [
  "New with tags",
  "New, but no tags",
  "Like new",
  "Very Good, a bit worn",
  "Good, some flaws visible in pictures",
];

const subcategories = {
  Electronics: [
    "Phones & Accessories",
    "Gaming",
    "TV & Video",
    "Cameras & Photography",
    "Computers,PCs & Laptops",
    "Computer accessories",
    "Home Appliances",
    "Sound & Audio",
    "Tablets & eReaders",
    "Wearables",
    "Virtual Reality",
  ],
  "Fashion & Accessories": ["Women", "Men", "Girls", "Boys", "Unisex"],
  Beauty: [
    "Fragrance",
    "Perfume for men",
    "Perfume for women",
    "Makeup",
    "Haircare",
    "Skincare",
    "Tools and Accessories",
    "Mens grooming",
    "Gift sets",
  ],
  "Home & Garden": [
    "Bedding",
    "Bath",
    "Home Decor",
    "Kitchen and Dining",
    "Home storage",
    "Furniture",
    "Garden & outdoor",
    "Lamps & Lighting",
    "Tools & Home improvement",
  ],
  "Baby & Child": [
    "Kids toys",
    "Baby transport",
    "Nursing and feeding",
    "Bathing & Baby care",
    "Baby clothing & shoes",
    "Parenting Books",
  ],
  "Sport & Leisure": [
    "Camping & Hiking",
    "Cycling",
    "Scooters & accessories",
    "Strength & weights",
    "Yoga",
    "Cardio equipment",
    "Water sports",
    "Raquet sports",
    "Boxing",
    "Other",
  ],
  Books: [
    "Childrens books",
    "Fiction books",
    "Comics",
    "Sports",
    "Science",
    "Diet, Health & Fitness",
    "Business & Finance",
    "Biogpraphy & Autobiography",
    "Crime & Mystery",
    "History",
    "Cook Books & Food",
    "Education",
    "Foreign Language Study",
    "Travel",
    "Magazine",
    "Other",
  ],
  Motors: [
    "Used Cars",
    "Motorcycles & Scooters",
    "Heavy vehicles",
    "Boats",
    "Number plates",
    "Auto accessories",
    "Car Technology",
  ],
  Property: [
    "For Sale \nHouses & Apartment",
    "For Rent \nHouses & Apartment",
    "For Rent \nShops & Offices",
    "Guest Houses",
  ],
};

const subsubcategories = {
  Women: [
    "Sneakers",
    "Flats",
    "Activewear & Sportswear",
    "Jewelry",
    "Dresses",
    "Tops",
    "Coats & Jackets",
    "Jumpers & Cardigans",
    "Bags",
    "Heels",
    "Sandals,slippers and flip-flops",
    "Boots",
    "Sports shoes",
    "Sunglasses",
    "Eye-wear",
    "Hair accessories",
    "Belts",
    "Watches",
    "Modest wear",
    "Jumpsuits & Playsuits",
    "Hoodies & Sweatshirts",
    "Jeans",
    "Suits & Blazers",
    "Swimwear & Beachwear",
    "Bottoms",
    "Skirts",
    "Other",
  ],
  Men: [
    "Shoes & Boots",
    "Activewear & Sportswear",
    "Polo Shirts & T- Shirts",
    "Shirts",
    "Sneakers",
    "Loafers & slip-ons",
    "Formal shoes",
    "Sports shoes",
    "Coats & Jackets",
    "Jumpers & Cardigans",
    "Bags & Wallet",
    "Trousers",
    "Hair accessories",
    "Belts",
    "Eyewear",
    "Sunglasses",
    "Nightwear & Loungewear",
    "Hoodies & Sweatshirts",
    "Jeans",
    "Suits & Blazers",
    "Swimwear & Beachwear",
    "Shorts",
    "Other",
  ],
  Girls: [
    "Bags",
    "Bottoms",
    "Dresses",
    "Tops and Tees",
    "Hats",
    "Accessories",
    "Jumpsuits",
    "Nightwear & Loungewear",
    "Socks",
    "Hoodies & Sweatshirts",
    "Swimwear & Beachwear",
  ],
  Boys: [
    "Hats",
    "Hoodies & Sweatshirts",
    "Nightwear & Loungewear",
    "Bottoms",
    "Shirts & T-Shirts",
    "Socks",
    "Tops",
  ],
  Unisex: [
    "Shoes & Boots",
    "Activewear & Sportswear",
    "Shirts",
    "T- Shirts & Vests",
    "Coats & Jackets",
    "Jumpers & Cardigans",
    "Bags & Accessories",
    "Trousers",
    "Chinos",
    "Jumpsuits & Playsuits",
    "Nightwear",
    "Loungewear",
    "Hoodies & Sweatshirts",
    "Jeans",
    "Suits & Blazers",
    "Swimwear & Beachwear",
    "Shorts",
    "Other",
  ],
};

const weights = ["2", "5", "10", "20", "50", "100"];

const DEFAULT_LAT = 44;
const DEFAULT_LONG = -75;
const DEFAULT_CITY = "NY";
const DEFAULT_COUNTRY = "United States";

class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image_files: [],
      price: "",
      title: "",
      description: "",
      category: "",
      subcategory: "",
      subsubcategory: "",
      condition: "",
      brand: "",
      otherBrand: false,
      size: "",
      meetup: false,
      shipping: false,
      city: DEFAULT_CITY,
      country: DEFAULT_COUNTRY,
      latitude: DEFAULT_LAT,
      longitude: DEFAULT_LONG,
      locationLoaded: false,
      brands: [],
      error: "",
      weightUnit: "lbs",
      weight: "",
      submitted: false,
    };
  }

  //   componentWillMount() {

  //   }

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  changeCategory = (category) => {
    this.setState({ brand: "" });
    this.setState({ otherBrand: false });
    this.setState({ brands: [] });
    this.setState({ size: "" });
    this.setState({ category: category });
    this.setState({ subcategory: "" });
    this.setState({ subsubcategory: "" });
    fetch("https://api.sellship.co/api/getbrands/" + category, {
      headers: { "ACCESS-CONTROl-ALLOW-ORIGIN": "*" },
    })
      .then((response) => response.json())
      .then((data) => this.setState({ brands: data.sort() }));
  };

  changeSubCategory = (subcategory) => {
    this.setState({ subcategory: subcategory });
    this.setState({ subsubcategory: "" });
  };

  changeSubSubCategory = (subsubcategory) => {
    this.setState({ subsubcategory: subsubcategory });
  };

  changeCondition = (e) => {
    this.setState({ condition: e.target.id });
  };

  changeBrand = (brand) => {
    this.setState({ brand: brand });
    if (brand === "Other") {
      this.setState({ otherBrand: true });
    } else if (this.state.otherBrand === true) {
      this.setState({ otherBrand: false });
    }
  };

  sizeChange = (e) => {
    this.setState({ size: e.target.value });
  };

  brandChange = (e) => {
    this.setState({ brand: e.target.value });
  };

  setAddress = (latitude, longitude, address_components) => {
    var city = "";
    var country = "";
    for (var component in address_components) {
      if (
        address_components[component]["types"].includes(
          "administrative_area_level_1"
        )
      ) {
        city = address_components[component]["short_name"];
      } else if (address_components[component]["types"].includes("country")) {
        country = address_components[component]["long_name"];
      }

      if (city !== "" && country !== "") {
        break;
      }
    }

    this.setState({ city: city });
    this.setState({ country: country });
    this.setState({ latitude: latitude });
    this.setState({ longitude: longitude });

    if (country.toLowerCase() === "united arab emirates") {
      this.setState({ weightUnit: "Kg" });
      this.setState({ weight: "" });
      this.setState({ shipping: false });
    } else {
      this.setState({ weightUnit: "lbs" });
    }
  };

  setLongitude = (longitude) => {
    this.setState({ longitude: longitude });
  };

  setLatitude = (latitude) => {
    this.setState({ latitude: latitude });
  };

  componentDidMount = () => {
    const { router, loggedIn } = this.props;
    if (!loggedIn) {
      router.push("/");
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCoordinates);
    }
    this.setState({ locationLoaded: true });
  };

  getCoordinates = (position) => {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    this.initializeCountry(lat, long);
  };

  changeWeight = (e) => {
    this.setState({ weight: e.target.id });
  };

  initializeCountry = (lat, long) => {
    fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
        lat +
        "," +
        long +
        "&key=AIzaSyAL0gczX37-cNVHC_4aV6lWE3RSNqeamf4"
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.results[0]) {
          var components = data.results[0].address_components;
          this.setAddress(lat, long, components);
        }
      });
  };

  changeMeetup = () => {
    this.setState({ meetup: !this.state.meetup });
  };

  changeShipping = () => {
    this.setState({ shipping: !this.state.shipping });
  };

  errorCheck = () => {
    var errorFields = [];

    if (this.state.image_files.length === 0) {
      errorFields.push("image(s)");
    }

    for (var field in this.state) {
      if (
        field !== "description" &&
        field !== "error" &&
        field !== "weight" &&
        this.state[field] === ""
      ) {
        if (field === "subcategory") {
          if (subcategories[this.state.category]) {
            errorFields.push(field);
          }
        } else if (field === "subsubcategory") {
          if (subsubcategories[this.state.subcategory]) {
            errorFields.push("type");
          }
        } else if (
          field === "size" &&
          this.state.category === "Fashion & Accessories"
        ) {
          errorFields.push(field);
        } else if (field !== "size") {
          errorFields.push(field);
        }
      }
    }

    if (this.state.price <= 0) {
      errorFields.push("price");
    }

    return errorFields;
  };

  submit = async () => {
    var error = this.errorCheck();
    if (error.length !== 0) {
      var errors = error.join(", ");
      var message =
        "ERROR - THE FOLLOWING INFORMATION MUST BE MADE VALID TO ADD AN ITEM: " +
        errors;
      this.setState({ error: message });
      return;
    }

    this.setState({ error: "" });

    const cookies = new Cookies();
    const userid = cookies.get("login");
    var username = "";
    var useremail = "";
    var usernumber = "";
    await fetch("https://api.sellship.co/api/user/" + userid, {
      headers: { "ACCESS-CONTROl-ALLOW-ORIGIN": "*" },
    })
      .then((response) => response.json())
      .then((data) => {
        username = data.first_name;
        useremail = data.email;
        usernumber = data.phonenumber;
      });

    let form = new FormData();
    form.append("username", username);
    form.append("useremail", useremail);
    form.append("usernumber", usernumber);
    form.append("userid", userid);
    form.append("name", this.state.title);
    form.append("price", this.state.price);
    form.append("description", this.state.description);
    form.append("category", this.state.category);
    form.append("subcategory", this.state.subcategory);
    form.append("subsubcategory", this.state.subsubcategory);
    form.append("size", this.state.size);
    form.append("brand", this.state.brand);
    form.append("condition", this.state.condition);
    form.append("city", this.state.city);
    form.append("country", this.state.country);
    form.append("latitude", this.state.latitude);
    form.append("longitude", this.state.longitude);
    form.append("meetup", this.state.meetup.toString());
    form.append("shipping", this.state.shipping.toString());
    if (this.state.weight !== "") {
      form.append("weightmetric", this.state.weightUnit);
      form.append("weight", this.state.weight);
    }

    for (let i = 0; i < this.state.image_files.length; i++) {
      var image = this.state.image_files[i];
      image.filename = image.name;
      if (i === 0) {
        form.append("image", image);
      } else {
        form.append("image" + (i + 1), image);
      }
    }

    var options = {
      headers: { Content_Type: "multipart/form-data" },
      method: "POST",
      body: form,
    };

    fetch("https://api.sellship.co/api/additem", options).then((response) => {
      if (response.status === 200) {
        this.setState({ submitted: true });
      }
    });
  };

  render() {
    return (
      <div>
        <Head>
          <title>SellShip | Buy & Sell Anything</title>
        </Head>
        {this.state.submitted ? <ItemAdded /> : null}
        <Images>
          <Title>Upload Images:</Title>
          <MultiImageUpload files={this.state.image_files} />
        </Images>
        <AddItemForm>
          <Detail>
            <FormInput
              type="text"
              name="title"
              handleChange={this.handleChange}
              value={this.state.title}
              label={"Title"}
              required
            />
          </Detail>
          <Detail>
            <FormInput
              type="number"
              name="price"
              handleChange={this.handleChange}
              value={this.state.price}
              label={"Price"}
            />
          </Detail>
          <Detail>
            <FormTextArea
              name="description"
              handleChange={this.handleChange}
              value={this.state.description}
              label={"Description (optional)"}
            />
          </Detail>
          <Detail>
            <Buttons>
              <Dropdown
                options={categories}
                label={
                  this.state.category ? this.state.category : "Select Category"
                }
                change={this.changeCategory}
              />
              <Dropdown
                options={subcategories[this.state.category]}
                label={
                  this.state.subcategory
                    ? this.state.subcategory
                    : "Select Subcategory"
                }
                change={this.changeSubCategory}
              />
              <Dropdown
                options={subsubcategories[this.state.subcategory]}
                label={
                  this.state.subsubcategory
                    ? this.state.subsubcategory
                    : "Select Type"
                }
                change={this.changeSubSubCategory}
              />
              <Dropdown
                options={this.state.category ? this.state.brands : null}
                label={
                  this.state.otherBrand
                    ? "Other"
                    : this.state.brand
                    ? this.state.brand
                    : "Select Brand"
                }
                change={this.changeBrand}
              />
              {this.state.category === "Fashion & Accessories" ? (
                <Size
                  type="text"
                  placeholder="Enter Size"
                  onChange={this.sizeChange}
                />
              ) : null}
              {this.state.otherBrand &&
              this.state.category === "Fashion & Accessories" ? (
                <br></br>
              ) : null}
              {this.state.otherBrand ? (
                <Size
                  type="text"
                  placeholder="Enter Brand"
                  onChange={this.brandChange}
                />
              ) : null}
            </Buttons>
          </Detail>
          <Detail>
            <Title>Item Condition</Title>
            <StyledSelection>
              <ButtonMenu
                labels={conditions}
                selected={this.state.condition}
                change={this.changeCondition}
              />
            </StyledSelection>
          </Detail>
          <Detail>
            <Delivery>
              <label class="inline-flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-6 w-6"
                  onClick={this.changeMeetup}
                />
                <span class="ml-3 text-lg">Meetup</span>
              </label>
              {this.state.country !== "United Arab Emirates" ? (
                <label class="inline-flex items-center">
                  <input
                    type="checkbox"
                    class="form-checkbox h-6 w-6"
                    onClick={this.changeShipping}
                  />
                  <span class="ml-3 text-lg">Shipping Included</span>
                </label>
              ) : null}
            </Delivery>
          </Detail>
          {this.state.country !== "United Arab Emirates" ? (
            <Detail>
              <Title>Item Weight</Title>
              <StyledSelection>
                <ButtonMenu
                  unit={this.state.weightUnit}
                  labels={weights}
                  selected={this.state.weight}
                  change={this.changeWeight}
                />
              </StyledSelection>
            </Detail>
          ) : null}
          <Detail style={{ height: "5vh" }}>
            {this.state.locationLoaded ? (
              <Search
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAL0gczX37-cNVHC_4aV6lWE3RSNqeamf4&v=3.exp&libraries=places`}
                loadingElement={<MapDiv />}
                containerElement={<MapDiv />}
                setAddress={this.setAddress}
              />
            ) : (
              <MapDiv />
            )}
          </Detail>
          <Detail style={{ height: "50vh" }}>
            {this.state.locationLoaded ? (
              <AddItemMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAL0gczX37-cNVHC_4aV6lWE3RSNqeamf4&v=3.exp&libraries=places`}
                loadingElement={<MapDiv />}
                containerElement={<MapDiv />}
                mapElement={<MapDiv />}
                longitude={this.state.longitude}
                latitude={this.state.latitude}
                map_latitude={this.state.map_latitude}
                map_longitude={this.state.map_longitude}
                setAddress={this.setAddress}
              />
            ) : (
              <MapDiv />
            )}
          </Detail>
          <Submit>
            <CustomButton onClick={this.submit}>Add Item</CustomButton>
          </Submit>
          <Detail>
            <ErrorMessage>{this.state.error}</ErrorMessage>
          </Detail>
        </AddItemForm>
      </div>
    );
  }
}
export default withRouter(AddItem);
