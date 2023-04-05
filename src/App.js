import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import CacheBuster from "react-cache-buster";
import AppSettings from "../package.json";
import { Route, Routes } from "react-router";
import HomeScreen from "./screens/HomeScreen";
import ContactScreen from "./screens/ContactScreen";
import GalleryScreen from "./screens/GalleryScreen";
import SingleItemScreen from "./screens/SingleItemScreen";
import MissionScreen from "./screens/MissionScreen";
import AdminLogin from "./screens/admin/adminLoginScreen";
import AdminHomeScreen from "./screens/admin/adminHome";
import PrivateRoute from "./PrivateRoute";
import AdminItemsScreen from "./screens/admin/adminItemsScreen";
import AdminItemsDetailsScreen from "./screens/admin/adminItemsDetailsScreen";
import AdminAddItemScreen from "./screens/admin/adminAddItemScreen";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const isProduction = process.env.NODE_ENV === "production";
  return (
    <CacheBuster
      currentVersion={AppSettings.version}
      isEnabled={isProduction} //If false, the library is disabled.
      loadingComponent={<LoadingSpinner />} //If not pass, nothing appears at the time of new version check.
    >
      <React.Fragment>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/contact" element={<ContactScreen />} />
          <Route path="/items/:filter?" element={<GalleryScreen />} />
          <Route path="/item/:id" element={<SingleItemScreen />} />
          <Route path="/mission" element={<MissionScreen />} />
          {/* Portal Routes */}
          <Route path="/admin/" element={<PrivateRoute />}>
            <Route path="/admin/" element={<AdminHomeScreen />} />
          </Route>
          <Route path="/admin/items" element={<PrivateRoute />}>
            <Route path="/admin/items" element={<AdminItemsScreen />} />
          </Route>
          <Route path="/admin/additem" element={<PrivateRoute />}>
            <Route path="/admin/additem" element={<AdminAddItemScreen />} />
          </Route>
          <Route path="/admin/site" element={<PrivateRoute />}>
            <Route path="/admin/site" element={<AdminHomeScreen />} />
          </Route>
          <Route path="/admin/messages" element={<PrivateRoute />}>
            <Route path="/admin/messages" element={<AdminHomeScreen />} />
          </Route>
          <Route path="/admin/items/:id" element={<PrivateRoute />}>
            <Route
              path="/admin/items/:id"
              element={<AdminItemsDetailsScreen />}
            />
          </Route>
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
      </React.Fragment>
    </CacheBuster>
  );
}

export default App;
