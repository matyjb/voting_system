import { Timestamp } from "@firebase/firestore";
import { FbRef } from "./fbref";
import { TDocRef } from ".";

export type TContestVoter = {
  timestamp: Timestamp;
  voterTeamRef?: TDocRef;
  scores: TScore[];
} & FbRef;

export type TScore = {
  score: number;
  submissionRef: TDocRef;
  categoryRef: TDocRef;
};

export type TResultType = "avg";
