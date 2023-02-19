import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Slider from "react-slick";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Header from "../components/Header";
import settings from "../components/SlickSettings";
import items from "./../data/Items";

const SingleItemScreen = () => {
  const { id } = useParams();
  const item = items.filter((temp) => temp._id === id)[0];
  window.scrollTo(0, 0);
  return (
    <div>
      <Header />
      <div className="ctfix singleitem-container">
        <div className="si-image-container">
          <div className="si-floating page-container">
            <div className="si-title-container">
              <h1 className="si-title">{item.name}</h1>
              <p className="si-price">{item.price}</p>
            </div>
          </div>
          <img className="si-image" src={item.mainImage} alt="mainImage" />
        </div>
        <div className="sim-title-container">
          <h1 className="sim-title">{item.name}</h1>
          <p className="sim-price">{item.price}</p>
        </div>
        <div className="page-container">
          <div className="si-content-container">
            <div className="container-l">
              <div className="si-address">
                <h2 className="si-street">{item.street}</h2>
                <h2 className="si-city">{item.city}</h2>
                <h2 className="si-country">{item.country}</h2>
              </div>
              <div className="si-description">
                <h2 className="si-description-title">Description</h2>
                <p className="si-description-body">{item.description}</p>
              </div>
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
                <form action="" className="si-request-form">
                  <label htmlFor="firstname">First Name:</label>
                  <input type="text" name="firstname" id="firstname" />
                  <label htmlFor="lastname">Last Name:</label>
                  <input type="text" name="lastname" id="lastname" />
                  <label htmlFor="contact">Contact:</label>
                  <input type="number" name="contact" id="contact" />
                  <label htmlFor="message">Message:</label>
                  <textarea name="message" id="message" rows="4">
                    Hey, I'm interested in this item.
                  </textarea>
                  <button className="si-button">Submit Request</button>
                </form>
              </div>
              <div className="si-map-container">
                <h2 className="si-map-heading">Map</h2>
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
                        width="3%"
                        alt="located here"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="more-items-container">
            <h2 className="more-items-title">More items like this:</h2>
            <Slider {...settings}>
              {items
                .filter((temp) => temp.type === item.type)
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
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SingleItemScreen;
