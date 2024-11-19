import App from "@/App";
import "@/configs/axios.config";
import ThemeModeProvider from "@/contexts/theme-mode-context";
import "@/index.css";
import AppMeta from "@/meta";
import store from "@/stores/store";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <StyledEngineProvider injectFirst={true}>
        <ThemeModeProvider>
          <CssBaseline />
          <AppMeta />
          <Provider store={store}>
            <App />
            <Toaster />
          </Provider>
        </ThemeModeProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  </StrictMode>,
);
