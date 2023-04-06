import React, { useEffect } from "react";
import Toast from "./../../components/Toast";
import AdminHeader from "./../../components/admin/AdminHeader";
import AdminSidebar from "./../../components/admin/AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../../components/LoadingSpinner";
import { listItem } from "../../Redux/Actions/ItemActions";

const AdminHomeScreen = () => {
  const dispatch = useDispatch();
  const itemList = useSelector((state) => state.itemList);
  const { loading, error, items } = itemList;

  useEffect(() => {
    dispatch(listItem());
  }, [dispatch]);

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
              <div className="main-admin-stats-container row">
                <div className="main-graph-container col-lg-8 col-md-12">
                  <h3>Current Items</h3>
                  <iframe
                    className="admin-main-chart"
                    style={{
                      background: "#FFFFFF",
                      border: "none",
                      borderRadius: "2px",
                      boxShadow: "2px 2px 4px rgb(167, 167, 167)",
                    }}
                    src="https://charts.mongodb.com/charts-smallbusinesses-imoqj/embed/charts?id=642c2293-b59c-4aa1-8aae-80ef885856e3&maxDataAge=3600&theme=light&autoRefresh=true"
                  ></iframe>
                </div>
                <div className="dashboard-r-container col-lg-4 col-md-12">
                  <div className="top-cards">
                    <div className="card">
                      <h3 className="card-title">Number of Items</h3>
                      {loading ? (
                        <LoadingSpinner />
                      ) : (
                        <p className="admin-card-content">{items.length}</p>
                      )}
                    </div>
                    {/*                     <div className="card">
                      <h3 className="card-title">Number of Requests</h3>
                      <p className="admin-card-content">2</p>
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="admin-dashboard-bottom-container col-lg-12">
                {/* <h3 className="card-title">Recent Requests</h3> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomeScreen;
