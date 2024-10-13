import { useState, useContext } from "react";
import { WorkshopContext } from "../services/WorkshopContext";
import WorkshopForm from "../components/WorkshopForm";

import Add from "../assets/images/add.svg";
import Delete from "../assets/images/delete.svg";
import Edit from "../assets/images/edit.svg";

export default function Dashboard() {
  const { workshops, setWorkshops } = useContext(WorkshopContext);
  const [showForm, setShowForm] = useState(false);
  const [currentWorkshop, setCurrentWorkshop] = useState({});

  function handleAddWorkshop() {
    setCurrentWorkshop({});
    setShowForm(true);
  }

  function handleEditWorkshop(workshopToEdit) {
    setCurrentWorkshop(workshopToEdit);
    setShowForm(true);
  }

  function handleDeleteWorkshop(workshopToDelete) {
    const updatedWorkshops = workshops.filter(
      (w) => w.id !== workshopToDelete.id
    );
    setWorkshops(updatedWorkshops);
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <button type="button" onClick={handleAddWorkshop}>
        <img src={Add} alt="Ajouter un workshop" />
      </button>
      {showForm && (
        <WorkshopForm
          workshop={currentWorkshop}
          onClose={() => setShowForm(false)}
        />
      )}
      <ul>
        {workshops.map((workshop) => (
          <li key={workshop.id}>
            <p>{workshop.description}</p>
            <button type="button" onClick={() => handleEditWorkshop(workshop)}>
              <img src={Edit} alt="Modifier le workshop" />
            </button>
            <button
              type="button"
              onClick={() => handleDeleteWorkshop(workshop)}
            >
              <img src={Delete} alt="Supprimer le workshop" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
