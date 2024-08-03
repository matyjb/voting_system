import {
  createBrowserRouter,
  createHashRouter,
  RouteObject,
} from "react-router-dom";
import { ProvideContestData } from "./logic/ProvideContestData";
import { ProvideContests } from "./logic/ProvideContests";
import RequireAuth from "./presentation/components/RequireAuth";
import ContestPage from "./presentation/pages/ContestPage";
import ContestsMenu from "./presentation/pages/ContestsMenu";
import EditContestPage from "./presentation/pages/EditContestPage";
import ErrorPage from "./presentation/pages/ErrorPage";
import LandingPage from "./presentation/pages/LandingPage";
import LoginPage from "./presentation/pages/LoginPage";
import { isGhPages } from "./constants";

const routes: RouteObject[] = [
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
];

let router = isGhPages ? createHashRouter(routes) : createBrowserRouter(routes);

const encodeContestUrl = (userId: string, contestId: string) => {
  // ! TODO: dynamic path with base url
  if (isGhPages)
    return `${window.location.origin}/voting_system/#${userId}/${contestId}`;
  return `${window.location.origin}/voting_system/${userId}/${contestId}`;
};

export { router, encodeContestUrl };
