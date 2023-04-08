import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import Slider from "react-slick";
import fadesettings from "../components/SlickFadeSingleSettings";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Header from "../components/Header";
import settings from "../components/SlickSettings";
import { listItem } from "../Redux/Actions/ItemActions";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { URL } from "../Url";
import LoadingSpinner from "../components/LoadingSpinner";
import GoogleMapReact from "google-map-react";
import MarkerComponent from "./../components/Marker";
import { StaticGoogleMap, Marker } from "react-static-google-map";

const SingleItemScreen = () => {
  //Feedback
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState("");
  const [defMessage, setDefMessage] = useState("");
  const [item, setItem] = useState({
    subImages: [],
    interiorFeatures: [],
    exteriorFeatures: [],
    name: "",
    type: "",
    city: "",
    street: "",
    country: "",
    mapIframe: "",
  });
  const key = `${process.env.REACT_APP_GOOGLE_API_KEY}`;
  console.log("key", key);

  const handleSubmit = (e) => {
    const messageToSend = message === "" ? e.target.message.value : message;
    e.preventDefault();
    axios
      .post(`${URL}/api/feedback`, {
        firstName,
        lastName,
        contact,
        message: messageToSend,
      })
      .then((res) => {
        setAlert(res.data);
        setFirstName("");
        setLastName("");
        setMessage("");
        setContact("");
      })
      .catch((err) => {
        setAlert("Something went wrong. Please try again later");
        console.log(err);
      });
  };

  //Single Item functionality
  const { id } = useParams();
  const dispatch = useDispatch();
  const itemList = useSelector((state) => state.itemList);
  const { loading, error, items } = itemList;

  useEffect(() => {
    if (items) {
      if (items.length > 0) {
        let temp = items.find((temp) => temp._id === id);
        console.log(temp.mapIframe.split(","));
        let coords = temp.mapIframe.split(",");
        let templat = coords[0];
        let templng = coords[1];
        console.log(templat, templng);
        setLat(Number(templat));
        setLng(Number(templng));
        setItem(temp);
      } else {
        setItem({
          subImages: [],
          interiorFeatures: [],
          exteriorFeatures: [],
          name: "",
          type: "",
          city: "",
          street: "",
          country: "",
          mapIframe: "",
        });
      }
    }
  }, [items, id]);

  useEffect(() => {
    dispatch(listItem());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMessage(
      `Hello, I'm interested in the ${item.type} item, ${item.name}, at ${item.street}, ${item.city}, ${item.country}.`
    );
  }, [item.name]);

  const [showMenu, setShowMenu] = useState(false);

  const showMenuRef = useRef(showMenu);

  useEffect(() => {
    showMenuRef.current = showMenu;
  }, [showMenu]);

  const handleCloseMenu = (e) => {
    if (e.target.nodeName === "LABEL") {
      e.preventDefault();
    }
    e.stopPropagation();
    if (!e.target.closest(".sim-sticky") && showMenuRef.current) {
      setShowMenu(false);
    }
  };
  const handleClick = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };
  useEffect(() => {
    document.addEventListener("click", handleCloseMenu);

    return () => {
      document.removeEventListener("click", handleCloseMenu);
    };
  }, []);

  return (
    <div>
      <Header />
      {loading ? (
        <div>
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="ctfix">
          <p className="jewel-error">Error: {error}</p>
        </div>
      ) : (
        <div className="ctfix singleitem-container">
          <div className="si-image-container">
            <div className="si-floating page-container">
              <div className="si-title-container">
                <h1 className="si-title">{item.name}</h1>
                <p className="si-price">{item.price}</p>
              </div>
            </div>
            <div className="j-carousel">
              <Slider {...fadesettings}>
                <div>
                  <img src={item.mainImage} alt="mainImage" />
                </div>
                {item.subImages.length !== 0
                  ? item.subImages.map((im, i) => (
                      <div key={i}>
                        <img src={im} alt="" />
                      </div>
                    ))
                  : ""}
              </Slider>
            </div>
          </div>
          <div className="sim-title-container">
            <h1 className="sim-title">{item.name}</h1>
            <p className="sim-price">{item.price}</p>
          </div>
          <div className="page-container">
            <div className="si-content-container">
              <div className="container-l">
                <div className="si-address">
                  <h2 className="si-street">{item.street},</h2>
                  <h2 className="si-city">{item.city},</h2>
                  <h2 className="si-country">{item.country}.</h2>
                </div>

                <div className="si-description">
                  <h2 className="si-description-title">Description</h2>
                  <p className="si-description-body">{item.description}</p>
                </div>
                {item.type !== "land" && (
                  <div className="si-features">
                    <div className="si-features-heading-container">
                      <h2 className="si-features-heading">Internal Features</h2>
                    </div>
                    <div className="si-features-body-container">
                      <ul>
                        {item.interiorFeatures.map((feat, i) => (
                          <li key={i}>{feat}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                <div className="si-features">
                  <div className="si-features-heading-container">
                    <h2 className="si-features-heading">External Features</h2>
                  </div>
                  <div className="si-features-body-container">
                    <ul>
                      {item.exteriorFeatures.map((feat, i) => (
                        <li key={i}>{feat}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="si-listing-description">
                  <h2 className="si-description-title">Listing Information</h2>
                  <p className="si-description-body">Posted: 19/02/23</p>
                </div>
              </div>
              <div className="container-r">
                <div className="si-request-container">
                  <h2 className="si-request-title">Submit a Request</h2>
                  <form onSubmit={handleSubmit} className="si-request-form">
                    <label htmlFor="firstname">First Name:</label>
                    <input
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      type="text"
                      name="firstname"
                      id="firstname"
                    />
                    <label htmlFor="lastname">Last Name:</label>
                    <input
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      type="text"
                      name="lastname"
                      id="lastname"
                    />
                    <label htmlFor="contact">Telephone Contact:</label>
                    <input
                      required
                      value={contact !== "" ? Number(contact) : ""}
                      onChange={(e) => setContact(e.target.value)}
                      type="number"
                      name="contact"
                      id="contact"
                    />
                    <label htmlFor="message">Message:</label>

                    <textarea
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      name="message"
                      id="message"
                      rows="4"
                    ></textarea>

                    <p>{alert}</p>
                    <button className="si-button">Submit Request</button>
                  </form>
                </div>
                <div className="si-map-container">
                  <div style={{ height: "200px", width: "100%" }}>
                    <iframe
                      title="map"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://www.google.com/maps/embed/v1/place?key=${key}&q=${lat},${lng}`}
                      allowFullScreen
                    />
                    {/* <GoogleMapReact
                      bootstrapURLKeys={{
                        key: process.env.GOOGLE_API_KEY,
                      }}
                      options={{
                        scrollwheel: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                        streetViewControl: false,
                      }}
                      center={{ lat: lat, lng: lng }}
                      zoom={13}
                    >
                      <MarkerComponent
                        style={{ zIndex: "2" }}
                        width="50"
                        lat={lat}
                        lng={lng}
                      />
                    </GoogleMapReact> */}
                  </div>
                  {/* <h2 className="si-map-heading">Map</h2>
                  <iframe
                    src={item.mapIframe}
                    width="100%"
                    height="100%"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="jewel-map"
                  ></iframe>
                  <div className="si-iframe-parent">
                    <div className="si-iframe-container">
                      <div className="si-map-marker-container">
                        <img
                          src="/images/svgs/JewelPin.svg"
                          width="5%"
                          alt="located here"
                        />
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="more-items-container">
              <h2 className="more-items-title">More items like this:</h2>

              {item.type ? (
                <Slider
                  {...settings}
                  infinite={
                    items
                      .filter((temp) => temp.type === item.type)
                      .filter((temp) => temp._id !== item._id).length > 3
                      ? items
                          .filter((temp) => temp.type === item.type)
                          .filter((temp) => temp._id !== item._id).length >
                        settings.slidesToShow
                      : false
                  }
                >
                  {items
                    .filter((temp) => temp.type === item.type)
                    .filter((temp) => temp._id !== item._id)
                    .map((listitem) => (
                      <div key={listitem._id}>
                        <Card
                          name={listitem.name}
                          price={listitem.price}
                          bedrooms={listitem.bedrooms}
                          bathrooms={listitem.bathrooms}
                          size={listitem.size}
                          im={listitem.mainImage}
                          redir={`/item/${listitem._id}`}
                          type={listitem.type}
                          loc={listitem.city}
                        />
                      </div>
                    ))}
                </Slider>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="sim-sticky">
            <div className="sim-sticky-container">
              <div
                onClick={handleClick}
                className="sim-sticky-heading-container"
              >
                <i
                  className={`fa fa-caret-up ${
                    showMenu ? "button-active" : ""
                  }`}
                ></i>
                <h2 className="sim-request-title">Submit a Request</h2>
              </div>
              <form
                onSubmit={handleSubmit}
                className={`sim-request-form ${showMenu ? "form-active" : ""}`}
              >
                <label htmlFor="firstname">First Name:</label>
                <input
                  required
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  name="firstname"
                  id="firstname"
                />
                <label htmlFor="lastname">Last Name:</label>
                <input
                  required
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  name="lastname"
                  id="lastname"
                />
                <label htmlFor="contact">Telephone Contact:</label>
                <input
                  required
                  type="number"
                  value={contact !== "" ? Number(contact) : ""}
                  onChange={(e) => setContact(e.target.value)}
                  name="contact"
                  id="contact"
                />
                <label htmlFor="message">Message:</label>

                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  name="message"
                  id="message"
                  rows="4"
                ></textarea>
                <p className="text-center">{alert}</p>
                <button className="sim-button">Submit Request</button>
              </form>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default SingleItemScreen;
