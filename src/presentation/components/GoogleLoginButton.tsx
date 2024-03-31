import { auth, logout, signInWithGoogle } from "../../logic/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Avatar, Button, Popover, Space, Typography } from "antd";
import { UserOutlined, GoogleOutlined } from "@ant-design/icons";
import { FunctionComponent, useEffect } from "react";

interface GoogleLoginButtonProps {
  style?: React.CSSProperties;
}

const GoogleLoginButton: FunctionComponent<GoogleLoginButtonProps> = ({
  style,
}) => {
  const [user, , error] = useAuthState(auth);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  if (user) {
    return (
      <Popover
        content={
          <Button type="text" onClick={logout}>
            Logout
          </Button>
        }
        trigger="hover"
      >
        <Space>
          <Typography.Text strong style={style}>
            {user?.displayName}
          </Typography.Text>
          <Avatar size="large" icon={<UserOutlined />} src={user?.photoURL} />
        </Space>
      </Popover>
    );
  } else {
    return (
      <Space onClick={signInWithGoogle}>
        <Typography.Text strong style={style}>
          Login with Google
        </Typography.Text>
        <Avatar size="large" icon={<GoogleOutlined />} />
      </Space>
    );
  }
};

export default GoogleLoginButton;
