import { FunctionComponent, createContext, useContext } from "react";
import { TContest } from "../../data/types";

// TODO: provide categories, submissions, and votes (maybe) here also.
const ContestContext = createContext<{ contest?: TContest }>({});

export function useContest() {
  return useContext(ContestContext);
}

interface ContestProviderProps {
  contest?: TContest;
  children: JSX.Element;
}

export const ContestProvider: FunctionComponent<ContestProviderProps> = (
  props
) => {
  return (
    <ContestContext.Provider value={{ contest: props.contest }}>
      {props.children}
    </ContestContext.Provider>
  );
};

export default ContestContext;
