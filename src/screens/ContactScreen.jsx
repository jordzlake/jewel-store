import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const ContactScreen = () => {
  window.scrollTo(0, 0);
  return (
    <div>
      <Header />
      <div className="page-container ctfix  contact-container">
        <div className="ctspread jewel-ct-flex">
          <h1 className="contactHeading jewel-orange">Contact Us</h1>
          <div className="contact-ct row">
            <div className="contactInfo col-lg-6 col-12">
              <h2 className="contactTitle">Phone</h2>
              <p>(868) 687-7868</p>
              <a
                href="tel:+1-868-687-7868"
                className="jewel-transparent-alt jewel-lg jewel-nm"
              >
                Call Now!
              </a>
              <h2 className="contactTitle">Social Media</h2>
              <div className="contact-icons">
                <a href="https://www.facebook.com/jewelrealestatesold">
                  <i
                    style={{ color: "#4267B2" }}
                    className="fab fa-facebook"
                  ></i>
                </a>
                <a href="https://www.instagram.com/jewel_real_estate/">
                  <i className="fab fa-instagram insta-gradient"></i>
                </a>
                <a href="https://api.whatsapp.com/send?phone=18686877868&text=">
                  <i
                    style={{ color: "#25D366" }}
                    className="fab fa-whatsapp"
                  ></i>
                </a>
              </div>
            </div>
            <div className="contactAdditional col-lg-6 col-12">
              <div className="contact-ad-heading">
                <h2 className="contactTitle">Address</h2>
                <p className="addressdetails">Orchard Gardens</p>
                <p className="addressdetails">Saint Charles</p>
                <p style={{ paddingBottom: 50 }} className="addressdetails">
                  Trinidad and Tobago
                </p>
              </div>
              <div style={{ paddingBottom: 50 }} className="contact-ad-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7845.55756038788!2d-61.41398446056549!3d10.518082521299585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c35f911fb41a68b%3A0x488e9b86b5c545d2!2sJewel%20Real%20Estate%20Trinidad%20%26%20Tobago!5e0!3m2!1sen!2stt!4v1676442864641!5m2!1sen!2stt"
                  width="100%"
                  height="100%"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="jewel-map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactScreen;
