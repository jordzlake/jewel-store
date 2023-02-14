import React from "react";
import Card from "../Card";
import commercial from "./../../data/Commercial";
import DirectionButton from "./../DirectionButton";
import Slider from "react-slick";
import settings from "../SlickSettings";

const Commercial = () => {
  return (
    <div className="commercial-listings">
      <div className="page-container">
        <div className="list-container d-flex flex-column">
          <div className="list-header d-flex flex-column">
            <h2 className="jewel-dmorange section-title">Commercial Rentals</h2>
            <p className="jewel-white section-info">
              Select an item to see more information.
            </p>
          </div>
          {/*<div className="listings d-flex">
            {commercial.map((listitem) => (
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
            </div>*/}
          <Slider {...settings}>
            {commercial.map((listitem) => (
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
          <DirectionButton path={"/"} alt={true} />
        </div>
      </div>
    </div>
  );
};

export default Commercial;
