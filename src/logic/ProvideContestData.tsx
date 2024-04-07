import { FunctionComponent } from "react";
import { useParams } from "react-router";
import { auth, db } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc } from "@firebase/firestore";
import {
  ContestDataProvider,
  ContestDataProviderConfig,
} from "./contexts/ContestDataContext";

export const ProvideContestData: FunctionComponent<
  { children: JSX.Element } & ContestDataProviderConfig
> = (props) => {
  const { userId, contestId } = useParams();
  const [user] = useAuthState(auth);

  const userIdd = userId || user?.uid;

  const contestRef = doc(db, `users/${userIdd}/contests/${contestId}`);

  return <ContestDataProvider {...props} contestRef={contestRef} />;
};
