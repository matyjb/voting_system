import { ExperimentOutlined } from "@ant-design/icons";
import { Avatar, Layout, Menu, MenuProps, Space, Typography } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import GoogleLoginButton from "../components/GoogleLoginButton";
import MenuItem from "antd/es/menu/MenuItem";
import CreateContestModalButton from "../components/CreateContestModalButton";
import ThemeToggle from "../components/ThemeToggle";
import { useContests } from "../../logic/contexts/ContestsContext";
import { useContestData } from "../../logic/contexts/ContestDataContext";
import { useState } from "react";
import { logoUrl } from "../../constants";

const { Sider, Header, Content } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

export default function ContestsMenu() {
  const { contests } = useContests();
  const { contest } = useContestData();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
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
      <Header style={{ display: "flex", justifyContent: "space-between" }}>
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
      <Layout>
        <Sider
          breakpoint="lg"
          collapsible
          collapsed={isCollapsed}
          onCollapse={setIsCollapsed}
        >
          <Menu
            mode="inline"
            items={items}
            selectedKeys={contest ? [contest.fbref.id] : []}
          />
          <CreateContestModalButton collapsed={isCollapsed} />
        </Sider>
        <Content style={{ padding: "12px 48px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
