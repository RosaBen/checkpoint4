import { useContext, useState } from "react";
import { WorkshopContext } from "../services/WorkshopContext";
import WorkshopForm from "../components/WorkshopForm";

import Trash from "../assets/images/delete.svg";
import Edit from "../assets/images/edit.svg";
import Valide from "../assets/images/valide.svg";
import Add from "../assets/images/add.svg";

export default function Dashboard() {
  const {
    workshops,
    loading,
    handleAddWorkshop,
    handleDeleteWorkshop,
    handleUpdateWorkshop,
  } = useContext(WorkshopContext);

  const [showForm, setShowForm] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [editWorkshop, setEditWorkshop] = useState(null);

  const handleAdd = () => {
    setSelectedWorkshop(null);
    setShowForm(true);
  };

  const handleEdit = (id) => {
    setEditWorkshop(id);
  };

  const handleSave = (id) => {
    const updatedWorkshop = {
      id,
      workshopDate: document.getElementById(`date-${id}`).value,
      workshopTime: document.getElementById(`time-${id}`).value,
      duration: document.getElementById(`duration-${id}`).value,
      level: document.getElementById(`level-${id}`).value,
      locationId: document.getElementById(`location-${id}`).value,
    };
    handleUpdateWorkshop(updatedWorkshop);
    setEditWorkshop(null);
  };

  const handleClose = () => {
    setShowForm(false);
    setSelectedWorkshop(null);
    setEditWorkshop(null);
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h1>Tableau de Bord</h1>

      <div className="buttonContainer">
        <button type="button" onClick={handleAdd} className="btnDashboard">
          <img src={Add} alt="Ajouter" />
        </button>
      </div>
      <div className="containerDashboard">
        <table className="tableDashboard">
          <thead className="theadDashboard">
            <tr className="trDashboard">
              <th className="thId">ID</th>
              <th className="thDate">Date</th>
              <th className="thHour">Heure</th>
              <th className="thDuration">Durée</th>
              <th className="thLevel">Niveau</th>
              <th className="thLocation">Lieu</th>
              <th className="thDelete">Supprimer</th>
              <th className="thEdit">Modifier</th>
            </tr>
          </thead>
          <tbody>
            {workshops.map((workshop) => (
              <tr key={workshop.id}>
                <td>{workshop.id}</td>
                <td>
                  {editWorkshop === workshop.id ? (
                    <input
                      id={`date-${workshop.id}`}
                      type="date"
                      defaultValue={workshop.workshopDate}
                      aria-label="Date"
                    />
                  ) : (
                    workshop.workshopDate
                  )}
                </td>
                <td>
                  {editWorkshop === workshop.id ? (
                    <input
                      id={`time-${workshop.id}`}
                      type="time"
                      defaultValue={workshop.workshopTime}
                      aria-label="Heure"
                    />
                  ) : (
                    workshop.workshopTime
                  )}
                </td>
                <td>
                  {editWorkshop === workshop.id ? (
                    <input
                      id={`duration-${workshop.id}`}
                      type="number"
                      defaultValue={workshop.duration}
                      aria-label="Durée"
                    />
                  ) : (
                    workshop.duration
                  )}
                </td>
                <td>
                  {editWorkshop === workshop.id ? (
                    <select
                      id={`level-${workshop.id}`}
                      defaultValue={workshop.level}
                    >
                      <option value="Débutant">Débutant</option>
                      <option value="Intermédiaire">Intermédiaire</option>
                      <option value="Avancé">Avancé</option>
                    </select>
                  ) : (
                    workshop.level
                  )}
                </td>
                <td>
                  {editWorkshop === workshop.id ? (
                    <input
                      id={`location-${workshop.id}`}
                      type="number"
                      defaultValue={workshop.locationId}
                      aria-label="Lieu"
                    />
                  ) : (
                    workshop.locationId
                  )}
                </td>
                <td>
                  <button
                    type="button"
                    className="btnIcon"
                    onClick={() => handleDeleteWorkshop(workshop.id)}
                  >
                    <img src={Trash} alt="Supprimer" />
                  </button>
                </td>
                <td>
                  {editWorkshop === workshop.id ? (
                    <button
                      type="button"
                      className="btnIcon"
                      onClick={() => handleSave(workshop.id)}
                    >
                      <img src={Valide} alt="Valider" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btnIcon"
                      onClick={() => handleEdit(workshop.id)}
                    >
                      <img src={Edit} alt="Modifier" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="cardsDashboard">
          {workshops.map((workshop) => (
            <div className="cardDashboard" key={workshop.id}>
              <div className="cardTitle">Atelier ID: {workshop.id}</div>
              <div className="cardContent">Date: {workshop.workshopDate}</div>
              <div className="cardContent">Heure: {workshop.workshopTime}</div>
              <div className="cardContent">Durée: {workshop.duration}</div>
              <div className="cardContent">Niveau: {workshop.level}</div>
              <div className="cardContent">Lieu: {workshop.locationId}</div>
              <div className="cardActions">
                <button
                  type="button"
                  className="btnIcon"
                  onClick={() => handleDeleteWorkshop(workshop.id)}
                >
                  <img src={Trash} alt="Supprimer" />
                </button>
                <button
                  type="button"
                  className="btnIcon"
                  onClick={() => handleEdit(workshop.id)}
                >
                  <img src={Edit} alt="Modifier" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showForm && (
        <WorkshopForm
          workshop={selectedWorkshop || {}}
          onClose={handleClose}
          onSubmit={handleAddWorkshop}
        />
      )}
    </div>
  );
}
