import { Outlet } from "react-router-dom";
import "./App.css";
import "./styles/booking.css";
import "./styles/calendar.css";

function App() {
  return (
    <main className="container">
      <Outlet />
    </main>
  );
}

export default App;
