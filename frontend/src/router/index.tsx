import { createBrowserRouter } from "react-router-dom";
import Feed from "../pages/Feed";
import Upload from "../pages/Upload";
import Profile from "../pages/Profile";
import Post from "../pages/Post";
import ProtectedRoutes from "../components/ProtectedRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <Feed />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/upload",
    element: (
      <ProtectedRoutes>
        <Upload />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/profile/:id",
    element: <Profile />,
  },
  {
    path: "/post/:id",
    element: <Post />,
  },
  {
    path: "*",
    element: <div>404</div>,
  },
]);

export default router;
