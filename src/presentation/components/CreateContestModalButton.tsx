import { Button, Input, Modal } from "antd";
import { FunctionComponent, useState } from "react";
import { addContest, auth } from "../../logic/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { PlusOutlined } from "@ant-design/icons";

interface CreateContestModalButtonProps {}

const CreateContestModalButton: FunctionComponent<
  CreateContestModalButtonProps
> = () => {
  const [contestName, setContestName] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);
  const [user] = useAuthState(auth);

  const handleOk = () => {
    if (contestName) {
      setOpen(false);
      addContest(user!, contestName);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleAfterClose = () => {
    setContestName(undefined);
  };

  return (
    <>
      <Button
        type="dashed"
        style={{
          width: "calc(100% - 8px)",
          margin: 4,
          textAlign: "left",
          padding: "0px 24px",
        }}
        onClick={() => setOpen(!open)}
        size="large"
        icon={<PlusOutlined />}
      >
        Create contest
      </Button>
      <Modal
        open={open}
        title="Name your contest"
        onOk={handleOk}
        onCancel={handleCancel}
        afterClose={handleAfterClose}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <OkBtn />
          </>
        )}
      >
        <Input onChange={(e) => setContestName(e.target.value)} />
      </Modal>
    </>
  );
};

export default CreateContestModalButton;
