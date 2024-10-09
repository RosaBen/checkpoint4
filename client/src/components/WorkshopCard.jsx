import PropTypes from "prop-types";
import { useState, useEffect } from "react";

import { getLocation } from "../services/request";

export default function WorkshopCard({ workshop }) {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLocations() {
      try {
        const locationsData = await getLocation();
        setLocations(locationsData);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des locations", error);
        setLoading(false);
      }
    }

    fetchLocations();
  }, []);

  if (loading) {
    return <p>Chargement des données...</p>;
  }

  return (
    <div className="workshopContainer">
      <section className="workshopLevel">
        <div className="workshopPrincipal">
          <p>
            <strong>Niveau:</strong> {workshop.level}
          </p>
          <p>
            <strong>Durée:</strong> {workshop.duration} mn
          </p>
          <p>
            <strong>Heure: </strong>
            {workshop.workshopTime}
          </p>
          <p>
            <strong>Description:</strong> {workshop.description}
          </p>
        </div>
        <div className="workshopLocation">
          {locations.map((location) => {
            if (location.id === workshop.locationId) {
              return (
                <div key={location.id}>
                  <p>
                    <strong>Situé:</strong> {location.room}
                  </p>
                  <p>{location.address}</p>
                  <p>
                    {location.postCode} - {location.city}
                  </p>
                  <p>{location.country}</p>
                  <p>
                    <strong> Capacité de l'endroit: </strong>{" "}
                    {location.capacity} places
                  </p>
                </div>
              );
            }
            return null;
          })}
        </div>
      </section>
      <section className="workshopCalendar">
        <h2>{workshop.workshopDate}</h2>
      </section>
    </div>
  );
}

WorkshopCard.propTypes = {
  workshop: PropTypes.shape({
    workshopDate: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    workshopTime: PropTypes.string.isRequired,
    description: PropTypes.string,
    level: PropTypes.string.isRequired,
    locationId: PropTypes.number.isRequired,
  }).isRequired,
};
