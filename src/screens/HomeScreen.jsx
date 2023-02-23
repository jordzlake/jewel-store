import React, { useEffect } from "react";
import Header from "../components/Header";
import Banner from "../components/home/Banner";
import Listings from "../components/home/Listings";
import Rentals from "../components/home/Rentals";
import Lands from "../components/home/Lands";
import Houses from "../components/home/Houses";
import Commercial from "./../components/home/Commercial";
import Footer from "../components/Footer";

import { listItem } from "../Redux/Actions/ItemActions";
import { useSelector, useDispatch } from "react-redux";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const itemList = useSelector((state) => state.itemList);
  const { loading, error, items: temp } = itemList;
  const items = temp.data;
  useEffect(() => {
    dispatch(listItem());
  }, []);
  window.scrollTo(0, 0);

  return (
    <div>
      <div>
        <Header />
        <Banner />
        <Listings items={items} loading={loading} />
        <Rentals items={items} loading={loading} />
        <Lands items={items} loading={loading} />
        <Houses items={items} loading={loading} />
        <Commercial items={items} loading={loading} />
        <Footer />
      </div>
    </div>
  );
};

export default HomeScreen;
