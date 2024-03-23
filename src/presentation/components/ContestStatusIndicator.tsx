import { Badge, Space, Typography } from "antd";
import { FunctionComponent } from "react";
import { TContestPhase } from "../../data/types";

interface ContestPhaseIndicatorProps {
  phase: TContestPhase;
}

const ContestPhaseIndicator: FunctionComponent<ContestPhaseIndicatorProps> = ({
  phase,
}) => {
  const colors: { [key in TContestPhase]: string } = {
    CLOSED: "red",
    SUBMISSION: "green",
    VOTING: "orange",
  };

  return (
    <Space>
      <Badge status="processing" color={colors[phase]} />
      <Typography.Text strong style={{ color: colors[phase] }}>
        {phase}
      </Typography.Text>
    </Space>
  );
};

export default ContestPhaseIndicator;
