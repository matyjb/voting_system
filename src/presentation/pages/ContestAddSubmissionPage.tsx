import { FireOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Form,
  FormProps,
  Input,
  Layout,
  Space,
  Typography,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { FunctionComponent } from "react";
import { addSubmission } from "../../logic/firebase";
import { useContestData } from "../../logic/contexts/ContestDataContext";

type FieldType = {
  teamName?: string;
  gameTitle?: string;
};

const ContestAddSubmissionPage: FunctionComponent = () => {
  const { contest } = useContestData();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (contest && values.gameTitle && values.teamName) {
      addSubmission(contest, values.gameTitle, values.teamName);
    }
  };
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
                  { required: true, message: "Please input your game title!" },
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
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Space>
      </Content>
    </Layout>
  );
};

export default ContestAddSubmissionPage;
