import { useContext, usestate, useEffect } from "react";
import PropTypes from "prop-types";
import { WorkshopContext } from "../services/WorkshopContext";
import { addWorkshop, editWorkshop } from "../services/request";
import dateTimeFormat from "../services/dateTimeFormat";

export default function WorkshopForm({ workshop, onClose }) {
  const { setWorkshops } = useContext(WorkshopContext);
  const [formData, setFormData] = usestate({
    workshopDate: "",
    workshopTime: "",
    duration: "",
    level: "",
  });

  useEffect(() => {
    setFormData({
      workshopDate: dateTimeFormat(workshop.workshopDate),
      workshopTime: dateTimeFormat(workshop.workshopTime),
      duration: workshop.duration,
      level: workshop.level,
    });
  }, [workshop, setFormData]);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  WorkshopForm.propTypes = {
    workshop: PropTypes.shape({
      id: PropTypes.number,
      workshopDate: PropTypes.string,
      workshopTime: PropTypes.string,
      duration: PropTypes.string,
      level: PropTypes.string,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDate = `${formData.workshopDate}T${formData.workshopTime}`;

    const formattedWorkshop = {
      ...formData,
      workshopDate: formattedDate,
      workshopTime: formattedDate,
    };

    try {
      if (workshop.id) {
        const updatedWorkshop = await editWorkshop(
          workshop.id,
          formattedWorkshop
        );
        setWorkshops((prevWorkshops) =>
          prevWorkshops.map((w) =>
            w.id === updatedWorkshop.id ? updatedWorkshop : w
          )
        );
      } else {
        const newWorkshop = await addWorkshop(formattedWorkshop);
        setWorkshops((prevWorkshops) => [...prevWorkshops, newWorkshop]);
      }

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="workshopDate">Date</label>
      <input
        type="date"
        id="workshopDate"
        name="workshopDate"
        value={formData.workshopDate}
        onChange={handleChange}
      />
      <label htmlFor="workshopTime">Heure</label>
      <input
        type="time"
        id="workshopTime"
        name="workshopTime"
        value={formData.workshopTime}
        onChange={handleChange}
      />
      <label htmlFor="duration">Durée</label>
      <input
        type="number"
        id="duration"
        name="duration"
        value={formData.duration}
        onChange={handleChange}
      />
      <label htmlFor="level">Niveau</label>
      <select
        id="level"
        name="level"
        value={formData.level}
        onChange={handleChange}
      >
        <option value="débutant">Débutant</option>
        <option value="intermédiaire">Intermédiaire</option>
        <option value="avancé">Avancé</option>
      </select>
      <button type="submit">Enregistrer</button>
      <button type="button" onClick={onClose}>
        Annuler
      </button>
    </form>
  );
}
