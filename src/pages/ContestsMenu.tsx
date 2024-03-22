import { useEffect, useState } from "react";
import { ExperimentOutlined } from "@ant-design/icons";
import { Avatar, Layout, Menu } from "antd";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, onSnapshot } from "@firebase/firestore";
import { TContest } from "../types";
import GoogleLoginButton from "../components/GoogleLoginButton";
import MenuItem from "antd/es/menu/MenuItem";

const { Sider } = Layout;

export default function ContestsMenu() {
  const [user] = useAuthState(auth);
  const [contests, setContests] = useState<TContest[]>([]);
  const { contestId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    onSnapshot(collection(db, `users/${user.uid}/contests`), (docs) => {
      const docsData: TContest[] = [];
      docs.forEach((doc) => {
        docsData.push({ ...(doc.data() as TContest), fbref: doc.ref });
      });
      setContests(docsData);
    });
  }, [user]);

  const items: any[] = contests.map((contest) => (
    <MenuItem
      key={contest.fbref.id}
      onClick={() => navigate(`/edit/${contest.fbref.id}`)}
      icon={contest.logoUrl ? <Avatar size="small" src={contest.logoUrl} /> :  <ExperimentOutlined />}
    >
      {contest.name}
    </MenuItem>
  ));

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Menu
          theme="dark"
          mode="inline"
          items={items}
          selectedKeys={contestId ? [contestId] : []}
        />
      </Sider>
      <div style={{ marginLeft: 200 }}>
        {contestId && <Outlet />}
      </div>
    </Layout>
  );
}
