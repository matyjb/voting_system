import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  User,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  setDoc,
  doc,
  addDoc,
  collection,
  deleteDoc,
  DocumentData,
  DocumentReference,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import {
  TContest,
  TContestCategory,
  TContestSubmission,
  TScore,
} from "../data/types";
import { TContestVoter } from "../data/types/vote";
import { FbRef } from "../data/types/fbref";

const firebaseConfig = {
  apiKey: "AIzaSyCWuI7P5Qi4oNmAGzTctcJMOwL8wksab6c",
  authDomain: "polyvote-f5b73.firebaseapp.com",
  projectId: "polyvote-f5b73",
  storageBucket: "polyvote-f5b73.appspot.com",
  messagingSenderId: "476090453642",
  appId: "1:476090453642:web:e91485166b60f0486e2773",
  measurementId: "G-ELNLHGX80D",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: user.displayName,
      authProvider: "google",
      email: user.email,
    });
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

//* CONTESTS
const addContest = async (user: User, name: string) => {
  console.log("addContest", user, name);
  await addDoc(collection(db, `users/${user.uid}/contests`), {
    name,
    phase: "CLOSED",
  } as TContest);
};

const editContest = async (contest: Partial<TContest> & FbRef) => {
  console.log("editContest", contest);
  let { fbref, ...c } = contest;
  await updateDoc(contest.fbref, c);
};

const removeContest = async (contest: TContest) => {
  console.log("removeContest", contest);
  await deleteDoc(contest.fbref);
};

//* CATEGORIES
const addCategory = async (contest: TContest, name: string) => {
  console.log("addCategory", contest, name);
  await addDoc(collection(db, `${contest.fbref.path}/categories`), { name });
};

const editCategory = async (category: Partial<TContestCategory> & FbRef) => {
  console.log("editCategory", category);
  let { fbref, ...c } = category;
  await updateDoc(category.fbref, c);
};

const removeCategory = async (category: TContestCategory) => {
  console.log("removeCategory", category);
  await deleteDoc(category.fbref);
};

//* SUBMISSIONS
const addSubmission = async (
  contest: TContest,
  gameTitle: string,
  teamName: string,
  logoUrl?: string
) => {
  console.log("addSubmission", contest, gameTitle, teamName, logoUrl);
  await addDoc(collection(db, `${contest.fbref.path}/submissions`), {
    gameTitle,
    teamName,
    logoUrl,
  } as TContestSubmission);
};

const editSubmission = async (
  submission: Partial<TContestSubmission> & FbRef
) => {
  console.log("editSubmission", submission);
  let { fbref, ...s } = submission;
  await updateDoc(submission.fbref, s);
};

const removeSubmission = async (submission: TContestSubmission) => {
  console.log("removeSubmission", submission);
  await deleteDoc(submission.fbref);
};

//* VOTES
async function addVoter(
  contest: TContest,
  scores: TScore[],
  voterTeamRef?: DocumentReference<DocumentData, DocumentData>
) {
  console.log("addVoter", contest, scores, voterTeamRef);
  await addDoc(collection(db, `${contest.fbref.path}/voters`), {
    scores,
    voterTeamRef,
    timestamp: serverTimestamp(),
  } as TContestVoter);
}

const removeVoter = async (voter: TContestVoter) => {
  console.log("removeVoter", voter);
  await deleteDoc(voter.fbref);
};

export {
  auth,
  db,
  signInWithGoogle,
  logout,
  addCategory,
  editCategory,
  removeCategory,
  addContest,
  editContest,
  removeContest,
  addSubmission,
  editSubmission,
  removeSubmission,
  addVoter,
  removeVoter,
};
