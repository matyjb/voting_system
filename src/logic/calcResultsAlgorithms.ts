import { TDocRef, TScore } from "../data/types";
import { TResultType } from "../data/types/vote";

const calcByAvg = (scores: TScore[]) => {
  // group by submissionRef.id
  const scoresBySubmission = scores.reduce((acc, vote) => {
    if (!acc[vote.submissionRef.id]) {
      acc[vote.submissionRef.id] = {
        submissionRef: vote.submissionRef,
        scores: [],
      };
    }
    acc[vote.submissionRef.id].scores.push(vote);
    return acc;
  }, {} as { [key: string]: { submissionRef: TDocRef; scores: TScore[] } });

  // calc avg for each submission
  let results = Object.values(scoresBySubmission).map((s) => {
    const overallScore =
      s.scores.reduce((acc, v) => acc + v.score, 0) / s.scores.length;
    return { submissionRef: s.submissionRef, overallScore };
  });

  return results;
}

const calcResults = (scores: TScore[], calcMode: TResultType = "avg") => {
  switch (calcMode) {
    case "avg":
      return calcByAvg(scores);
    default:
      return [];
  }
}

export { calcResults }