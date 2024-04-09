import { FunctionComponent } from "react";
import { TContestCategory, TContestSubmission } from "../../../../data/types";
import { Button, Slider, Space, Typography, theme } from "antd";
import { VoterActionType, useVoterState } from "./VoterContext";

interface CategoryVoteSliderProps {
  category: TContestCategory;
  submission: TContestSubmission;
}

const CategoryVoteSlider: FunctionComponent<CategoryVoteSliderProps> = ({
  category,
  submission,
}) => {
  const { token } = theme.useToken();
  const {
    state: {
      scores: { [submission.fbref.id]: categriesScores },
    },
    dispatch,
  } = useVoterState();

  const handleScoreChange = (score: number) => {
    dispatch({
      type: VoterActionType.VOTE_TEAM,
      payload: {
        teamId: submission.fbref.id,
        categoryId: category.fbref.id,
        score,
      },
    });
  };

  const handleSkipVote = () => {
    dispatch({
      type: VoterActionType.SKIP_VOTE,
      payload: {
        teamId: submission.fbref.id,
        categoryId: category.fbref.id,
      },
    });
  };

  const currentScore = categriesScores && categriesScores[category.fbref.id];

  return (
    <Space direction="vertical" style={{ width: "100%" }} size={"small"}>
      <Space
        style={{ width: "100%", justifyContent: "space-between" }}
        align="baseline"
      >
        <Typography.Title level={5}>{category.name}</Typography.Title>
        {currentScore && (
          <Button type="link" onClick={() => handleSkipVote()}>
            skip
          </Button>
        )}
      </Space>
      <Slider
        defaultValue={3}
        step={1}
        value={currentScore ?? 3}
        min={1}
        max={5}
        dots
        marks={{ 1: "😕", 3: "¯\\_(ツ)_/¯", 5: "🤩" }}
        onFocus={() => handleScoreChange(3)}
        onChange={(value) => handleScoreChange(value)}
        styles={{
          track: {
            background: token.colorPrimary,
            opacity: currentScore ? 1 : 0.5,
            height: currentScore ? 8 : undefined,
            top: currentScore ? 2 : undefined,
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
  );
};

export default CategoryVoteSlider;
