import { FunctionComponent } from "react";
import { auth } from "../../logic/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import { Layout, Spin } from "antd";
import { Content } from "antd/es/layout/layout";

interface RequireAuthProps {
  children: JSX.Element;
}

const RequireAuth: FunctionComponent<RequireAuthProps> = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  if (loading) {
    return (
      <Layout>
        <Content
          style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size="large" />
        </Content>
      </Layout>
    );
  }

  return user ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
};

export default RequireAuth;
