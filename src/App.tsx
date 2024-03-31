import { ConfigProvider, theme } from "antd";
import { FunctionComponent } from "react";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import RequireAuth from "./presentation/components/RequireAuth";
import ContestPage from "./presentation/pages/ContestPage";
import ContestsMenu from "./presentation/pages/ContestsMenu";
import EditContestPage from "./presentation/pages/EditContestPage";
import ErrorPage from "./presentation/pages/ErrorPage";
import LandingPage from "./presentation/pages/LandingPage";
import LoginPage from "./presentation/pages/LoginPage";
import { useThemeMode } from "./logic/contexts/ThemeModeContext";

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

const App: FunctionComponent = () => {
  const { mode } = useThemeMode();
  return (
    <ConfigProvider
      theme={{
        algorithm:
          mode === "light" ? theme.defaultAlgorithm : theme.darkAlgorithm,
        token: {
          colorPrimary: "#d48806",
          colorBgBase:
            mode === "dark" ? "#141414" : theme.defaultSeed.colorBgBase,
        },
        components: {
          Layout: {
            headerBg: mode === "dark" ? "#1f1f1f" : "#fafafa",
            siderBg: mode === "dark" ? "#1f1f1f" : "#fafafa",
          },
          Menu: {
            colorItemBg: mode === "dark" ? "#1f1f1f" : "#fafafa",
          },
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};

export default App;
