import { Avatar, Button, Layout, Menu, Space, Typography } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { FunctionComponent, useState } from "react";
import { useContestData } from "../../../logic/contexts/ContestDataContext";
import Sider from "antd/es/layout/Sider";
import SelectYourTeam from "./components/SelectYourTeam";
import SubmitScoresCard from "./components/SubmitScoreCard";
import SubmissionStep from "./components/SubmissionStep";
import CategoryVoteSlider from "./components/CategoryVoteSlider";
import { ExperimentOutlined } from "@ant-design/icons";
import ThemeToggle from "../../components/ThemeToggle";
import GoogleLoginButton from "../../components/GoogleLoginButton";

interface ContestVotePageProps {}

const ContestVotePage: FunctionComponent<ContestVotePageProps> = () => {
  const { contest, submissions, categories } = useContestData();
  const [step, setStep] = useState<number>(0);

  const submissionsAmount = submissions?.length ?? 0;
  const lastStepIndex = submissionsAmount + 1;

  return (
    <Layout className="fill-height">
      <Header style={{ display: "flex", justifyContent: "space-between" }}>
        <Space>
          <Avatar src={contest?.logoUrl} icon={<ExperimentOutlined />} />
          <Typography.Title level={3} style={{ margin: 0 }}>
            {contest?.name}
          </Typography.Title>
        </Space>
        <Space>
          <ThemeToggle />
          <GoogleLoginButton />
        </Space>
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
        <Layout>
          <Content style={{ padding: 24 }}>
            {step === 0 && <SelectYourTeam />}
            {step > 0 && step < lastStepIndex && (
              <SubmissionStep
                submission={submissions![step - 1]}
                index={step - 1}
              >
                {categories?.map((c) => (
                  <CategoryVoteSlider
                    key={c.fbref.id}
                    category={c}
                    submission={submissions![step - 1]}
                  />
                ))}
              </SubmissionStep>
            )}
            {step === lastStepIndex && <SubmitScoresCard />}
          </Content>
          <Footer style={{ textAlign: "end", position: "sticky", bottom: 0 }}>
            <Space>
              <Button
                type="primary"
                onClick={() => setStep(step - 1)}
                disabled={step === 0}
              >
                Previous
              </Button>
              <Button
                type="primary"
                onClick={() => setStep(step + 1)}
                disabled={step === lastStepIndex}
              >
                Next
              </Button>
              <Typography.Text>
                {step}/{lastStepIndex}
              </Typography.Text>
            </Space>
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default ContestVotePage;
