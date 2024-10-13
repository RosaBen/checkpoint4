import { createContext, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { getWorkshops } from "./request";

const WorkshopContext = createContext();

function WorkshopProvider({ children }) {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWorkshops() {
      try {
        const data = await getWorkshops();
        setWorkshops(data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
    fetchWorkshops();
  }, []);

  const value = useMemo(
    () => ({ workshops, setWorkshops, loading }),
    [workshops, loading]
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
