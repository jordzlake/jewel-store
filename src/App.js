import "./App.css";
import { Route, Routes } from "react-router";
import HomeScreen from "./screens/HomeScreen";
import ContactScreen from "./screens/ContactScreen";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/contact" element={<ContactScreen />} />
    </Routes>
  );
}

export default App;
