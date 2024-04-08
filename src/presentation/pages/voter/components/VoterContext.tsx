import {
  FunctionComponent,
  createContext,
  useContext,
  useReducer,
} from "react";

export enum VoterActionType {
  VOTE_TEAM = "VOTE_TEAM",
  SELECT_TEAM = "SELECT_TEAM",
  DESELECT_TEAM = "DESELECT_TEAM",
}

type TTempScore = { teamId: string; categoryId: string; score: number };

interface VoteTeamAction {
  type: VoterActionType.VOTE_TEAM;
  payload: TTempScore;
}

interface SelectTeamAction {
  type: VoterActionType.SELECT_TEAM;
  payload: string;
}

interface DeselectTeamAction {
  type: VoterActionType.DESELECT_TEAM;
  payload: undefined;
}

type VoterAction = VoteTeamAction | SelectTeamAction | DeselectTeamAction;

interface TVoterState {
  voterTeamId?: string;
  scores: { [teamId: string]: { [categoryId: string]: number } };
}

const VoterContext = createContext<{
  state: TVoterState;
  dispatch: React.Dispatch<VoterAction>;
}>({ state: { scores: {} }, dispatch: () => {} });

export function useVoterState() {
  return useContext(VoterContext);
}

function voterReducer(state: TVoterState, action: VoterAction) {
  const { type, payload } = action;
  switch (type) {
    case VoterActionType.VOTE_TEAM:
      return {
        ...state,
        scores: {
          ...state.scores,
          [payload.teamId]: {
            ...state.scores[payload.teamId],
            [payload.categoryId]: payload.score,
          },
        },
      };
    case VoterActionType.SELECT_TEAM:
      return {
        ...state,
        voterTeamId: payload,
      };
    case VoterActionType.DESELECT_TEAM:
      return {
        ...state,
        voterTeamId: undefined,
      };
    default:
      return state;
  }
}

export const VoterStateProvider: FunctionComponent<{
  children: JSX.Element;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(voterReducer, { scores: {} });

  return (
    <VoterContext.Provider value={{ state, dispatch }}>
      {children}
    </VoterContext.Provider>
  );
};

export default VoterContext;
