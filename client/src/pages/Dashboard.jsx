import { useLoaderData } from "react-router-dom";

export default function Dashboard() {
  const workshopData = useLoaderData();
  console.info("workshop", workshopData);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
