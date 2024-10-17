import { Outlet } from "react-router-dom";

import Navbar from "./components/NavBar";

import "./styles/App.css";
import "./styles/dashboard.css";
import "./styles/navbar.css";
import "./styles/form.css";

function App() {
  return (
    <main className="container">
      <Navbar />
      <Outlet />
    </main>
  );
}

export default App;
