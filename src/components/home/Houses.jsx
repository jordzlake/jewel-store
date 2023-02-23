import React from "react";
import Card from "../Card";
import DirectionButton from "../DirectionButton";
import Slider from "react-slick";
import settings from "../SlickSettings";

const Houses = ({ items, loading }) => {
  return (
    <div className="houses-listings">
      <div className="page-container">
        <div className="list-container d-flex flex-column">
          <div className="list-header d-flex flex-column">
            <h2 className="jewel-orange section-title">Houses</h2>
            <p className="jewel-black section-info">
              Select an item to see more information.
            </p>
          </div>
          {loading === false ? (
            <Slider
              {...settings}
              infinite={
                items.filter((temp) => temp.type === "home").length >
                settings.slidesToShow
              }
            >
              {items
                .filter((temp) => temp.type === "home")
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
                      type={"home"}
                      loc={listitem.city}
                    />
                  </div>
                ))}
            </Slider>
          ) : (
            ""
          )}
          <DirectionButton path={"/items/home"} />
        </div>
      </div>
      <div className="tree-vectors">
        <img src="/images/svgs/PalmsReal.svg" className="tree t1" alt="tree1" />
        <img src="/images/svgs/PalmsReal.svg" className="tree t2" alt="tree2" />
      </div>
    </div>
  );
};

export default Houses;
