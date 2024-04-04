import {
  FunctionComponent,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { TContest, TDocRef } from "../../data/types";
import { onSnapshot, collection } from "@firebase/firestore";
import { db } from "../firebase";

const ContestsContext = createContext<{
  contests: TContest[];
}>({ contests: [] });

export function useContests() {
  return useContext(ContestsContext);
}

interface ContestsProviderProps {
  userRef: TDocRef;
  children: JSX.Element;
}

export const ContestsProvider: FunctionComponent<ContestsProviderProps> = ({
  userRef,
  children,
}) => {
  const [contests, setContests] = useState<TContest[]>([]);

  useEffect(() => {
    const unsubContests = onSnapshot(
      collection(db, `${userRef.path}/contests`),
      (docs) => {
        const docsData: TContest[] = [];
        docs.forEach((doc) => {
          docsData.push({
            ...(doc.data() as TContest),
            fbref: doc.ref,
          });
        });
        setContests(docsData);
      },
      (err) => {
        console.error(err);
      }
    );

    return () => {
      unsubContests();
    };
  }, [userRef]);

  return (
    <ContestsContext.Provider value={{ contests }}>
      {children}
    </ContestsContext.Provider>
  );
};

export default ContestsContext;
