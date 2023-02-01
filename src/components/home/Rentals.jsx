import React from "react";
import rentals from "../../data/Rentals";
import Card from "../Card";
import DirectionButton from "../DirectionButton";

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
          <div className="listings d-flex">
            {rentals.map((listitem) => (
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
          </div>
          <DirectionButton path={"/"} />
        </div>
      </div>
    </div>
  );
};

export default Rentals;
