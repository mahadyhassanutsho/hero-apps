import { createBrowserRouter } from "react-router";
import App from "../layouts/App";
import Home from "../pages/Home";
import AllAppsPage from "../pages/AllAppsPage";
import LoadingPage from "../ui/LoadingPage";
import AppDetails from "../pages/AppDetails";
import MyInstallation from "../pages/MyInstallation";
import ErrorPage from "../ui/Error404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <LoadingPage />,
    children: [
      {
        path: "",
        element: <Home />,
        loader: () => fetch("http://localhost:8000/apps"),
      },
      {
        path: "/apps",
        element: <AllAppsPage />,
      },
      {
        path: "/apps/:id",
        element: <AppDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:8000/apps/${params.id}`),
      },
      {
        path: "/installations",
        element: <MyInstallation />,
        loader: () => fetch("http://localhost:8000/apps"),
      },
    ],
  },
]);

export default router;
