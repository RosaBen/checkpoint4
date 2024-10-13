import { useState } from "react";
import PropTypes from "prop-types";

export default function WorkshopForm({ onSubmit, onClose }) {
  const [workshopDate, setWorkshopDate] = useState("");
  const [workshopTime, setWorkshopTime] = useState("");
  const [duration, setDuration] = useState(45);
  const [level, setLevel] = useState("Débutant");
  const [locationId, setLocationId] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "workshopDate") {
      setWorkshopDate(value);
    } else if (name === "workshopTime") {
      setWorkshopTime(value);
    } else if (name === "duration") {
      setDuration(value);
    } else if (name === "level") {
      setLevel(value);
    } else if (name === "locationId") {
      setLocationId(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      workshopDate,
      workshopTime,
      duration,
      level,
      locationId,
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Date:
        <input
          type="date"
          name="workshopDate"
          value={workshopDate}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Heure:
        <input
          type="time"
          name="workshopTime"
          value={workshopTime}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Durée:
        <input
          type="number"
          name="duration"
          value={duration}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Niveau:
        <input
          type="text"
          name="level"
          value={level}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Lieu:
        <input
          type="number"
          name="locationId"
          value={locationId}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Valider</button>
      <button type="button" onClick={onClose}>
        Annuler
      </button>
    </form>
  );
}

WorkshopForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
