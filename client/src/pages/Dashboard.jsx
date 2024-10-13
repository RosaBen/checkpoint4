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
  const [editWorkshop, setEditWorkshop] = useState(null);
  const [workshopData, setWorkshopData] = useState({});
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);

  const handleAdd = () => {
    setShowForm(true);
    setSelectedWorkshop(null);
  };

  const handleEdit = (workshop) => {
    setEditWorkshop(workshop.id);
    setWorkshopData({
      workshopDate: workshop.workshopDate,
      workshopTime: workshop.workshopTime,
      duration: workshop.duration,
      level: workshop.level,
      locationId: workshop.locationId,
    });
  };

  const handleSave = (id) => {
    const updatedWorkshop = {
      ...workshopData,
      id,
      workshopDate: new Date(workshopData.workshopDate)
        .toISOString()
        .split("T")[0],
    };
    handleUpdateWorkshop(updatedWorkshop);
    setEditWorkshop(null);
    setWorkshopData({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorkshopData({
      ...workshopData,
      [name]: value,
    });
  };

  const handleClose = () => {
    setShowForm(false);
    setEditWorkshop(null);
    setSelectedWorkshop(null);
    setWorkshopData({});
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
                      name="workshopDate"
                      value={workshopData.workshopDate}
                      onChange={handleInputChange}
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
                      name="workshopTime"
                      value={workshopData.workshopTime}
                      onChange={handleInputChange}
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
                      name="duration"
                      value={workshopData.duration}
                      onChange={handleInputChange}
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
                      name="level"
                      value={workshopData.level}
                      onChange={handleInputChange}
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
                      name="locationId"
                      value={workshopData.locationId}
                      aria-label="Lieu"
                      onChange={handleInputChange}
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
                      onClick={() => handleEdit(workshop)}
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
              <div className="cardTitle">Workshop: {workshop.id}</div>
              <div className="cardContent">
                {editWorkshop === workshop.id ? (
                  <input
                    id={`date-${workshop.id}`}
                    type="date"
                    name="workshopDate"
                    value={workshopData.workshopDate}
                    aria-label="Date"
                    onChange={handleInputChange}
                  />
                ) : (
                  <span>Date: {workshop.workshopDate}</span>
                )}
              </div>
              <div className="cardContent">
                {editWorkshop === workshop.id ? (
                  <input
                    id={`time-${workshop.id}`}
                    type="time"
                    name="workshopTime"
                    value={workshopData.workshopTime}
                    aria-label="Heure"
                    onChange={handleInputChange}
                  />
                ) : (
                  <span>Heure: {workshop.workshopTime}</span>
                )}
              </div>
              <div className="cardContent">
                {editWorkshop === workshop.id ? (
                  <input
                    id={`duration-${workshop.id}`}
                    type="number"
                    name="duration"
                    value={workshopData.duration}
                    aria-label="Durée"
                    onChange={handleInputChange}
                  />
                ) : (
                  <span>Durée: {workshop.duration}</span>
                )}
              </div>
              <div className="cardContent">
                {editWorkshop === workshop.id ? (
                  <select
                    id={`level-${workshop.id}`}
                    value={workshopData.level}
                    aria-label="Niveau"
                    name="level"
                    onChange={handleInputChange}
                  >
                    <option value="Débutant">Débutant</option>
                    <option value="Intermédiaire">Intermédiaire</option>
                    <option value="Avancé">Avancé</option>
                  </select>
                ) : (
                  <span>Niveau: {workshop.level}</span>
                )}
              </div>
              <div className="cardContent">
                {editWorkshop === workshop.id ? (
                  <input
                    id={`location-${workshop.id}`}
                    type="number"
                    value={workshopData.locationId}
                    aria-label="Lieu"
                    name="locationId"
                    onChange={handleInputChange}
                  />
                ) : (
                  <span>Lieu: {workshop.locationId}</span>
                )}
              </div>
              <div className="cardActions">
                {editWorkshop === workshop.id ? (
                  <button type="button" onClick={() => handleSave(workshop.id)}>
                    <img src={Valide} alt="Valider" />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btnIcon"
                    onClick={() => handleEdit(workshop)}
                  >
                    <img src={Edit} alt="Modifier" />
                  </button>
                )}
                <button
                  type="button"
                  className="btnIcon"
                  onClick={() => handleDeleteWorkshop(workshop.id)}
                >
                  <img src={Trash} alt="Supprimer" />
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
