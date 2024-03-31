import { FunctionComponent, createContext, useContext, useState } from "react";

const ThemeModeContext = createContext<{
  mode: "light" | "dark";
  toggleThemeMode: () => void;
}>({ mode: "light", toggleThemeMode: () => {} });

export function useThemeMode() {
  return useContext(ThemeModeContext);
}

interface ThemeModeProviderProps {
  children: JSX.Element;
}

export const ThemeModeProvider: FunctionComponent<ThemeModeProviderProps> = ({
  children,
}) => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const toggleThemeMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  return (
    <ThemeModeContext.Provider
      value={{ mode: mode, toggleThemeMode: toggleThemeMode }}
    >
      {children}
    </ThemeModeContext.Provider>
  );
};

export default ThemeModeContext;
