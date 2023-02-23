import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import Card from "./Card";

const Gallery = ({ filter, items }) => {
  const [allItems, setAllItems] = useState([]);
  const [displayItems, setDisplayItems] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const data = items;
    setAllItems(data);
    if (filter && allItems.length !== 0) {
      if (filter != "search") {
        const temp = allItems.filter((item) => item.type === `${filter}`);
        setDisplayItems(temp);
      } else {
        const searchParams = new URLSearchParams(location.search);
        let bedrooms = 0;
        let bathrooms = 0;
        const type = searchParams.get("type");
        if (type != "lands") {
          bedrooms = Number(searchParams.get("bedrooms"));
          bathrooms = Number(searchParams.get("bathrooms"));
        }
        const higherprice = Number(searchParams.get("higherprice").slice(1));
        const lowerprice = Number(searchParams.get("lowerprice").slice(1));
        const loc = searchParams.get("location");

        // console.log(
        //   `loc:${loc} type:${type} lowerprice=${lowerprice} higherprice=${higherprice} bedrooms=${bedrooms} bathrooms=${bathrooms}`
        // );
        const temp = allItems.filter((item) => {
          if (loc === "Other") {
            return (
              item.type === `${type}` &&
              Number(item.bathrooms) >= bathrooms &&
              Number(item.bedrooms) >= bedrooms &&
              Number(item.price.slice(1).slice(0, -3).replaceAll(",", "")) >=
                lowerprice &&
              Number(item.price.slice(1).slice(0, -3).replaceAll(",", "")) <=
                higherprice
            );
          } else
            return (
              item.city === `${loc}` &&
              item.type === `${type}` &&
              Number(item.bathrooms) >= bathrooms &&
              Number(item.bedrooms) >= bedrooms &&
              Number(item.price.slice(1).slice(0, -3).replaceAll(",", "")) >=
                lowerprice &&
              Number(item.price.slice(1).slice(0, -3).replaceAll(",", "")) <=
                higherprice
            );
        });
        setDisplayItems(temp);
      }
    } else {
      const temp = allItems;
      setDisplayItems(allItems);
    }
  }, [allItems, filter, location.search]);

  return (
    <div>
      <p>Select an item below to view:</p>
      <div className="gallery-container">
        {displayItems.length > 0 ? (
          displayItems.map((listitem) => (
            <div className="gallery-card" key={listitem._id}>
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
          ))
        ) : (
          <p>
            No Items found.{" "}
            <Link to={"/"} className="jewel-orange">
              Click to go Back.
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Gallery;
