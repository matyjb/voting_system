import { FunctionComponent, useEffect } from "react";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { auth } from "../../logic/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";

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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        height: "100vh",
      }}
    >
      <GoogleLoginButton />
    </div>
  );
};

export default LoginPage;
