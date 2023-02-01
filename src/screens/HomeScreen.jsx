import React from "react";
import Header from "../components/Header";
import Banner from "../components/home/Banner";
import Listings from "../components/home/Listings";
import Rentals from "../components/home/Rentals";
import Lands from "../components/home/Lands";
import Houses from "../components/home/Houses";
import Commercial from "./../components/home/Commercial";
import Footer from "../components/Footer";
const HomeScreen = () => {
  return (
    <div>
      <div>
        <Header />
        <Banner />
        <Listings />
        <Rentals />
        <Lands />
        <Houses />
        <Commercial />
        <Footer />
      </div>
    </div>
  );
};

export default HomeScreen;
