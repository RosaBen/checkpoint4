import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import WorkshopCard from "../components/WorkshopCard";

export default function Booking() {
  const workshops = useLoaderData();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  console.info("searchparams", searchParams)

  const levelFromUrl = searchParams.get("level") || "";

  const [selectedLevel, setSelectedLevel] = useState(levelFromUrl);

  useEffect(() => {
    setSelectedLevel(levelFromUrl);
  }, [levelFromUrl]);
  const handleChangeLevel = (e) => {
    const level = e.target.value;
    setSelectedLevel(level);
    navigate(`/booking?level=${level}`, { replace: true });
  };

  const uniqueLevels = [
    ...new Set(workshops.map((workshop) => workshop.level)),
  ];

  return (
    <div className="bookingPage">
      <h1>Réservation</h1>

      <div>
        <button type="button" value="" onClick={handleChangeLevel}>
          Tous les Niveaux
        </button>
        {uniqueLevels.map((level) => (
          <button
            type="button"
            key={level}
            value={level}
            onClick={handleChangeLevel}
          >
            {level}
          </button>
        ))}
      </div>

      <br />
      {workshops
        .filter(
          (workshop) => selectedLevel === "" || workshop.level === selectedLevel
        )
        .map((workshop) => (
          <WorkshopCard key={workshop.id} workshop={workshop} />
        ))}
    </div>
  );
}
