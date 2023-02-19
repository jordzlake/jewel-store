import React from "react";
import items from "../../data/Items";
import Card from "../Card";
import DirectionButton from "./../DirectionButton";
import Slider from "react-slick";
import settings from "../SlickSettings";

const Lands = () => {
  return (
    <div className="lands-listings">
      <div className="page-container">
        <div className="list-container d-flex flex-column">
          <div className="list-header d-flex flex-column">
            <h2 className="jewel-orange section-title">Lands</h2>
            <p className="jewel-black section-info">
              Select an item to see more information.
            </p>
          </div>
          <Slider {...settings}>
            {items
              .filter((temp) => temp.type === "land")
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
                    type={"land"}
                    loc={listitem.city}
                  />
                </div>
              ))}
          </Slider>
          <DirectionButton path={"/items/land"} />
        </div>
      </div>
    </div>
  );
};

export default Lands;
