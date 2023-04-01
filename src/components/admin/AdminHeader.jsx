import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../Redux/Actions/UserActions";

const AdminHeader = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const showDropdownRef = useRef(showDropdown);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/admin/login");
  };
  useEffect(() => {
    showDropdownRef.current = showDropdown;
  }, [showDropdown]);
  const handleClose = (e) => {
    if (showDropdownRef.current) {
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
                <img
                  className="jewel-logo"
                  src="/images/JewelLogo.jpg"
                  alt="Jewel"
                />
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
                  <a
                    href="#"
                    onClick={logoutHandler}
                    className="jewel-nav-link"
                  >
                    Logout
                  </a>
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
          <li>
            <a href="#" onClick={logoutHandler} className="jewel-nav-link">
              Logout
            </a>
          </li>
        </div>
      </div>
    </nav>
  );
};

export default AdminHeader;
