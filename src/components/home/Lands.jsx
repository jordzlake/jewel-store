import React from "react";
import Card from "../Card";
import DirectionButton from "./../DirectionButton";
import Slider from "react-slick";
import settings from "../SlickSettings";
import LoadingSpinner from "./../LoadingSpinner";

const Lands = ({ items, loading }) => {
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

          {loading === false ? (
            items && (
              <Slider
                {...settings}
                infinite={
                  items.filter((temp) => temp.type === "land").length >
                  settings.slidesToShow
                }
              >
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
            )
          ) : (
            <LoadingSpinner />
          )}
          <DirectionButton path={"/items/land"} />
        </div>
      </div>
    </div>
  );
};

export default Lands;
