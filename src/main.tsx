import App from "@/App";
import "@/configs/axios.config";
import ThemeModeProvider from "@/contexts/theme-mode-context";
import "@/index.css";
import AppMeta from "@/meta";
import { persistor, store } from "@/stores/store";
import { PersistGate } from "redux-persist/integration/react";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <StyledEngineProvider injectFirst={true}>
        <ThemeModeProvider>
          <CssBaseline />
          <AppMeta />
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <App />
              <Toaster position="bottom-left" reverseOrder={false} />
            </PersistGate>
          </Provider>
        </ThemeModeProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  </StrictMode>,
);
