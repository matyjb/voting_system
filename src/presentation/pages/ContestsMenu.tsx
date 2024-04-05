import { ExperimentOutlined } from "@ant-design/icons";
import { Avatar, Layout, Menu, MenuProps, Space, Typography } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import GoogleLoginButton from "../components/GoogleLoginButton";
import MenuItem from "antd/es/menu/MenuItem";
import CreateContestModalButton from "../components/CreateContestModalButton";
import ThemeToggle from "../components/ThemeToggle";
import { useContests } from "../../logic/contexts/ContestsContext";
import { useContestData } from "../../logic/contexts/ContestDataContext";

const { Sider, Header, Content } = Layout;
const logoUrl =
  "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg";

type MenuItem = Required<MenuProps>["items"][number];

export default function ContestsMenu() {
  const { contests } = useContests();
  const { contest } = useContestData();
  const navigate = useNavigate();

  const items: MenuItem[] = contests.map((contest) => {
    return {
      key: contest.fbref.id,
      onClick: () => navigate(`/edit/${contest.fbref.id}`),
      icon: contest.logoUrl ? (
        <Avatar size="small" src={contest.logoUrl} />
      ) : (
        <ExperimentOutlined />
      ),
      label: contest.name,
    } as MenuItem;
  });

  return (
    <Layout className="fill-height">
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Space>
          <Avatar src={logoUrl} />
          <Typography.Title level={3} style={{ margin: 0 }}>
            Voting System
          </Typography.Title>
        </Space>
        <Space>
          <ThemeToggle />
          <GoogleLoginButton />
        </Space>
      </Header>
      <Layout hasSider>
        <Sider
          style={{
            overflow: "auto",
            position: "fixed",
            left: 0,
            top: 64,
            bottom: 0,
          }}
        >
          <Typography.Title level={5} style={{ margin: "16px 4px" }}>
            My contests
          </Typography.Title>
          <Menu
            mode="inline"
            items={items}
            selectedKeys={contest ? [contest.fbref.id] : []}
          />
          <CreateContestModalButton />
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Content style={{ padding: "12px 48px" }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
