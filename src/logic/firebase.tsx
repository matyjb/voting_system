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
} from "firebase/firestore";
import {
  TContest,
  TContestCategory,
  TContestSubmission,
  TScore,
  TVote,
} from "../data/types";

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
  await addDoc(collection(db, `users/${user.uid}/contests`), {
    name,
    phase: "CLOSED",
  } as TContest);
};

const editContest = async (contest: TContest) => {
  await setDoc(contest.fbref, { ...contest, fbref: undefined });
};

const removeContest = async (contest: TContest) => {
  await deleteDoc(contest.fbref);
};

//* CATEGORIES
const addCategory = async (contest: TContest, name: string) => {
  await addDoc(collection(db, `${contest.fbref.path}/categories`), { name });
};

const editCategory = async (category: TContestCategory) => {
  await setDoc(category.fbref, { ...category, fbref: undefined });
};

const removeCategory = async (category: TContestCategory) => {
  await deleteDoc(category.fbref);
};

//* SUBMISSIONS
const addSubmission = async (
  contest: TContest,
  gameTitle: string,
  teamName: string,
  logoUrl?: string
) => {
  await addDoc(collection(db, `${contest.fbref.path}/submissions`), {
    gameTitle,
    teamName,
    logoUrl,
  } as TContestSubmission);
};

const editSubmission = async (submission: TContestSubmission) => {
  await setDoc(submission.fbref, { ...submission, fbref: undefined });
};

const removeSubmission = async (submission: TContestSubmission) => {
  await deleteDoc(submission.fbref);
};

//* VOTES
async function addVote(
  contest: TContest,
  scores: TScore[],
  voterTeamRef?: DocumentReference<DocumentData, DocumentData>
) {
  await addDoc(collection(db, `${contest.fbref.path}/votes`), {
    scores,
    voterTeamRef,
    timestamp: serverTimestamp(),
  } as TVote);
}

const removeVote = async (
  contest: TContest,
  category: TContestCategory,
  submission: TContestSubmission,
  user: User
) => {
  await deleteDoc(
    doc(
      db,
      `${contest.fbref.path}/categories/${category.fbref.id}/submissions/${submission.fbref.id}/votes/${user.uid}`
    )
  );
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
  addVote,
  removeVote,
};
