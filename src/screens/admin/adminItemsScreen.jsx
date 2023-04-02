import React from "react";
import Toast from "../../components/Toast";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import Card from "../../components/Card";

const AdminItemsScreen = () => {
  return (
    <div>
      <AdminHeader />
      <Toast />
      <div className="interface-container">
        <AdminSidebar />
        <div className="main-display">
          <div className="admin-main-container">
            <h2 className="admin-header">View/Edit Items</h2>
            <div className="content-container">
              <input
                className="admin-items-searchbar"
                type="text"
                placeholder="search"
              />
              <div className="admin-items-container">
                <Card
                  className="j-orange"
                  name="Place"
                  price="$200,000"
                  bedrooms="3"
                  bathrooms="4"
                  size="1000sqft"
                  im="/images/RedHouse.jpg"
                  redir="/admin/items"
                  type="Commercial"
                  loc="Arima, Ryan Street"
                />
                <Card
                  name="Place"
                  price="$200,000"
                  bedrooms="3"
                  bathrooms="4"
                  size="1000sqft"
                  im="/images/CarHouse.jpg"
                  redir="/admin/items"
                  type="Commercial"
                  loc="Arima, Ryan Street"
                />
                <Card
                  name="Place"
                  price="$200,000"
                  bedrooms="3"
                  bathrooms="4"
                  size="1000sqft"
                  im="/images/CarHouse.jpg"
                  redir="/admin/items"
                  type="Commercial"
                  loc="Arima, Ryan Street"
                />
                <Card
                  name="Place"
                  price="$200,000"
                  bedrooms="3"
                  bathrooms="4"
                  size="1000sqft"
                  im="/images/CarHouse.jpg"
                  redir="/admin/items"
                  type="Commercial"
                  loc="Arima, Ryan Street"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminItemsScreen;
