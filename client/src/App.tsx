import React from "react";
import MainLayout from "./layouts/MainLayout";
import { useRoutes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./components/Spinner";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import InfiniteLoad from "./pages/InfiniteLoad";
import Tasks from "./pages/Tasks";
import Cats from "./pages/Cats";

const App: React.FC = () => {
  const router = useRoutes([
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
      path: "/tasks",
      element: <Tasks />,
    },
    {
      path: "/cats",
      element: <Cats />,
    },
    {
      path: "/products",
      element: <InfiniteLoad />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  return (
    <div className="App">
      {isFetching + isMutating !== 0 && <Spinner />}
      <ToastContainer />
      <MainLayout>{router}</MainLayout>
    </div>
  );
};

export default App;
