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
  categories?: TContestCategory[];
  submissions?: TContestSubmission[];
  voters?: TContestVoter[];
}>({});

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
  const [_categories, setCategories] = useState<
    TContestCategory[] | undefined
  >();
  const [_submissions, setSubmissions] = useState<
    TContestSubmission[] | undefined
  >();
  const [_voters, setVoters] = useState<TContestVoter[] | undefined>();
  const [_contest, setContest] = useState<TContest>();
  const { contests } = useContests();
  const { contest, submissions, categories, voters } = useContestData();

  useEffect(() => {
    // data already listened so use it instead
    if (contest && contest.fbref.path === contestRef.path) {
      setContest(contest);
      return;
    }

    if (contests) {
      let contest = contests.find(
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
  }, [contest, contests, contestRef.path]);

  useEffect(() => {
    if (noCategories) return;

    // data already listened so use it instead
    if (contest && contest.fbref.path === contestRef.path && categories) {
      setCategories(categories);
      return;
    }

    if (noCategories) {
      setCategories(undefined);
      return;
    }

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
  }, [contestRef.path, noCategories]);

  useEffect(() => {
    if (noSubmissions) return;
    // data already listened so use it instead
    if (contest && contest.fbref.path === contestRef.path && submissions) {
      setSubmissions(submissions);
      return;
    }

    if (noSubmissions) {
      setSubmissions(undefined);
      return;
    }

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
  }, [contestRef.path, noSubmissions]);

  useEffect(() => {
    if (noVoters) return;

    // data already listened so use it instead
    if (contest && contest.fbref.path === contestRef.path && voters) {
      setVoters(voters);
      return;
    }

    if (noVoters) {
      setVoters(undefined);
      return;
    }

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
  }, [contestRef.path, noVoters]);

  return (
    <ContestDataContext.Provider
      value={{
        contest: _contest,
        categories: _categories,
        submissions: _submissions,
        voters: _voters,
      }}
    >
      {children}
    </ContestDataContext.Provider>
  );
};

export default ContestDataContext;
