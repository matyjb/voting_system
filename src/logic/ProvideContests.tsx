import { FunctionComponent } from "react";
import { useParams } from "react-router";
import { ContestsProvider } from "./contexts/ContestsContext";
import { auth, db } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc } from "@firebase/firestore";

export const ProvideContests: FunctionComponent<{ children: JSX.Element }> = ({
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
