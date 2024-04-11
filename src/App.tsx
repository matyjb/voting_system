import { ConfigProvider, theme } from "antd";
import { FunctionComponent } from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import RequireAuth from "./presentation/components/RequireAuth";
import ContestsMenu from "./presentation/pages/ContestsMenu";
import EditContestPage from "./presentation/pages/EditContestPage";
import ErrorPage from "./presentation/pages/ErrorPage";
import LandingPage from "./presentation/pages/LandingPage";
import LoginPage from "./presentation/pages/LoginPage";
import { useThemeMode } from "./logic/contexts/ThemeModeContext";
import { ProvideContestData } from "./logic/ProvideContestData";
import ContestPage from "./presentation/pages/ContestPage";
import { ProvideContests } from "./logic/ProvideContests";

const router = createHashRouter([
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
        <ProvideContests>
          <ContestsMenu />
        </ProvideContests>
      </RequireAuth>
    ),
    children: [
      {
        path: ":contestId",
        element: (
          <ProvideContestData>
            <EditContestPage />
          </ProvideContestData>
        ),
      },
    ],
  },
  {
    path: "/:userId/:contestId",
    element: (
      <RequireAuth>
        <ProvideContestData noVoters noSubmissions noCategories>
          <ContestPage />
        </ProvideContestData>
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
            triggerBg: mode === "dark" ? "#1f1f1f" : "#fafafa",
            triggerColor: mode === "dark" ? "#fafafa" : "#1f1f1f",
          },
          Menu: {
            itemBg: mode === "dark" ? "#1f1f1f" : "#fafafa",
          },
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};

export default App;
