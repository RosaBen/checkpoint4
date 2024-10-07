import { useLoaderData, useNavigate } from "react-router-dom";
import WorkshopCard from "../components/WorkshopCard";

export default function Booking() {
  const workshops = useLoaderData();

  const navigate = useNavigate();

  const handleChangeLevel = (e) => {
    navigate(`/booking?level=${e.target.value}`);
  };

  const handleChangeDate = (e) => {
    navigate(`/booking?workshopDate=${e.target.value}`);
  };

  return (
    <div className="bookingPage">
      <h1>Réservation</h1>

      <select onChange={handleChangeLevel}>
        <option value="">Niveaux</option>
        {workshops.map((workshop) => (
          <option key={workshop.id} value={workshop.level}>
            {workshop.level}
          </option>
        ))}
      </select>
      <br />
      <select onChange={handleChangeDate}>
        <option value="">Dates</option>
        {workshops.map((workshop) => (
          <div key={workshop.id}>
            <option value={workshop.workshopDate}>
              {workshop.workshopDate}
            </option>
            <WorkshopCard key={workshop.id} workshop={workshop} />
          </div>
        ))}
      </select>
      {workshops.map((workshop) => (
        <WorkshopCard key={workshop.id} workshop={workshop} />
      ))}
    </div>
  );
}
