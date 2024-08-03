import { ConfigProvider, theme } from "antd";
import { FunctionComponent } from "react";
import { RouterProvider } from "react-router-dom";
import { useThemeMode } from "./logic/contexts/ThemeModeContext";
import { router } from "./router";

const App: FunctionComponent = () => {
  const { mode } = useThemeMode();

  return (
    <ConfigProvider
      theme={{
        algorithm:
          mode === "light" ? theme.defaultAlgorithm : theme.darkAlgorithm,
        token: {
          colorPrimary: "#d48806",
          colorBgBase:
            mode === "dark" ? "#141414" : theme.defaultSeed.colorBgBase,
        },
        components: {
          Layout: {
            headerBg: mode === "dark" ? "#1f1f1f" : "#fafafa",
            siderBg: mode === "dark" ? "#1f1f1f" : "#fafafa",
            triggerBg: mode === "dark" ? "#1f1f1f" : "#fafafa",
            triggerColor: mode === "dark" ? "#fafafa" : "#1f1f1f",
          },
          Menu: {
            itemBg: mode === "dark" ? "#1f1f1f" : "#fafafa",
          },
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};

export default App;
