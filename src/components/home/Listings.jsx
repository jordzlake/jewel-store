import React from "react";
import Slider from "react-slick";
import newlistings from "../../data/NewListings";
import Card from "../Card";
import settings from "../SlickSettings";
import DirectionButton from "./../DirectionButton";

const Listings = () => {
  return (
    <div className="new-listings">
      <div className="page-container">
        <div className="list-container d-flex flex-column">
          <div className="list-header d-flex flex-column">
            <h2 className="jewel-orange section-title">New Listings</h2>
            <p className="jewel-black section-info">
              Select an item to see more information.
            </p>
          </div>
          <Slider {...settings}>
            {newlistings.map((listitem) => (
              <div key={listitem._id}>
                <Card
                  name={listitem.name}
                  price={listitem.price}
                  bedrooms={listitem.bedrooms}
                  bathrooms={listitem.bathrooms}
                  size={listitem.size}
                  im={listitem.image}
                  redir={`/${listitem.name + "_" + listitem._id}`}
                />
              </div>
            ))}
          </Slider>
          <DirectionButton path={"/"} />
        </div>
      </div>
    </div>
  );
};

export default Listings;
