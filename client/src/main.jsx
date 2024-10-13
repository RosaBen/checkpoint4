import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { WorkshopProvider } from "./services/WorkshopContext";

import App from "./App";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import { getWorkshopByLevel, getWorkshops } from "./services/request";
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
        loader: ({ request }) => {
          const url = new URL(request.url);
          const level = url.searchParams.get("level");
          if (!level || level === "all") {
            return getWorkshops() || [];
          }
          return getWorkshopByLevel(level) || [];
        },
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <WorkshopProvider>
      <RouterProvider router={router} />
    </WorkshopProvider>
  </React.StrictMode>
);
