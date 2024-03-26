import { FunctionComponent } from "react";
import { useContest } from "../../logic/contexts/ContestContext";
import { Avatar, Button, List, Modal, Space, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { removeSubmission } from "../../logic/firebase";
import { TContestSubmission } from "../../data/types";

interface ContestSubmissionsProps {}

const ContestSubmissions: FunctionComponent<ContestSubmissionsProps> = () => {
  const { submissions } = useContest();
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

  return (
    <>
      <List
        bordered
        dataSource={submissions}
        renderItem={(item) => (
          <List.Item
            style={{ margin: 2, paddingTop: 2, paddingBottom: 2 }}
            actions={[
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
