import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import "./index.css";
import { Toaster } from "./components/ui/sonner";
import CookieConsent from "./components/CookieConsent";
import { ThemeProvider } from "./theme/ThemeProvider";
import ThemeToggle from "./theme/ThemeToggle";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
      <Toaster />
      <CookieConsent />
      <ThemeToggle />
    </ThemeProvider>
  </React.StrictMode>
);
