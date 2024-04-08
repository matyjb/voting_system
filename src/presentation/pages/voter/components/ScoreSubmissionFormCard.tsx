import { FunctionComponent } from "react";
import { TContestSubmission } from "../../../../data/types";
import { Button, Card, Slider, Space, Typography, Divider, theme } from "antd";
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
  const { token } = theme.useToken();
  const {
    state: { scores },
    dispatch,
  } = useVoterState();

  const submissionScores = scores[submission.fbref.id];

  const handleScoreChange = (categoryId: string, score: number) => {
    dispatch({
      type: VoterActionType.VOTE_TEAM,
      payload: {
        teamId: submission.fbref.id,
        categoryId,
        score,
      },
    });
  };

  const handleSkipVote = (categoryId: string) => {
    dispatch({
      type: VoterActionType.SKIP_VOTE,
      payload: {
        teamId: submission.fbref.id,
        categoryId,
      },
    });
  };

  console.log(submissionScores);

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
            <Space
              style={{ width: "100%", justifyContent: "space-between" }}
              align="baseline"
            >
              <Typography.Title level={5}>{c.name}</Typography.Title>
              {submissionScores?.[c.fbref.id] && (
                <Button type="link" onClick={() => handleSkipVote(c.fbref.id)}>
                  skip
                </Button>
              )}
            </Space>
            <Slider
              defaultValue={3}
              step={1}
              value={submissionScores?.[c.fbref.id] ?? 3}
              min={1}
              max={5}
              dots
              marks={{ 1: "😕", 3: "¯\\_(ツ)_/¯", 5: "🤩" }}
              onFocus={() => handleScoreChange(c.fbref.id, 3)}
              onChange={(value) => handleScoreChange(c.fbref.id, value)}
              styles={{
                track: {
                  background: token.colorPrimary,
                  opacity: submissionScores?.[c.fbref.id] ? 1 : 0.5,
                  height: submissionScores?.[c.fbref.id] ? 8 : undefined,
                  top: submissionScores?.[c.fbref.id] ? 2 : undefined,
                },
                handle: {
                  background: token.colorPrimary,
                },
              }}
              style={{
                width: "100%",
              }}
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
