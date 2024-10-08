import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import { getStudents, getWorkshops} from "./services/request";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/booking",
        element: <Booking />,
        loader: async ({ request }) => {
          const url = new URL(request.url);
          const level = url.searchParams.get("level");
          const location = url.searchParams.get("location");
          const workshopDate = url.searchParams.get("workshopDate");
          const result = await getWorkshops(level, workshopDate, location);
          return result;
        },
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        loader: getStudents,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
