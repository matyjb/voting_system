import React from "react";
import ReactDOM from "react-dom/client";
import LandingPage from "./pages/LandingPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import ContestsMenu from "./pages/ContestsMenu.tsx";
import EditContestPage from "./pages/EditContestPage.tsx";
import ContestPage from "./pages/ContestPage.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/edit",
    element: <ContestsMenu />,
    children: [
      {
        path: ":contestId",
        element: <EditContestPage />,
      },
    ],
  },
  {
    path: "/:orgId/:contestId",
    element: <ContestPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
