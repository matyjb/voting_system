import { FunctionComponent } from "react";
import { useContest } from "../../logic/contexts/ContestContext";
import {
  Avatar,
  Badge,
  Button,
  Flex,
  List,
  Modal,
  Space,
  Typography,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { editContest, removeSubmission } from "../../logic/firebase";
import { TContestSubmission } from "../../data/types";
import ContestStageControls from "./ContestStageControls";

interface ContestSubmissionsProps {}

const ContestSubmissions: FunctionComponent<ContestSubmissionsProps> = () => {
  const { contest, submissions } = useContest();
  const [modal, contextHolder] = Modal.useModal();

  const handleRemoveSubmissions = async (submissions: TContestSubmission) => {
    if (
      await modal.confirm({
        title: "Are you sure?",
        content: (
          <Typography.Text>
            Are you sure you want to <b>remove</b> the submissions{" "}
            <b>
              {submissions.gameTitle} by {submissions.teamName}
            </b>
            ?
          </Typography.Text>
        ),
        okButtonProps: {
          danger: true,
          type: "primary",
        },
        okText: "Yes, remove it",
        closable: true,
        maskClosable: true,
      })
    ) {
      removeSubmission(submissions);
    }
  };

  const handleSetOnStage = (submission: TContestSubmission) => {
    editContest({
      onStageRef: submission.fbref,
      fbref: contest!.fbref,
    });
  };

  const onStage = submissions?.find(
    (s) => s.fbref.path === contest?.onStageRef?.path
  );

  return (
    <>
      <List
        bordered
        header={
          <Flex justify="space-between" align="center">
            <Typography.Text strong>On stage:</Typography.Text>
            {onStage && (
              <Space>
                <Avatar src={onStage.logoUrl} icon={<UserOutlined />} />
                <Typography>
                  <Typography.Text strong>{onStage.gameTitle}</Typography.Text>
                  <Typography.Text> by {onStage.teamName}</Typography.Text>
                </Typography>
              </Space>
            )}
            <ContestStageControls />
          </Flex>
        }
        dataSource={submissions}
        renderItem={(item) => (
          <List.Item
            style={{ margin: 2, paddingTop: 2, paddingBottom: 2 }}
            actions={[
              contest?.onStageRef?.path !== item.fbref.path ? (
                <Button type="link" onClick={() => handleSetOnStage(item)}>
                  set on stage
                </Button>
              ) : (
                <Space>
                  <Badge status="processing" />
                  <Typography.Text>on stage</Typography.Text>
                </Space>
              ),
              <Button
                type="link"
                danger
                onClick={() => {
                  handleRemoveSubmissions(item);
                }}
              >
                remove
              </Button>,
            ]}
          >
            <Space>
              <Avatar src={item.logoUrl} icon={<UserOutlined />} />
              <Typography>
                <Typography.Text strong>{item.gameTitle}</Typography.Text>
                <Typography.Text> by {item.teamName}</Typography.Text>
              </Typography>
            </Space>
          </List.Item>
        )}
      />
      {contextHolder}
    </>
  );
};

export default ContestSubmissions;
