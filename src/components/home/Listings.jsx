import React from "react";
import Slider from "react-slick";
import items from "../../data/Items";
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
            {items
              .slice(-10)
              .reverse()
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
          <DirectionButton path={"/items/"} />
        </div>
      </div>
    </div>
  );
};

export default Listings;
