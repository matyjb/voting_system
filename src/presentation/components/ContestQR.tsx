import { FunctionComponent } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../logic/firebase";
import { Button, notification, QRCode, Space } from "antd";
import { CopyOutlined, DownloadOutlined } from "@ant-design/icons";
import { useContestData } from "../../logic/contexts/ContestDataContext";
import { encodeContestUrl } from "../../router";

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
  const { contest } = useContestData();
  const [user] = useAuthState(auth);
  const [api, contextHolder] = notification.useNotification();

  const contestUrl = encodeContestUrl(user?.uid ?? "", contest?.fbref.id ?? "");

  return (
    <>
      {contextHolder}
      <Space id="contestQR" direction="vertical" align="center">
        <QRCode value={contestUrl} />
        <Space>
          <Button
            type="primary"
            icon={<CopyOutlined />}
            onClick={() => {
              navigator.clipboard.writeText(contestUrl);
              api.info({
                message: `Copied!`,
                placement: "top",
              });
            }}
          />
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={downloadQRCode}
          >
            Download
          </Button>
        </Space>
      </Space>
    </>
  );
};

export default ContestQR;
