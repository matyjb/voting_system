import React from "react";
import ReactDOM from "react-dom/client";
import LandingPage from "./presentation/pages/LandingPage.tsx";
import ErrorPage from "./presentation/pages/ErrorPage.tsx";
import ContestsMenu from "./presentation/pages/ContestsMenu.tsx";
import EditContestPage from "./presentation/pages/EditContestPage.tsx";
import ContestPage from "./presentation/pages/ContestPage.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LoginPage from "./presentation/pages/LoginPage.tsx";
import RequireAuth from "./presentation/components/RequireAuth.tsx";
import { ConfigProvider, theme } from "antd";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/edit",
    element: (
      <RequireAuth>
        <ContestsMenu />
      </RequireAuth>
    ),
    children: [
      {
        path: ":contestId",
        element: (
          <RequireAuth>
            <EditContestPage />
          </RequireAuth>
        ),
      },
    ],
  },
  {
    path: "/:orgId/:contestId",
    element: (
      <RequireAuth>
        <ContestPage />
      </RequireAuth>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#d48806",
          colorBgBase: "#141414",
        },
        components: {
          Layout: {
            colorBgHeader: "#1f1f1f",
            siderBg: "#1f1f1f",
          },
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>
);
