import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <button type="button" className="btnNavbar">
        <Link to="/">Accueil</Link>
      </button>

      <button type="button" className="btnNavbar">
        <Link to="/dashboard">Gestion</Link>
      </button>
    </nav>
  );
}
