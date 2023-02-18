import React from "react";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import fadesettings from "../SlickFadeSettings";
import { Link, useNavigate } from "react-router-dom";
import cities from "../../data/Cities";
import prices from "../../data/Prices";

const Banner = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [currentType, setCurrentType] = useState("");

  const handleCloseMenu = (e) => {
    if (!e.target.closest(".bannerMenu") && !showMenu) {
      setShowMenu(false);
    }
  };

  const handleClick = (e) => {
    setShowMenu(!showMenu);
    e.stopPropagation();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const type = document.getElementById("type").value;
    const location = document.getElementById("location").value;
    let pricing = document.getElementById("pricing").value;
    pricing = pricing.replace(/\s/g, "");
    const formatpricing = pricing.split("-");
    const lowerprice = formatpricing[0];
    const higherprice = formatpricing[1];
    if (type !== "land") {
      const bedrooms = document.getElementById("numbedrooms").value;
      const bathrooms = document.getElementById("numbathrooms").value;
      navigate(
        `/items/search?&location=${location}&bathrooms=${bathrooms}&bedrooms=${bedrooms}&lowerprice=${lowerprice}&higherprice=${higherprice}&type=${type}`
      );
    } else {
      navigate(
        `/items/search?&location=${location}&lowerprice=${lowerprice}&higherprice=${higherprice}&type=${type}`
      );
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleCloseMenu);

    return () => {
      document.removeEventListener("click", handleCloseMenu);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleCloseMenu);

    return () => {
      document.removeEventListener("click", handleCloseMenu);
    };
  }, []);

  return (
    <div className="banner-container ">
      <div className="jewel-banner">
        <div className="j-carousel">
          <Slider {...fadesettings}>
            <div>
              <img src="/images/IntroHouse2.jpg" alt="Intro House" />
            </div>
            <div>
              <img src="/images/CityEscapeHouses2.jpg" alt="Intro House 2" />
            </div>
            <div>
              <img src="/images/RedHouse2.jpg" alt="Intro House" />
            </div>
          </Slider>
        </div>
        <div className="page-container fullcnt">
          <div className="row jewel-msg fullcnt">
            <div className="d-flex flex-column align-items-center justify-content-center">
              <h1 className="announcement">Search for the Perfect Home</h1>
              <button
                onClick={handleClick}
                className={`${
                  showMenu ? "hideBannerButton" : ""
                } jewel-transparent announcement-btn`}
              >
                Search
              </button>
              <div
                className={` bannerMenu ${showMenu ? "showBannerMenu" : ""}`}
              >
                <p className="bannerInstructions">
                  <b>
                    Choose your search requirements and click the button below
                    to search.
                  </b>
                </p>
                <form className="bannerSearchForm" action="">
                  <div className="searchFormRow">
                    <label className="labrowItem" htmlFor="loc">
                      Type:
                    </label>
                    {/*<input id="location" name="loc" type="text" />*/}
                    <select
                      className="rowItem"
                      defaultValue={currentType}
                      onChange={(e) => {
                        setCurrentType(e.target.value);
                      }}
                      name="type"
                      id="type"
                    >
                      <option key="1" value="home">
                        Homes
                      </option>
                      <option key="2" value="land">
                        Lands
                      </option>
                      <option key="3" value="building">
                        Buildings
                      </option>
                    </select>
                  </div>
                  <div className="searchFormRow">
                    <label className="labrowItem" htmlFor="loc">
                      Location:
                    </label>
                    {/*<input id="location" name="loc" type="text" />*/}
                    <select className="rowItem" name="location" id="location">
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                  {!(currentType === "land") && (
                    <React.Fragment>
                      <div className="searchFormRow">
                        <label className="labrowItem" htmlFor="bed">
                          Bedrooms:
                        </label>
                        <input
                          className="rowItem"
                          id="numbedrooms"
                          name="bed"
                          type="number"
                          defaultValue={1}
                          max={9}
                          min={1}
                        />
                      </div>
                      <div className="searchFormRow">
                        <label className="labrowItem" htmlFor="bath">
                          Bathrooms:
                        </label>
                        <input
                          className="rowItem"
                          id="numbathrooms"
                          name="bath"
                          type="number"
                          defaultValue={1}
                          max={9}
                          min={1}
                        />
                      </div>
                    </React.Fragment>
                  )}
                  <div className="searchFormRow">
                    <label className="labrowItem" htmlFor="loc">
                      Pricing:
                    </label>
                    {/*<input id="location" name="loc" type="text" />*/}
                    <select className="rowItem" name="pricing" id="pricing">
                      {prices.map((price) => (
                        <option key={price} value={price}>
                          {price}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button onClick={handleSearch} className="searchFormButton">
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
