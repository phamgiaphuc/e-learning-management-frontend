import App from "@/App";
import ThemeModeProvider from "@/contexts/theme-mode-context";
import "@/index.css";
import AppMeta from "@/meta";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <StyledEngineProvider injectFirst={true}>
        <ThemeModeProvider>
          <CssBaseline />
          <AppMeta />
          <App />
        </ThemeModeProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  </StrictMode>,
);
