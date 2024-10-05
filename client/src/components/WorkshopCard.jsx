import PropTypes from "prop-types";

export default function WorkshopCard({ workshop }) {
  return (
    <div>
      <h2>{workshop.workshopDate}</h2>
      <p>{workshop.duration}</p>
      <p>{workshop.workshopTime}</p>
      <p>{workshop.description}</p>
      <p>{workshop.level}</p>
      <p>{workshop.locationId}</p>
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
