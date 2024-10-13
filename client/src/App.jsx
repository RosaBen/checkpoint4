import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";

import "./styles/App.css";
import "./styles/dashboard.css";
import "./styles/navbar.css";

function App() {
  return (
    <main className="container">
      <Navbar />
      <Outlet />
    </main>
  );
}

export default App;
