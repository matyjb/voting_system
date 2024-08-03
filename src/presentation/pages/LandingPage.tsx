import { Avatar, Button, Layout, Space, Typography } from "antd";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { Content, Header } from "antd/es/layout/layout";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../logic/firebase";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { logoUrl } from "../../constants";
import { ArrowRightOutlined } from "@ant-design/icons";

export default function LandingPage() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleGotoDashboard = () => {
    navigate("/edit");
  };

  return (
    <Layout className="fill-height">
      <Header style={{ display: "flex", justifyContent: "space-between" }}>
        <Space>
          <Avatar src={logoUrl} />
          <Typography.Title level={3} style={{ margin: 0 }}>
            Voting System
          </Typography.Title>
        </Space>
        <Space size={"large"}>
          <ThemeToggle />
          <GoogleLoginButton />
          {user && (
            <Button
              type="primary"
              onClick={handleGotoDashboard}
              icon={<ArrowRightOutlined />}
              dir="rtl"
            >
              Go to dashboard
            </Button>
          )}
        </Space>
      </Header>
      <Content className="center">
        <Space direction="vertical" size="large">
          <h1>Landing Page</h1>
        </Space>
      </Content>
    </Layout>
  );
}
