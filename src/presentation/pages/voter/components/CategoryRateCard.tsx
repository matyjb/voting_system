import { FunctionComponent } from "react";
import { TContestCategory, TContestSubmission } from "../../../../data/types";
import { Button, Card, Flex, Rate, theme } from "antd";
import { VoterActionType, useVoterState } from "./VoterContext";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";

const customIcons: Record<number, React.ReactNode> = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};

interface CategoryRateCardProps {
  category: TContestCategory;
  submission: TContestSubmission;
}

const CategoryRateCard: FunctionComponent<CategoryRateCardProps> = ({
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
    if (score === 0) {
      handleSkipVote();
    } else {
      dispatch({
        type: VoterActionType.VOTE_TEAM,
        payload: {
          teamId: submission.fbref.id,
          categoryId: category.fbref.id,
          score,
        },
      });
    }
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
    <Card
      title={category.name}
      extra={
        currentScore && (
          <Button type="link" onClick={handleSkipVote}>
            skip
          </Button>
        )
      }
    >
      <Flex style={{ justifyContent: "center" }}>
        <Rate
          defaultValue={0}
          value={currentScore}
          onChange={handleScoreChange}
          character={({ index = 0 }) => customIcons[index + 1]}
          style={{ color: token.colorPrimary }}
        />
      </Flex>
    </Card>
  );
};

export default CategoryRateCard;
