import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { Route, Routes } from "react-router";
import HomeScreen from "./screens/HomeScreen";
import ContactScreen from "./screens/ContactScreen";
import GalleryScreen from "./screens/GalleryScreen";
import SingleItemScreen from "./screens/SingleItemScreen";
import MissionScreen from "./screens/MissionScreen";
import AdminLogin from "./screens/admin/adminLoginScreen";
import AdminHomeScreen from "./screens/admin/adminHome";
import Toast from "./components/Toast";

function App() {
  return (
    <React.Fragment>
      <Toast />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/contact" element={<ContactScreen />} />
        <Route path="/items/:filter?" element={<GalleryScreen />} />
        <Route path="/item/:id" element={<SingleItemScreen />} />
        <Route path="/mission" element={<MissionScreen />} />
        {/* Portal Routes */}
        <Route path="/admin/" element={<AdminHomeScreen />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
