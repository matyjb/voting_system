import {
  Button,
  Card,
  Divider,
  Progress,
  Space,
  Typography,
  theme,
} from "antd";
import { FunctionComponent } from "react";
import { useVoterState } from "./VoterContext";
import { useContestData } from "../../../../logic/contexts/ContestDataContext";

const SubmitScoresCard: FunctionComponent = () => {
  const { state, dispatch } = useVoterState();
  const { submissions, categories } = useContestData();
  const { token } = theme.useToken();

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

  // TODO: button that submits scores

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
        <Button type="primary" onClick={() => {}} style={{ width: "100%" }}>
          Submit my vote!
        </Button>
      </Space>
    </Card>
  );
};

export default SubmitScoresCard;
