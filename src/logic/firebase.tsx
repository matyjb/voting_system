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
  console.log("addContest", user, name);
  await addDoc(collection(db, `users/${user.uid}/contests`), {
    name,
    phase: "CLOSED",
  } as TContest);
};

const editContest = async (contest: TContest) => {
  console.log("editContest", contest);
  let { fbref, ...c } = contest;
  await setDoc(contest.fbref, c);
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

const editCategory = async (category: TContestCategory) => {
  console.log("editCategory", category);
  let { fbref, ...c } = category;
  await setDoc(category.fbref, c);
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

const editSubmission = async (submission: TContestSubmission) => {
  console.log("editSubmission", submission);
  let { fbref, ...s } = submission;
  await setDoc(submission.fbref, s);
};

const removeSubmission = async (submission: TContestSubmission) => {
  console.log("removeSubmission", submission);
  await deleteDoc(submission.fbref);
};

//* VOTES
async function addVote(
  contest: TContest,
  scores: TScore[],
  voterTeamRef?: DocumentReference<DocumentData, DocumentData>
) {
  console.log("addVote", contest, scores, voterTeamRef);
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
  console.log("removeVote", contest, category, submission, user);
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
