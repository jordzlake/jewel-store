import React from "react";
import Card from "../Card";
import DirectionButton from "./../DirectionButton";
import Slider from "react-slick";
import settings from "../SlickSettings";
import LoadingSpinner from "./../LoadingSpinner";

const Commercial = ({ items, loading }) => {
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
          {loading === false ? (
            <Slider
              {...settings}
              infinite={
                items.filter((temp) => temp.type === "building").length >
                settings.slidesToShow
              }
            >
              {items
                .filter((temp) => temp.type === "building")
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
                      type={"building"}
                      loc={listitem.city}
                    />
                  </div>
                ))}
            </Slider>
          ) : (
            <LoadingSpinner />
          )}
          <DirectionButton path={"/items/building"} alt={true} />
        </div>
      </div>
    </div>
  );
};

export default Commercial;
