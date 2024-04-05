import { FunctionComponent, useEffect } from "react";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { auth, signInWithGoogle } from "../../logic/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginOutlined } from "@ant-design/icons";
import { Card, Layout } from "antd";
import { Content } from "antd/es/layout/layout";

interface LoginPageProps {}

const LoginPage: FunctionComponent<LoginPageProps> = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (user) {
      navigate(state?.path || "/edit");
    }
  }, [user]);

  return (
    <Layout className="fill-height">
      <Content className="center">
        <Card
          hoverable
          style={{ width: 240, textAlign: "center" }}
          onClick={signInWithGoogle}
          cover={
            <LoginOutlined
              style={{
                fontSize: 64,
                margin: "64px 12px",
                width: "auto",
                display: "flex",
                justifyContent: "center",
              }}
            />
          }
        >
          <GoogleLoginButton />
        </Card>
      </Content>
    </Layout>
  );
};

export default LoginPage;
