import { FunctionComponent } from "react";
import { useContest } from "../../logic/contexts/ContestContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../logic/firebase";
import { Button, QRCode, Space } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

interface ContestQRProps {}

const downloadQRCode = () => {
  const canvas = document
    .getElementById("contestQR")
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

const ContestQR: FunctionComponent<ContestQRProps> = () => {
  const { contest } = useContest();
  const [user] = useAuthState(auth);

  const contestUrl = `${window.location.origin}/${user!.uid}/${
    contest!.fbref.id
  }`;

  return (
    <Space id="contestQR" direction="vertical" align="center">
      <QRCode value={contestUrl} />
      <Button
        type="primary"
        icon={<DownloadOutlined />}
        onClick={downloadQRCode}
      >
        Download
      </Button>
    </Space>
  );
};

export default ContestQR;
