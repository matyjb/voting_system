import { DocumentData, DocumentReference } from "@firebase/firestore";

export type FbRef = {
  fbref: DocumentReference<DocumentData, DocumentData>;
};
