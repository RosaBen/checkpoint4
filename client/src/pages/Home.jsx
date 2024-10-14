import { useLoaderData } from "react-router-dom";

import InstructorCard from "../components/InstructorCard";

export default function Home() {
  const instructors = useLoaderData();

  return (
    <div className="container">
      <h1>Instructors</h1>
      <div className="row">
        {instructors.map((instructor) => (
          <InstructorCard key={instructor.id} instructor={instructor} />
        ))}
      </div>
    </div>
  );
}
