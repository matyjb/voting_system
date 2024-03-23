import { Button, Divider, Flex, Layout, QRCode, Space } from "antd";
import { useContest } from "../../logic/contexts/ContestContext";
import { Content } from "antd/es/layout/layout";
import ContestPhaseIndicator from "../components/ContestStatusIndicator";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../logic/firebase";
import ContestName from "../components/ContestName";

const downloadQRCode = () => {
  const canvas = document
    .getElementById("myqrcode")
    ?.querySelector<HTMLCanvasElement>("canvas");
  if (canvas) {
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.download = "QRCode.png";
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};

export default function EditContestPage() {
  const { contest } = useContest();
  const [user] = useAuthState(auth);

  const contestUrl = `${window.location.origin}/${user!.uid}/${
    contest!.fbref.id
  }`;

  return (
    <Layout>
      <Content style={{ padding: "12px 48px", minHeight: "100vh" }}>
        <Flex justify="space-between" align="start">
          <Space direction="vertical" style={{ width: "100%" }}>
            <ContestPhaseIndicator phase={contest!.phase} />
            <ContestName />
          </Space>
          <Space direction="vertical" align="center">
            <QRCode value={contestUrl} />
            <Button type="primary" onClick={downloadQRCode}>
              Download
            </Button>
          </Space>
        </Flex>
        <Divider />
      </Content>
    </Layout>
  );
}
