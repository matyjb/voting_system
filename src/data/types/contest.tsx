import { TContestPhase } from "./phase";
import { FbRef } from "./fbref";

export type TContest = {
  logoUrl?: string;
  name: string;
  phase: TContestPhase;
  onStage?: string;
} & FbRef;
