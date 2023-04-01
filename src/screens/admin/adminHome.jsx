import React from "react";
import Toast from "./../../components/Toast";
import AdminHeader from "./../../components/admin/AdminHeader";

const AdminHomeScreen = () => {
  return (
    <div>
      <AdminHeader />
      <div className="banner-container">
        <h1>Welcome to the admin portal</h1>
      </div>
    </div>
  );
};

export default AdminHomeScreen;
