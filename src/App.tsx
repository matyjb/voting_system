import { ConfigProvider, theme } from "antd";
import { FunctionComponent } from "react";
import { RouterProvider, useParams } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import RequireAuth from "./presentation/components/RequireAuth";
import ContestPage from "./presentation/pages/ContestPage";
import ContestsMenu from "./presentation/pages/ContestsMenu";
import EditContestPage from "./presentation/pages/EditContestPage";
import ErrorPage from "./presentation/pages/ErrorPage";
import LandingPage from "./presentation/pages/LandingPage";
import LoginPage from "./presentation/pages/LoginPage";
import { useThemeMode } from "./logic/contexts/ThemeModeContext";
import { ContestsProvider } from "./logic/contexts/ContestsContext";
import { auth, db } from "./logic/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc } from "@firebase/firestore";
import {
  ContestDataProvider,
  ContestDataProviderConfig,
} from "./logic/contexts/ContestDataContext";

const ProvideContests: FunctionComponent<{ children: JSX.Element }> = ({
  children,
}) => {
  const { userId } = useParams();
  const [user] = useAuthState(auth);

  return (
    <ContestsProvider
      userRef={
        userId ? doc(db, `users/${userId}`) : doc(db, `users/${user?.uid}`)
      }
    >
      {children}
    </ContestsProvider>
  );
};

const ProvideContestData: FunctionComponent<
  { children: JSX.Element } & ContestDataProviderConfig
> = (props) => {
  const { userId, contestId } = useParams();
  const [user] = useAuthState(auth);

  const userIdd = userId || user?.uid;

  const contestRef = doc(db, `users/${userIdd}/contests/${contestId}`);

  return <ContestDataProvider {...props} contestRef={contestRef} />;
};

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
        <ProvideContestData noSubmissions noVoters>
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
