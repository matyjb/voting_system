import {
  DocumentData,
  DocumentReference,
  Timestamp,
} from "@firebase/firestore";
import { FbRef } from "./fbref";

export type TContestVoter = {
  timestamp: Timestamp;
  voterTeamRef?: DocumentReference<DocumentData, DocumentData>;
  scores: TScore[];
} & FbRef;

export type TScore = {
  score: number;
  submissionRef: DocumentReference<DocumentData, DocumentData>;
  categoryRef: DocumentReference<DocumentData, DocumentData>;
};
