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
import { TContestVoter } from "../../data/types/vote";

const ContestContext = createContext<{
  contest?: TContest;
  categories?: TContestCategory[];
  submissions?: TContestSubmission[];
  voters?: TContestVoter[];
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
  const [voters, setVoters] = useState<TContestVoter[]>([]);
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
    const unsubVoters = onSnapshot(
      collection(db, `${contest.fbref.path}/voters`),
      (docs) => {
        const docsData: TContestVoter[] = [];
        docs.forEach((doc) => {
          docsData.push({
            ...(doc.data() as TContestVoter),
            fbref: doc.ref,
          });
        });
        setVoters(docsData);
      }
    );

    return () => {
      unsubCategories();
      unsubSubmissions();
      unsubVoters();
    };
  }, [user]);

  return (
    <ContestContext.Provider
      value={{ contest, categories, submissions, voters }}
    >
      {children}
    </ContestContext.Provider>
  );
};

export default ContestContext;
