import {
  FunctionComponent,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  TContest,
  TContestCategory,
  TContestSubmission,
} from "../../data/types";
import { onSnapshot, collection } from "@firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

// TODO: provide categories, submissions, and votes (maybe) here also.
const ContestContext = createContext<{
  contest?: TContest;
  categories?: TContestCategory[];
  submissions?: TContestSubmission[];
}>({});

export function useContest() {
  return useContext(ContestContext);
}

interface ContestProviderProps {
  contest: TContest;
  children: JSX.Element;
}

export const ContestProvider: FunctionComponent<ContestProviderProps> = ({
  contest,
  children,
}) => {
  const [categories, setCategories] = useState<TContestCategory[]>([]);
  const [submissions, setSubmissions] = useState<TContestSubmission[]>([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) return;
    const unsubCategories = onSnapshot(
      collection(db, `${contest.fbref.path}/categories`),
      (docs) => {
        const docsData: TContestCategory[] = [];
        docs.forEach((doc) => {
          docsData.push({
            ...(doc.data() as TContestCategory),
            fbref: doc.ref,
          });
        });
        setCategories(docsData);
      }
    );
    const unsubSubmissions = onSnapshot(
      collection(db, `${contest.fbref.path}/submissions`),
      (docs) => {
        const docsData: TContestSubmission[] = [];
        docs.forEach((doc) => {
          docsData.push({
            ...(doc.data() as TContestSubmission),
            fbref: doc.ref,
          });
        });
        setSubmissions(docsData);
      }
    );

    return () => {
      unsubCategories();
      unsubSubmissions();
    };
  }, [user]);

  return (
    <ContestContext.Provider value={{ contest, categories, submissions }}>
      {children}
    </ContestContext.Provider>
  );
};

export default ContestContext;
