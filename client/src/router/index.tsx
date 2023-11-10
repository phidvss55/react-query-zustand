import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import Students from "../pages/Students";
import AddStudent from "../pages/AddStudent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/students",
    element: <Students />,
  },
  {
    path: "/students/:id",
    element: <AddStudent />,
  },
  {
    path: "/students/add",
    element: <AddStudent />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
