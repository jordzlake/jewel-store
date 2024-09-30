import React, { useRef } from "react";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import fadesettings from "../SlickFadeSettings";
import { Link, useNavigate } from "react-router-dom";
import cities from "../../data/Cities";
import prices from "../../data/Prices";
import { useDispatch, useSelector } from "react-redux";
import { listBannerImage } from "../../Redux/Actions/BannerImageActions";

const defaultBanner = [
  { imageUrl: "/images/HomeBanner1.jpeg" },
  { imageUrl: "/images/HomeBanner2.jpeg" },
  { imageUrl: "/images/HomeBanner3.jpeg" },
];

const Banner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [firstPass, setFirstPass] = useState(0);
  const [currentType, setCurrentType] = useState("");
  const [displayImages, setDisplayImages] = useState([]);
  const showMenuRef = useRef(showMenu);

  const bannerImageList = useSelector((state) => state.bannerImageList);
  const { loading, error, bannerImages } = bannerImageList;

  useEffect(() => {
    // Only fetch banner images if there are no images loaded already
    if (!bannerImages || bannerImages.length === 0) {
      dispatch(listBannerImage());
    }
  }, [dispatch]);

  useEffect(() => {
    setFirstPass(firstPass + 1);
    // Update display images when bannerImages changes
    if (bannerImages.length > 0) {
      setDisplayImages(bannerImages);
    } else {
      if (firstPass == 1) {
        setDisplayImages(defaultBanner);
      } // Fallback if no images
    }
  }, [bannerImages]);

  useEffect(() => {}, []);

  useEffect(() => {
    showMenuRef.current = showMenu;
  }, [showMenu]);

  const handleCloseMenu = (e) => {
    if (!e.target.closest(".bannerMenu") && showMenuRef.current) {
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

  return (
    <div className="banner-container ">
      <div className="jewel-banner">
        <div className="j-carousel">
          {displayImages.length > 0 && (
            <Slider {...fadesettings}>
              {displayImages.map((displayImage, i) => (
                <div key={i}>
                  <img src={displayImage.imageUrl} alt="Intro House" />
                </div>
              ))}
            </Slider>
          )}
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
                      <option key="4" value="rent">
                        Rentals
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
