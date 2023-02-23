import React, { useEffect } from "react";
import Header from "../components/Header";
import Gallery from "./../components/Gallery";
import { useParams } from "react-router";
import Footer from "../components/Footer";
import { listItem } from "../Redux/Actions/ItemActions";
import { useSelector, useDispatch } from "react-redux";

const GalleryScreen = () => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const itemList = useSelector((state) => state.itemList);
  const { loading, error, items: temp } = itemList;
  const items = temp.data;
  useEffect(() => {
    dispatch(listItem());
  }, []);
  window.scrollTo(0, 0);

  let { filter } = useParams();

  let title = "Search Results";
  if (filter === "building") {
    title = "Buildings";
  } else if (filter === "land") {
    title = "Lands";
  } else if (filter === "home") {
    title = "Homes";
  } else if (filter === "rent") {
    title = "Rentals";
  } else if (filter === undefined) {
    title = "All Listings";
  } else {
    filter = "search";
  }
  return (
    <div>
      <Header />
      <div className="ctfix page-container">
        <div className="ctspread">
          <h1 className="jewel-orange">{title}</h1>
          {loading === false ? <Gallery items={items} filter={filter} /> : ""}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GalleryScreen;
