import { auth, logout, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "antd";
import { LogoutOutlined, LoginOutlined } from "@ant-design/icons";
import { useEffect } from "react";

export default function GoogleLoginButton() {
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  if (user) {
    return (
      <Button
        type="default"
        size="large"
        onClick={logout}
        loading={loading}
        icon={<LogoutOutlined />}
      >
        Logout
      </Button>
    );
  }

  return (
    <Button
      type="primary"
      size="large"
      onClick={signInWithGoogle}
      loading={loading}
      icon={<LoginOutlined />}
    >
      Login with Google
    </Button>
  );
}
