import { Button, Divider, Flex, Space } from "antd";
import ContestPhaseDropdown from "../components/ContestPhaseDropdown";
import ContestName from "../components/ContestName";
import ContestCategories from "../components/ContestCategories";
import ContestQR from "../components/ContestQR";
import ContestStats from "../components/ContestStats";
import ContestSubmissions from "../components/ContestSubmissions";
import { TrophyOutlined } from "@ant-design/icons";
import { useContestData } from "../../logic/contexts/ContestDataContext";
import { useNavigate } from "react-router";
import { auth } from "../../logic/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function EditContestPage() {
  const { contest } = useContestData();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  if (!contest) {
    return <></>;
  }

  return (
    <>
      <Flex justify="space-between" align="start">
        <Space direction="vertical" style={{ width: "100%" }}>
          <ContestPhaseDropdown />
          <ContestName />
          <Button
            type="primary"
            icon={<TrophyOutlined />}
            onClick={() => navigate(`/${user?.uid}/${contest.fbref.id}`)}
          >
            Show results
          </Button>
        </Space>
        <ContestQR />
      </Flex>
      <Flex gap={16} style={{ width: "100%" }} justify="space-between">
        <Flex vertical style={{ width: "100%" }}>
          <Divider orientation="left">Categories</Divider>
          <ContestCategories />
        </Flex>
        <div style={{ marginTop: 64 }}>
          <ContestStats />
        </div>
      </Flex>
      <Divider orientation="left">Submissions</Divider>
      <ContestSubmissions />
    </>
  );
}
