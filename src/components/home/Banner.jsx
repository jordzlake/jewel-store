import React from "react";
import { useEffect, useState } from "react";

const Banner = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleCloseMenu = (e) => {
    if (!e.target.closest(".bannerMenu") && !showMenu) {
      setShowMenu(false);
    }
  };

  const handleClick = (e) => {
    setShowMenu(!showMenu);
    e.stopPropagation();
  };

  useEffect(() => {
    document.addEventListener("click", handleCloseMenu);

    return () => {
      document.removeEventListener("click", handleCloseMenu);
    };
  }, []);

  return (
    <div className="banner-container">
      <div className="jewel-banner">
        <img src="/images/IntroHouse2.jpg" alt="Intro House" />
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
                  Choose your search requirements and click the button below to
                  search.
                </p>
                <form className="bannerSearchForm" action="">
                  <div className="searchFormRow">
                    <label htmlFor="loc">Location:</label>
                    <input name="loc" type="text" />
                  </div>
                  <div className="searchFormRow">
                    <label htmlFor="bed">Bedrooms:</label>
                    <input name="bed" type="number" />
                  </div>
                  <div className="searchFormRow">
                    <label htmlFor="bath">Bathrooms:</label>
                    <input name="bath" type="number" />
                  </div>
                  <div className="searchFormRow">
                    <label htmlFor="pricing">Pricing:</label>
                    <input name="loc" type="text" />
                  </div>
                  <button className="searchFormButton">Search</button>
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
