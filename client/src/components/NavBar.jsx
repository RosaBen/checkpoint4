import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <button type="button" className="navBtn">
        <Link to="/dashboard">Tableau de Bord</Link>
      </button>
      <button type="button" className="navBtn">
        <Link to="/bookings">Réservation</Link>
      </button>
    </nav>
  );
}
