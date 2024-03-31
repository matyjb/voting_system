import { useEffect, useState } from "react";
import { ExperimentOutlined } from "@ant-design/icons";
import { Avatar, Layout, Menu, MenuProps, Space, Typography } from "antd";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../../logic/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, onSnapshot } from "@firebase/firestore";
import { TContest } from "../../data/types";
import GoogleLoginButton from "../components/GoogleLoginButton";
import MenuItem from "antd/es/menu/MenuItem";
import CreateContestModalButton from "../components/CreateContestModalButton";
import { ContestProvider } from "../../logic/contexts/ContestContext";

const { Sider, Header, Content } = Layout;
const logoUrl =
  "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg";

type MenuItem = Required<MenuProps>["items"][number];

export default function ContestsMenu() {
  const [user] = useAuthState(auth);
  const [contests, setContests] = useState<TContest[]>([]);
  const { contestId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const unsubscribe = onSnapshot(
      collection(db, `users/${user.uid}/contests`),
      (docs) => {
        const docsData: TContest[] = [];
        docs.forEach((doc) => {
          docsData.push({ ...(doc.data() as TContest), fbref: doc.ref });
        });
        setContests(docsData);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [user]);

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

  const currentlyViewedContest = contests.find((c) => c.fbref.id === contestId);

  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Space>
          <Avatar src={logoUrl} />
          <Typography.Title level={3} style={{ color: "white", margin: 0 }}>
            Voting System
          </Typography.Title>
        </Space>
        <GoogleLoginButton />
      </Header>
      <Layout hasSider>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 64,
            bottom: 0,
          }}
        >
          <Typography.Title
            level={5}
            style={{ color: "white", margin: "16px 4px" }}
          >
            My contests
          </Typography.Title>
          <Menu
            theme="dark"
            mode="inline"
            items={items}
            selectedKeys={
              currentlyViewedContest ? [currentlyViewedContest.fbref.id] : []
            }
          />
          <CreateContestModalButton />
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Content
            style={{ padding: "12px 48px", height: "calc(100vh - 64px)" }}
          >
            {currentlyViewedContest && (
              <ContestProvider contest={currentlyViewedContest}>
                <Outlet />
              </ContestProvider>
            )}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
