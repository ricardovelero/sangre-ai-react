import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import "./index.css";
import { Toaster } from "./components/ui/sonner";
import CookieConsent from "./components/CookieConsent";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
    <CookieConsent />
  </React.StrictMode>
);
