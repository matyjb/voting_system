import { FbRef } from "./fbref";

export type TContestSubmission = {
  gameTitle: string;
  logoUrl?: string;
  teamName: string;
} & FbRef;
