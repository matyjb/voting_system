import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeModeProvider } from "./logic/contexts/ThemeModeContext.tsx";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeModeProvider>
      <App />
    </ThemeModeProvider>
  </React.StrictMode>
);
