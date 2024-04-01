import {
  FunctionComponent,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

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

  const setThemeMode = (themeMode: "light" | "dark") => {
    setMode(themeMode);
    localStorage.setItem("themeMode", themeMode);
  };

  const toggleThemeMode = () => {
    setThemeMode(mode === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const themeMode = localStorage.getItem("themeMode");
    if (themeMode === "light" || themeMode === "dark") {
      setThemeMode(themeMode);
    } else {
      const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (prefersDarkMode) {
        setThemeMode("dark");
      }
    }
  }, []);

  return (
    <ThemeModeContext.Provider
      value={{ mode: mode, toggleThemeMode: toggleThemeMode }}
    >
      {children}
    </ThemeModeContext.Provider>
  );
};

export default ThemeModeContext;
