import { FireOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Form,
  FormProps,
  Input,
  Layout,
  Result,
  Space,
  Typography,
  message,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { FunctionComponent, useState } from "react";
import { addSubmission } from "../../logic/firebase";
import { useContestData } from "../../logic/contexts/ContestDataContext";

type FieldType = {
  teamName?: string;
  gameTitle?: string;
};

const ContestAddSubmissionPage: FunctionComponent = () => {
  const { contest } = useContestData();
  const [messageApi, contextHolder] = message.useMessage();
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (contest && values.gameTitle && values.teamName) {
      setStatus("loading");
      addSubmission(contest, values.gameTitle, values.teamName)
        .then(() => {
          setStatus("success");
        })
        .catch(() => {
          messageApi.error("Something went wrong");
          setStatus("idle");
        });
    }
  };

  if (status === "success") {
    return (
      <Layout>
        <Content
          style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Result
            status="success"
            title={`Successfully added submittion to ${contest?.name}!`}
            extra={[
              <Button key="buy" onClick={() => setStatus("idle")}>
                Submit another
              </Button>,
            ]}
          />
        </Content>
      </Layout>
    );
  }

  return (
    <>
      {contextHolder}
      <Layout>
        <Content
          style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Space direction="vertical">
            <Card>
              <Space
                direction="vertical"
                style={{ textAlign: "center", width: "100%" }}
              >
                <Avatar
                  size={64}
                  src={contest?.logoUrl}
                  icon={<FireOutlined />}
                  style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                />
                <Typography.Title level={3}>{contest?.name}</Typography.Title>
              </Space>
            </Card>

            <Card title="Add Submission">
              <Form
                name="game submit"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item<FieldType>
                  label="Team name"
                  name="teamName"
                  rules={[
                    { required: true, message: "Please input your team name!" },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="10 bits studios"
                    prefix={<UserOutlined />}
                    maxLength={100}
                  />
                </Form.Item>
                <Form.Item<FieldType>
                  label="Game title"
                  name="gameTitle"
                  rules={[
                    {
                      required: true,
                      message: "Please input your game title!",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Fireman"
                    prefix={<FireOutlined />}
                    maxLength={100}
                  />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={status === "loading"}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Space>
        </Content>
      </Layout>
    </>
  );
};

export default ContestAddSubmissionPage;
