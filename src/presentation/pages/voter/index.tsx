import { Layout, Menu, Typography } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { FunctionComponent, useState } from "react";
import { useContestData } from "../../../logic/contexts/ContestDataContext";
import Sider from "antd/es/layout/Sider";
import SelectYourTeamCard from "./components/SelectYourTeamCard";
import ScoreSubmissionFormCard from "./components/ScoreSubmissionFormCard";

interface ContestVotePageProps {}

const ContestVotePage: FunctionComponent<ContestVotePageProps> = () => {
  const { contest, submissions } = useContestData();
  const [step, setStep] = useState<number>(0);

  const submissionsAmount = submissions?.length ?? 0;

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
                key: "0",
                label: "Select team",
                onClick: () => setStep(0),
              },
              ...(submissions?.map((s, i) => ({
                key: (i + 1).toString(),
                label: `${s.gameTitle} by ${s.teamName}`,
                onClick: () => setStep(i + 1),
              })) ?? []),
              {
                key: (submissionsAmount + 1).toString(),
                label: "Submit",
                onClick: () => setStep(submissionsAmount + 1),
              },
            ]}
            selectedKeys={[step.toString()]}
          />
        </Sider>
        <Content className="center">
          {step === 0 && (
            <SelectYourTeamCard onComplete={() => setStep(step + 1)} />
          )}
          {step !== 0 && step <= submissionsAmount && (
            <ScoreSubmissionFormCard
              submission={submissions![step - 1]}
              onComplete={() => setStep(step + 1)}
            />
          )}
          {step > submissionsAmount && (
            <Typography.Title level={4}>Thank you for voting!</Typography.Title>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ContestVotePage;
