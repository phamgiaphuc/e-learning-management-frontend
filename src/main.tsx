import App from "@/App";
import "@/index.css";
import theme from "@/theme/theme";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <StyledEngineProvider injectFirst={true}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  </StrictMode>,
);
