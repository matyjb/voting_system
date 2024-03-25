import { Space, Statistic } from "antd";
import { FunctionComponent } from "react";
import { DislikeOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import { useContest } from "../../logic/contexts/ContestContext";

interface ContestStatsProps {}

const ContestStats: FunctionComponent<ContestStatsProps> = () => {
  const { submissions } = useContest();
  return (
    <Space direction="vertical">
      <Statistic
        style={{ minWidth: "200px" }}
        title="Competitors"
        value={submissions?.length ?? 0}
        prefix={<StarOutlined />}
      />
      <Statistic
        style={{ textAlign: "right", minWidth: "200px" }}
        title="Votes"
        value={1128}
        suffix={
          <Space>
            <LikeOutlined />
            <DislikeOutlined />
          </Space>
        }
      />
    </Space>
  );
};

export default ContestStats;
