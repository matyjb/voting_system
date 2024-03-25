import { Divider, Flex, Layout, Space } from "antd";
import { Content } from "antd/es/layout/layout";
import ContestPhaseIndicator from "../components/ContestPhaseIndicator";
import ContestName from "../components/ContestName";
import ContestCategories from "../components/ContestCategories";
import ContestQR from "../components/ContestQR";

export default function EditContestPage() {
  return (
    <Layout>
      <Content style={{ padding: "12px 48px", minHeight: "100vh" }}>
        <Flex justify="space-between" align="start">
          <Space direction="vertical" style={{ width: "100%" }}>
            <ContestPhaseIndicator />
            <ContestName />
          </Space>
          <ContestQR />
        </Flex>
        <Divider orientation="left">Categories</Divider>
        <ContestCategories />
        <Divider orientation="left">Submissions</Divider>
        TODO
        <Divider orientation="left">Results</Divider>
        TODO
      </Content>
    </Layout>
  );
}
