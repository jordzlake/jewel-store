import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="jewel-footer d-flex flex-column">
      <div className="socials">
        <a href="https://www.facebook.com/jewelrealestatesold">
          <i style={{ color: "white" }} className="fab fa-facebook"></i>
        </a>
        <a href="https://www.instagram.com/jewel_real_estate/">
          <i style={{ color: "white" }} className="fab fa-instagram"></i>
        </a>
        <a href="https://api.whatsapp.com/send?phone=18686877868&text=">
          <i style={{ color: "white" }} className="fab fa-whatsapp"></i>
        </a>
      </div>
      <ul className="footer-list">
        <li>
          <Link to="/contact">Contact Us</Link>
        </li>
        <li>Feedback</li>
        <li>Ad Choices</li>
        <li>Website</li>
        <li>Help</li>
      </ul>
      <div className="jewel-copyright">
        <p>
          <i className="fa fa-copyright"></i>Jewel 2022
        </p>
      </div>
    </div>
  );
};

export default Footer;
