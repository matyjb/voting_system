import { Badge, BadgeProps, Space, Typography } from "antd";
import { FunctionComponent } from "react";
import { TContestPhase } from "../../data/types";
import { useContest } from "../../logic/contexts/ContestContext";

const badgeProps: { [key in TContestPhase]: BadgeProps } = {
  CLOSED: { color: "red", status: "default" },
  SUBMISSION: { color: "green", status: "processing" },
  VOTING: { color: "orange", status: "processing" },
};

interface ContestPhaseIndicatorProps {}

const ContestPhaseIndicator: FunctionComponent<
  ContestPhaseIndicatorProps
> = () => {
  const { contest } = useContest();
  const phaseProps = badgeProps[contest?.phase ?? "CLOSED"];

  return (
    <Space>
      <Badge {...phaseProps} />
      <Typography.Text strong style={{ color: phaseProps.color }}>
        {contest?.phase}
      </Typography.Text>
    </Space>
  );
};

export default ContestPhaseIndicator;
