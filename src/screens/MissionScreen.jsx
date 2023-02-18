import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const MissionScreen = () => {
  window.scrollTo(0, 0);
  return (
    <div>
      <Header />
      <div className="page-container ctfix jewel-ct-flex mission-container">
        <div className="ctspread">
          <h1 className="jewel-orange">Our Mission</h1>
          <br />
          <p>
            In operation for about a decade Jewel Real Estate has serviced
            commercial and residental customers with property sales and rentals.
          </p>
          <br />
          <p>
            A dedicated personalized and customer focused approach to the real
            estate business has continually brought satisfactory results to all
            our clients
          </p>
          <br />
          <p>
            Our office is located in Orchard Gardens, Chaguanas, but our arms
            stretch nationwide!
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MissionScreen;
