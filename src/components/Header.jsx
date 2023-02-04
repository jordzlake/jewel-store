import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const handleClose = (e) => {
    if (!e.target.closest(".drpdown-list") && !showDropdown) {
      setShowDropdown(false);
    }
  };
  const handleClick = (e) => {
    setShowDropdown(!showDropdown);
    e.stopPropagation();
  };

  useEffect(() => {
    document.addEventListener("click", handleClose);
    return () => {
      document.removeEventListener("click", handleClose);
    };
  }, []);

  return (
    <nav className="header-nav">
      <div className="page-container nav-pos">
        <div className="row justify-content-between">
          <div className="col-12 col-md-4 colx d-flex justify-content-between align-items-center">
            <div className="jewel-logo-container d-flex justify-content-center">
              <Link to={"/"} className="">
                {/*<img
                  className="jewel-logo"
                  src="/images/JewelLogo.jpg"
                  alt="Jewel"
  />*/}
                <h1>Jaya is Gay</h1>
              </Link>
            </div>
            <div className=" jewel-nav-button">
              <button
                type="button"
                className={`rounded dropdown-icon ${
                  showDropdown ? "flip" : ""
                }`}
                onClick={handleClick}
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fa fa-bars"></i>
              </button>
            </div>
          </div>
          <div className="col-12 col-md-8 colx align-items-center jewel-nav-list-container">
            <nav>
              <ul className="jewel-nav-list">
                <li>
                  <Link to={"/"} className="jewel-nav-link">
                    Homes
                  </Link>
                </li>
                <li>
                  <Link to={"/"} className="jewel-nav-link">
                    Lands
                  </Link>
                </li>
                <li>
                  <Link to={"/"} className="jewel-nav-link">
                    Buildings
                  </Link>
                </li>
                <li>
                  <Link to={"/"} className="jewel-nav-link">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to={"/"} className="jewel-nav-link">
                    Our Mission
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <img
          src="/images/svgs/FloralNav1.svg"
          className="nav-style nav-style-lower"
          alt=""
        />
        <img
          src="/images/svgs/FloralNav2.svg"
          className="nav-style nav-style-upper"
          alt=""
        />
      </div>
      <div className="drpdown-relative">
        <div className={`drpdown-list ${showDropdown ? "show" : ""}`}>
          <Link to="/" className="drpdown-item">
            Homes
          </Link>
          <Link to="/" className="drpdown-item">
            Lands
          </Link>
          <Link to="/" className="drpdown-item">
            Buildings
          </Link>
          <Link to="/" className="drpdown-item">
            Contact Us
          </Link>
          <Link to="/" className="drpdown-item">
            Our Mission
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
