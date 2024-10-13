import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { WorkshopProvider } from "./services/WorkshopContext";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

import App from "./App";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
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
