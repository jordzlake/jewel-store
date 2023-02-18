import "./App.css";
import { Route, Routes } from "react-router";
import HomeScreen from "./screens/HomeScreen";
import ContactScreen from "./screens/ContactScreen";
import GalleryScreen from "./screens/GalleryScreen";
import SingleItemScreen from "./screens/SingleItemScreen";
import MissionScreen from "./screens/MissionScreen";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/contact" element={<ContactScreen />} />
      <Route path="/items/:filter?" element={<GalleryScreen />} />
      <Route path="/item/:id" element={<SingleItemScreen />} />
      <Route path="/mission" element={<MissionScreen />} />
    </Routes>
  );
}

export default App;
