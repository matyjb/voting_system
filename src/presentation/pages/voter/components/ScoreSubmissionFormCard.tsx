import { FunctionComponent } from "react";
import { TContestSubmission } from "../../../../data/types";
import { Button, Card, Slider, Space, Typography, Divider } from "antd";
import { VoterActionType, useVoterState } from "./VoterContext";
import { useContestData } from "../../../../logic/contexts/ContestDataContext";

interface ScoreSubmissionFormCardProps {
  submission: TContestSubmission;
  onComplete: () => void;
}

const ScoreSubmissionFormCard: FunctionComponent<
  ScoreSubmissionFormCardProps
> = ({ submission, onComplete }) => {
  const { categories } = useContestData();
  const {
    state: { scores },
    dispatch,
  } = useVoterState();

  const submissionScores = scores[submission.fbref.id];

  return (
    <Card
      title={submission.gameTitle}
      extra={`by ${submission.teamName}`}
      style={{ maxWidth: 600, width: "100%" }}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        {categories?.map((c) => (
          <Space
            key={c.fbref.id}
            direction="vertical"
            style={{ width: "100%" }}
            size={"small"}
          >
            <Typography.Title level={5}>{c.name}</Typography.Title>
            <Slider
              defaultValue={3}
              step={1}
              value={submissionScores?.[c.fbref.id]}
              min={1}
              max={5}
              marks={{ 1: "😕", 3: "¯\\_(ツ)_/¯", 5: "🤩" }}
              onChange={(value) => {
                dispatch({
                  type: VoterActionType.VOTE_TEAM,
                  payload: {
                    teamId: submission.fbref.id,
                    categoryId: c.fbref.id,
                    score: value,
                  },
                });
              }}
              style={{ width: "100%" }}
            />
          </Space>
        ))}
        <Divider />
        <Button type="primary" style={{ width: "100%" }} onClick={onComplete}>
          Next
        </Button>
      </Space>
    </Card>
  );
};

export default ScoreSubmissionFormCard;
