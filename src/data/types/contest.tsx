import { TContestPhase } from "./phase";
import { FbRef } from "./fbref";
import { DocumentData, DocumentReference } from "firebase/firestore";

export type TContest = {
  logoUrl?: string;
  name: string;
  phase: TContestPhase;
  onStageRef?: DocumentReference<DocumentData, DocumentData> | null;
} & FbRef;
