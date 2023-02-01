import React from "react";
import { Link } from "react-router-dom";
//
const Card = ({ name, price, bedrooms, bathrooms, size, im, redir }) => {
  const linkto = redir ? redir : "/";
  return (
    <Link to={linkto}>
      <div className="card-obj">
        <div className="d-flex flex-column card-container">
          <div className="card-image-container">
            <img src={`${im}`} alt="" />
          </div>
          <div className="d-flex flex-column card-info-container">
            <p className="card-name">{`${name}`}</p>
            <p className="card-cost">{`${price}`}</p>
            <p className="card-rooms">
              <b>{`${bedrooms}`}</b> Bedrooms, <b>{`${bathrooms}`}</b> Bathrooms
            </p>
            <p className="size">
              <b>{`${size}`}</b> sq ft.
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
