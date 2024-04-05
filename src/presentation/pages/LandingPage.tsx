import { Layout, Space } from "antd";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { Content } from "antd/es/layout/layout";

export default function LandingPage() {
  return (
    <Layout className="fill-height">
      <Content className="center">
        <Space direction="vertical" size="large">
          <h1>Landing Page</h1>
          <GoogleLoginButton />
        </Space>
      </Content>
    </Layout>
  );
}
