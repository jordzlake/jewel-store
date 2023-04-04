import React, { useEffect, useState } from "react";
import Toast from "../../components/Toast";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import Card from "../../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { listItem } from "../../Redux/Actions/ItemActions";
import LoadingSpinner from "./../../components/LoadingSpinner";
import DeleteIcon from "../../components/admin/DeleteIcon";

const AdminItemsScreen = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [displayItems, setDisplayItems] = useState([]);
  const itemList = useSelector((state) => state.itemList);
  const { loading, error, items } = itemList;

  useEffect(() => {
    if (items) {
      if (search) {
        setDisplayItems(
          items.filter(
            (item) =>
              item.name.toLowerCase().includes(search.toLowerCase()) ||
              item.price.toLowerCase().includes(search.toLowerCase()) ||
              item.city.toLowerCase().includes(search.toLowerCase()) ||
              item.country.toLowerCase().includes(search.toLowerCase()) ||
              item.type.toLowerCase().includes(search.toLowerCase())
          )
        );
      } else {
        setDisplayItems(items);
      }
    }
  }, [search, setDisplayItems, loading, dispatch]);

  useEffect(() => {
    dispatch(listItem());
    if (items) setDisplayItems(items);
  }, [dispatch]);

  //deleting product

  return (
    <div>
      <AdminHeader />
      <Toast />
      <div className="interface-container">
        <AdminSidebar />
        <div className="main-display">
          <div className="admin-main-container">
            <h2 className="admin-header">View/Edit Items</h2>
            <div className="admin-search-container">
              <input
                className="admin-items-searchbar mb-4"
                type="text"
                placeholder="Search for an item"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <p>error</p>
            ) : (
              <React.Fragment>
                <div className="content-container">
                  <div className="admin-items-container">
                    {displayItems.map((item) => (
                      <div key={item._id} className="admin-items-card">
                        <Card
                          id={item._id}
                          className="j-orange"
                          name={item.name}
                          price={item.price}
                          bedrooms={item.bedrooms}
                          bathrooms={item.bathrooms}
                          size={item.size}
                          im={item.mainImage}
                          redir={`/admin/items/${item._id}`}
                          type={item.type}
                          loc={item.city}
                          editable={true}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminItemsScreen;
