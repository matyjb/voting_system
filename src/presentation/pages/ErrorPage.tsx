import { Layout, Result } from "antd";
import { Content } from "antd/es/layout/layout";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  const status = error.status === 404 ? 404 : "error";
  const msg = error.status === 404 ? "Page not found" : "Something went wrong";

  return (
    <Layout className="fill-height">
      <Content className="center">
        <Result status={status} title="Oops!" subTitle={msg} />
      </Content>
    </Layout>
  );
}
