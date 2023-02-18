import React from "react";
import { Link } from "react-router-dom";
//
const Card = ({
  name,
  price,
  bedrooms,
  bathrooms,
  size,
  im,
  redir,
  type,
  loc,
}) => {
  const linkto = redir ? redir : "/";
  return (
    <Link to={linkto}>
      <div className="card-obj">
        <div className="d-flex flex-column card-container">
          <div className="card-image-container">
            <img src={`${im}`} alt="" />
          </div>
          <div className="d-flex flex-column card-info-container">
            <p className="card-name">
              {`${name}`} - {`${loc}`}
            </p>
            <p className="card-cost">{`${price}`}</p>
            {type !== "land" && (
              <p className="card-rooms">
                <b>{`${bedrooms}`}</b> Bedrooms, <b>{`${bathrooms}`}</b>{" "}
                Bathrooms
              </p>
            )}
            <p className="size">
              <b>{`${size}`}</b> {type !== "land" ? "sq ft" : "acres"}.
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
