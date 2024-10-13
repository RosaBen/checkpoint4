import { Outlet } from "react-router-dom";

import NavBar from "./components/NavBar";
import "./App.css";
import "./styles/booking.css";
import "./styles/calendar.css";

function App() {
  return (
    <main className="container">
      <NavBar />
      <Outlet />
    </main>
  );
}

export default App;
