import { Layout, Menu, Typography } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { FunctionComponent, useState } from "react";
import { useContestData } from "../../../logic/contexts/ContestDataContext";
import { TDocRef, TScore } from "../../../data/types";
import Sider from "antd/es/layout/Sider";
import SelectYourTeamCard from "./components/SelectYourTeamCard";

interface ContestVotePageProps {}

const ContestVotePage: FunctionComponent<ContestVotePageProps> = () => {
  const { contest } = useContestData();
  const [voteData, setVoteData] = useState<{
    voterTeamRef?: TDocRef;
    scores: TScore[];
  }>({
    scores: [],
  });

  return (
    <Layout className="fill-height">
      <Header>
        <Typography.Title level={3}>{contest?.name}</Typography.Title>
      </Header>
      <Layout>
        <Sider breakpoint="lg" collapsible>
          <Menu
            mode="inline"
            items={[
              {
                key: "team#",
                label: "Select team",
              },
            ]}
            selectedKeys={[]}
          />
        </Sider>
        <Content className="center">
          <SelectYourTeamCard
            currentTeamRef={voteData.voterTeamRef}
            onSelectTeam={(v) => setVoteData({ ...voteData, voterTeamRef: v })}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ContestVotePage;
