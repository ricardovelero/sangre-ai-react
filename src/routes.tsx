import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "@/components/PublicLayout";
import AppLayout from "@/components/AppLayout";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import PageNotFound from "@/pages/NotFound";
import AppError from "@/pages/AppError";
import ProtectedRoute from "@/components/ProtectedRoute";
import AboutUs from "@/pages/AboutUs";
import ContactUs from "@/pages/ContactUs";
import Register from "@/pages/Register";
import LoginForm from "@/pages/Login";
import HowItWorks from "./pages/HowItWorks";
import Analiticas from "./pages/Analiticas";
import AnaliticasSubir from "./pages/AnaliticasCargar";
import Settings from "./pages/Settings";
import Test from "./pages/Test";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />, // Layout para páginas públicas
    errorElement: <AppError />,
    children: [
      { index: true, element: <Home /> },
      { path: "how-it-works", element: <HowItWorks /> },
      { path: "about-us", element: <AboutUs /> },
      { path: "contact-us", element: <ContactUs /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <LoginForm /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
  {
    path: "/a",
    element: <ProtectedRoute />, // Protege todo el bloque
    errorElement: <AppError />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "analiticas", element: <Analiticas /> },
          { path: "subir-analiticas", element: <AnaliticasSubir /> },
          { path: "ajustes", element: <Settings /> },
          { path: "test", element: <Test /> },
        ],
      },
    ],
  },
]);
