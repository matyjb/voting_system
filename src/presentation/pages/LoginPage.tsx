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
    <Layout>
      <Content>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            height: "100vh",
          }}
        >
          <div style={{ alignContent: "center" }}>
            <Card
              hoverable
              style={{ width: 240 }}
              onClick={signInWithGoogle}
              cover={
                <div
                  style={{
                    fontSize: 64,
                    margin: "64px 12px",
                    width: "auto",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <LoginOutlined />
                </div>
              }
            >
              <div style={{ textAlign: "center" }}>
                <GoogleLoginButton />
              </div>
            </Card>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default LoginPage;
