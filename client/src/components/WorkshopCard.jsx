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

    fetchLocations(); // Appel de la fonction asynchrone
  }, []);

  if (loading) {
    return <p>Chargement des données...</p>;
  }

  return (
    <div>
      <h2>{workshop.workshopDate}</h2>
      <p>{workshop.duration}</p>
      <p>{workshop.workshopTime}</p>
      <p>{workshop.description}</p>
      <p>{workshop.level}</p>
      <div>
        {locations.map((location) => {
          if (location.id === workshop.locationId) {
            return (
              <div key={location.id}>
                <p>{location.room}</p>
                <p>{location.address}</p>
                <p>
                  {location.postCode}-{location.city}
                </p>
                <p>{location.country}</p>
                <p>capacité: {location.capacity}</p>
              </div>
            );
          }
          return null;
        })}
      </div>
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
