import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Switch } from "antd";
import { FunctionComponent } from "react";
import { useThemeMode } from "../../logic/contexts/ThemeModeContext";

interface ThemeToggleProps {}

const ThemeToggle: FunctionComponent<ThemeToggleProps> = () => {
  const { mode, toggleThemeMode } = useThemeMode();

  return (
    <Switch
      checkedChildren={<SunOutlined />}
      unCheckedChildren={<MoonOutlined />}
      value={mode === "light"}
      onChange={toggleThemeMode}
    />
  );
};

export default ThemeToggle;
