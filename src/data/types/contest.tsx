import { TContestPhase } from "./phase";
import { FbRef } from "./fbref";
import { TDocRef } from ".";

export type TContest = {
  logoUrl?: string;
  name: string;
  phase: TContestPhase;
  onStageRef?: TDocRef | null;
} & FbRef;
