import PropTypes from "prop-types";

export default function InstructorCard({ instructor }) {
  const instructorPhoto = `${import.meta.env.VITE_API_PHOTO_INSTRUCTOR}/${instructor.photo}`;

  return (
    <div className="cardInstructor">
      <img src={instructorPhoto} alt={instructor.firstName} />
      <div className="containerInstructor">
        <h4>
          {instructor.firstName} {instructor.lastName}
        </h4>
        <p>{instructor.email}</p>
        <p>{instructor.phone}</p>
        <p>{instructor.description}</p>
      </div>
    </div>
  );
}

InstructorCard.propTypes = {
  instructor: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
  }).isRequired,
};
