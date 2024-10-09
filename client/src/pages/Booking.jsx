import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

import WorkshopCard from "../components/WorkshopCard";
import Calendar from "../components/Calendar";

export default function Booking() {
  const workshops = useLoaderData();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [level, setLevel] = useState(searchParams.get("level") || "all");

  useEffect(() => {
    navigate(`/booking?level=${level}`);
  }, [level, navigate]);

  const handleChangeLevel = (newLevel) => {
    setLevel(newLevel);
    searchParams.set("level", newLevel);
    navigate(`/booking?${searchParams.toString()}`);
  };

  return (
    <div className="bookingPage">
      <h1>Réservation</h1>
      <div className="bookingLevel">
        <button type="button" onClick={() => handleChangeLevel("all")}>
          Tous Niveaux
        </button>
        <button type="button" onClick={() => handleChangeLevel("debutant")}>
          Débutants
        </button>
        <button
          type="button"
          onClick={() => handleChangeLevel("intermediaire")}
        >
          Intermédiaire
        </button>
        <button type="button" onClick={() => handleChangeLevel("avance")}>
          Avancé
        </button>
      </div>
      <div className="bookingWorkshop">
        {workshops.map((workshop) => (
          <WorkshopCard key={workshop.id} workshop={workshop} />
        ))}
      </div>
      <div className="bookingCalendar">
        <Calendar />
      </div>
    </div>
  );
}
