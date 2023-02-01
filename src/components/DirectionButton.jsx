import React from "react";
import { Link } from "react-router-dom";
const DirectionButton = ({ path, alt }) => {
  const dir = path ? path : "/";
  return (
    <Link
      to={dir}
      className={`jewel-transparent-alt ${
        alt ? "jewel-transparent-alter" : ""
      } jewel-md`}
    >
      See All Listings <i className="fa fa-arrow-right"></i>
    </Link>
  );
};

export default DirectionButton;
