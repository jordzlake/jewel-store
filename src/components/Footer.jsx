import React from "react";

const Footer = () => {
  return (
    <div className="jewel-footer d-flex flex-column">
      <div className="socials">
        <i className="fab fa-facebook"></i>
        <i className="fab fa-instagram"></i>
        <i className="fab fa-linkedin"></i>
      </div>
      <ul className="footer-list">
        <li>About Us</li>
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
