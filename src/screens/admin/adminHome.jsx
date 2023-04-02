import React from "react";
import Toast from "./../../components/Toast";
import AdminHeader from "./../../components/admin/AdminHeader";
import AdminSidebar from "./../../components/admin/AdminSidebar";

const AdminHomeScreen = () => {
  return (
    <div>
      <AdminHeader />
      <Toast />
      <div className="interface-container">
        <AdminSidebar />
        <div className="main-display">
          <div className="admin-main-container">
            <h2 className="admin-header">Dashboard</h2>
            <div className="dashboard-container">
              <div className="main-graph">
                <div className="main-graph-container">
                  <h3>Current Contents</h3>
                  <div></div>
                </div>
                <div className="dashbord-r-container">
                  <div className="top-cards">
                    <div className="card"></div>
                    <div className="card"></div>
                  </div>
                </div>
              </div>
              <div className="Bottom Content"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomeScreen;
