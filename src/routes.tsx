import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "@/components/PublicLayout";
import DashboardLayout from "@/components/AppLayout";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import PageNotFound from "@/pages/NotFound";
import AppError from "@/pages/AppError";
import ProtectedRoute from "@/components/ProtectedRoute";
import AboutUs from "@/pages/AboutUs";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />, // Layout para páginas públicas
    errorElement: <AppError />,
    children: [
      { index: true, element: <Home /> },
      { path: "about-us", element: <AboutUs /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
  {
    path: "/a",
    element: <ProtectedRoute />, // Protege todo el bloque
    errorElement: <AppError />,
    children: [
      {
        element: <DashboardLayout />,
        children: [{ path: "dashboard", element: <Dashboard /> }],
      },
    ],
  },
]);
