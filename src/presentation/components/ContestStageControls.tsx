import {
  CloseOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
} from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { FunctionComponent } from "react";
import { editContest } from "../../logic/firebase";
import { useContestData } from "../../logic/contexts/ContestDataContext";

interface ContestStageControlsProps {}

const ContestStageControls: FunctionComponent<
  ContestStageControlsProps
> = () => {
  const { contest, submissions } = useContestData();

  const currentOnStageIndex =
    submissions?.findIndex((s) => s.fbref.path === contest?.onStageRef?.path) ??
    -1;

  const handleSetPreviousOnStage = () => {
    if (contest && submissions && currentOnStageIndex > 0) {
      editContest({
        onStageRef: submissions[currentOnStageIndex - 1].fbref,
        fbref: contest.fbref,
      });
    }
  };
  const handleSetNextOnStage = () => {
    if (
      contest &&
      submissions &&
      currentOnStageIndex < submissions.length - 1
    ) {
      editContest({
        onStageRef: submissions[currentOnStageIndex + 1].fbref,
        fbref: contest.fbref,
      });
    }
  };
  const handleClearStage = () => {
    if (contest) {
      editContest({
        onStageRef: null,
        fbref: contest.fbref,
      });
    }
  };

  return (
    <Button.Group>
      <Tooltip title="Set previous on stage">
        <Button
          type="primary"
          icon={<StepBackwardOutlined />}
          disabled={currentOnStageIndex <= 0}
          onClick={handleSetPreviousOnStage}
        />
      </Tooltip>
      <Tooltip title="Set next on stage">
        <Button
          type="primary"
          icon={<StepForwardOutlined />}
          onClick={handleSetNextOnStage}
          disabled={
            submissions && currentOnStageIndex >= submissions?.length - 1
          }
        />
      </Tooltip>
      <Tooltip title="Clear the stage">
        <Button
          type="primary"
          icon={<CloseOutlined />}
          disabled={currentOnStageIndex === -1}
          onClick={handleClearStage}
        />
      </Tooltip>
    </Button.Group>
  );
};

export default ContestStageControls;
