import { Divider, Flex, Space } from "antd";
import ContestPhaseIndicator from "../components/ContestPhaseIndicator";
import ContestName from "../components/ContestName";
import ContestCategories from "../components/ContestCategories";
import ContestQR from "../components/ContestQR";

export default function EditContestPage() {
  return (
    <>
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
    </>
  );
}
