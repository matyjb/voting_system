import { Typography } from "antd";
import { FunctionComponent } from "react";
import { TContestSubmission } from "../../../../data/types";

interface SubmissionStepProps {
  index: number;
  submission: TContestSubmission;
  children?: JSX.Element[] | JSX.Element;
}

const SubmissionStep: FunctionComponent<SubmissionStepProps> = ({
  index,
  children,
  submission,
}) => {
  return (
    <>
      <Typography.Title level={3}>
        #{index + 1} {submission.gameTitle} by {submission.teamName}
      </Typography.Title>

      {children}
    </>
  );
};

export default SubmissionStep;
