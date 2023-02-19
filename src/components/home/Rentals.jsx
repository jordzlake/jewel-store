import React from "react";
import Slider from "react-slick";
import items from "../../data/Items";
import Card from "../Card";
import DirectionButton from "../DirectionButton";
import settings from "./../SlickSettings";

const Rentals = () => {
  return (
    <div className="rental-listings">
      <div className="page-container">
        <div className="list-container d-flex flex-column">
          <div className="list-header d-flex flex-column">
            <h2 className="jewel-orange section-title">Rentals</h2>
            <p className="jewel-vblack section-info">
              Select an item to see more information.
            </p>
          </div>
          <Slider {...settings}>
            {items
              .filter((temp) => temp.type === "rent")
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
                    type={"rent"}
                    loc={listitem.city}
                  />
                </div>
              ))}
          </Slider>
          <DirectionButton path={"/items/rent"} />
        </div>
      </div>
    </div>
  );
};

export default Rentals;
