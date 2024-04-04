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
  TDocRef,
} from "../../data/types";
import { onSnapshot, collection } from "@firebase/firestore";
import { db } from "../firebase";
import { TContestVoter } from "../../data/types/vote";
import { useContests } from "./ContestsContext";

const ContestDataContext = createContext<{
  contest?: TContest;
  categories: TContestCategory[];
  submissions: TContestSubmission[];
  voters: TContestVoter[];
}>({ categories: [], submissions: [], voters: [] });

export function useContestData() {
  return useContext(ContestDataContext);
}

export interface ContestDataProviderConfig {
  noCategories?: boolean;
  noSubmissions?: boolean;
  noVoters?: boolean;
}
type ContestDataProviderProps = {
  contestRef: TDocRef;
  children: JSX.Element;
} & ContestDataProviderConfig;

export const ContestDataProvider: FunctionComponent<
  ContestDataProviderProps
> = ({ contestRef, noCategories, noSubmissions, noVoters, children }) => {
  const [categories, setCategories] = useState<TContestCategory[]>([]);
  const [submissions, setSubmissions] = useState<TContestSubmission[]>([]);
  const [voters, setVoters] = useState<TContestVoter[]>([]);
  const [contest, setContest] = useState<TContest>();
  const { contests } = useContests();

  useEffect(() => {
    // data already listened so use it instead
    if (contests) {
      const contest = contests.find(
        (contest) => contest.fbref.path === contestRef.path
      );
      if (contest) {
        setContest(contest);
        return;
      }
    }

    const unsubContest = onSnapshot(
      contestRef,
      (doc) => {
        setContest({
          ...(doc.data() as TContest),
          fbref: doc.ref,
        });
      },
      (err) => {
        console.error(err);
      }
    );
    return () => {
      unsubContest();
    };
  }, [contestRef]);

  useEffect(() => {
    if (noCategories) return;

    const unsubCategories = onSnapshot(
      collection(db, `${contestRef.path}/categories`),
      (docs) => {
        const docsData: TContestCategory[] = [];
        docs.forEach((doc) => {
          docsData.push({
            ...(doc.data() as TContestCategory),
            fbref: doc.ref,
          });
        });
        setCategories(docsData);
      },
      (err) => {
        console.error(err);
      }
    );
    return () => {
      unsubCategories();
    };
  }, [contestRef, noCategories]);

  useEffect(() => {
    if (noSubmissions) return;

    const unsubSubmissions = onSnapshot(
      collection(db, `${contestRef.path}/submissions`),
      (docs) => {
        const docsData: TContestSubmission[] = [];
        docs.forEach((doc) => {
          docsData.push({
            ...(doc.data() as TContestSubmission),
            fbref: doc.ref,
          });
        });
        setSubmissions(docsData);
      },
      (err) => {
        console.error(err);
      }
    );
    return () => {
      unsubSubmissions();
    };
  }, [contestRef, noSubmissions]);

  useEffect(() => {
    if (noVoters) return;

    const unsubVoters = onSnapshot(
      collection(db, `${contestRef.path}/voters`),
      (docs) => {
        const docsData: TContestVoter[] = [];
        docs.forEach((doc) => {
          docsData.push({
            ...(doc.data() as TContestVoter),
            fbref: doc.ref,
          });
        });
        setVoters(docsData);
      },
      (err) => {
        console.error(err);
      }
    );
    return () => {
      unsubVoters();
    };
  }, [contestRef, noVoters]);

  return (
    <ContestDataContext.Provider
      value={{ contest, categories, submissions, voters }}
    >
      {children}
    </ContestDataContext.Provider>
  );
};

export default ContestDataContext;
