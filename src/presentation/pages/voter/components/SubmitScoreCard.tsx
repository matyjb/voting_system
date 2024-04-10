import {
  Button,
  Card,
  Divider,
  Progress,
  Result,
  Space,
  Typography,
  theme,
} from "antd";
import { FunctionComponent, useState } from "react";
import { VoterActionType, useVoterState } from "./VoterContext";
import { useContestData } from "../../../../logic/contexts/ContestDataContext";
import { addVoter } from "../../../../logic/firebase";
import { TScore } from "../../../../data/types";

const SubmitScoresCard: FunctionComponent = () => {
  const { state, dispatch } = useVoterState();
  const { contest, submissions, categories } = useContestData();
  const { token } = theme.useToken();
  const [loading, setLoading] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  // calculates percent of votes submitted
  const possibleVotes = (submissions?.length ?? 0) * (categories?.length ?? 0);
  const submittedVotes = Object.values(state.scores).reduce(
    (acc, team) => acc + Object.keys(team).length,
    0
  );
  const percentVotesSubmitted = Math.round(
    (submittedVotes / possibleVotes) * 100
  );

  // get top 3 rated submissions
  const sortedSubmissions = (submissions ?? [])
    .map((s) => ({
      ...s,
      score: Object.values(state.scores[s.fbref.id] ?? {}).reduce(
        (acc, v) => acc + v,
        0
      ),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const handleSubmit = () => {
    if (contest === null) return;

    setLoading(true);
    const s: TScore[] = [];
    for (const submission of sortedSubmissions) {
      for (const category of categories ?? []) {
        s.push({
          submissionRef: submission.fbref,
          categoryRef: category.fbref,
          score: state.scores[submission.fbref.id]?.[category.fbref.id] ?? 0,
        });
      }
    }

    const voterTeamRef = submissions?.find(
      (t) => t.fbref.id === state.voterTeamId
    )?.fbref;

    addVoter(contest!, s, voterTeamRef)
      .then(() => {
        dispatch({ type: VoterActionType.CLEAR, payload: undefined });
        setDidSubmit(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (didSubmit) {
    return <Result status="success" title="Thank you for voting!" />;
  }

  return (
    <Card title="Thank you for voting!">
      <Space direction="vertical" style={{ width: "100%" }}>
        <Space
          direction="vertical"
          style={{ width: "100%", alignItems: "center" }}
        >
          <Typography.Text>{`You casted`}</Typography.Text>
          <Progress
            percent={percentVotesSubmitted}
            type="circle"
            strokeWidth={20}
            strokeColor={
              percentVotesSubmitted > 60 ? token.colorSuccess : token.colorError
            }
          />
          <Typography.Text>{`of scores`}</Typography.Text>
        </Space>
        <Divider style={{ margin: "8px 0" }} />
        <Typography.Text
          style={{ fontWeight: "bold" }}
        >{`These are your top 3 games`}</Typography.Text>
        {sortedSubmissions.map((s, i) => (
          <Typography.Text key={s.fbref.id}>
            {`${i + 1}. ${s.gameTitle} by ${s.teamName}`}
          </Typography.Text>
        ))}
        <Divider style={{ margin: "8px 0" }} />
        <Button
          type="primary"
          onClick={handleSubmit}
          style={{ width: "100%" }}
          loading={loading}
        >
          Submit my ratings!
        </Button>
      </Space>
    </Card>
  );
};

export default SubmitScoresCard;
