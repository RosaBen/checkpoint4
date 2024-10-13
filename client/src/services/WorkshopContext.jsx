import {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import {
  getWorkshops,
  addWorkshop,
  deleteWorkshop,
  editWorkshop,
} from "./request";

const WorkshopContext = createContext();

function WorkshopProvider({ children }) {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWorkshops = useCallback(async () => {
    try {
      const data = await getWorkshops();
      const formattedData = data.map((workshop) => ({
        ...workshop,
        workshopDate: new Date(workshop.workshopDate).toLocaleDateString(
          "fr-FR",
          {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        ),
      }));
      setWorkshops(formattedData);
    } catch (error) {
      console.error("Erreur lors de la récupération des ateliers:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorkshops();
  }, [fetchWorkshops]);

  const handleAddWorkshop = useCallback(
    async (newWorkshopData) => {
      try {
        await addWorkshop(newWorkshopData);
        await fetchWorkshops();
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'atelier:", error);
      }
    },
    [fetchWorkshops]
  );

  const handleUpdateWorkshop = useCallback(
    async (workshop) => {
      try {
        await editWorkshop(workshop);
        await fetchWorkshops();
      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'atelier:", error);
      }
    },
    [fetchWorkshops]
  );

  const handleDeleteWorkshop = useCallback(
    async (id) => {
      try {
        await deleteWorkshop(id);
        await fetchWorkshops(); // Récupérer les ateliers après suppression
      } catch (error) {
        console.error("Erreur sur la suppression du workshop:", error);
      }
    },
    [fetchWorkshops]
  );

  const value = useMemo(
    () => ({
      workshops,
      loading,
      handleAddWorkshop,
      handleDeleteWorkshop,
      handleUpdateWorkshop,
    }),
    [
      workshops,
      loading,
      handleAddWorkshop,
      handleDeleteWorkshop,
      handleUpdateWorkshop,
    ]
  );

  return (
    <WorkshopContext.Provider value={value}>
      {children}
    </WorkshopContext.Provider>
  );
}

WorkshopProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { WorkshopContext, WorkshopProvider };
