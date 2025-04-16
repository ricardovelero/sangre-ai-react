import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import PublicLayout from "@/components/PublicLayout";
import AppLayout from "@/components/AppLayout";
import PageNotFound from "@/pages/NotFound";
import AppError from "@/pages/AppError";
import ProtectedRoute from "@/components/ProtectedRoute";
import LoadingState from "./components/LoadingState";

const Home = lazy(() => import("@/pages/Home"));
const AboutUs = lazy(() => import("@/pages/AboutUs"));
const HowItWorks = lazy(() => import("@/pages/HowItWorks"));
const LoginForm = lazy(() => import("@/pages/Login"));
const ForgotPassword = lazy(() => import("@/pages/ForgotPassword"));
const ResetPassword = lazy(() => import("@/pages/ResetPassword"));
const Register = lazy(() => import("@/pages/Register"));
const ContactUs = lazy(() => import("@/pages/ContactUs"));
const TermsAndConditions = lazy(() => import("@/pages/TermsAndConditions"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Analiticas = lazy(() => import("@/pages/Analiticas"));
const VerAnalitica = lazy(() => import("@/pages/AnaliticaVer"));
const AnaliticasSubir = lazy(() => import("@/pages/AnaliticasSubir"));
const Settings = lazy(() => import("@/pages/Settings"));

const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<LoadingState />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />, // Layout para páginas públicas
    errorElement: <AppError />,
    children: [
      { index: true, element: withSuspense(Home) },
      { path: "how-it-works", element: withSuspense(HowItWorks) },
      { path: "about-us", element: withSuspense(AboutUs) },
      { path: "contact-us", element: withSuspense(ContactUs) },
      { path: "register", element: withSuspense(Register) },
      { path: "login", element: withSuspense(LoginForm) },
      { path: "forgot-password", element: withSuspense(ForgotPassword) },
      { path: "reset-password/:token", element: withSuspense(ResetPassword) },
      { path: "privacy-policy", element: withSuspense(PrivacyPolicy) },
      {
        path: "terms-and-conditions",
        element: withSuspense(TermsAndConditions),
      },
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
          { path: "dashboard", element: withSuspense(Dashboard) },
          { path: "analiticas", element: withSuspense(Analiticas) },
          { path: "analitica/:id", element: withSuspense(VerAnalitica) },
          { path: "subir-analitica", element: withSuspense(AnaliticasSubir) },
          { path: "ajustes", element: withSuspense(Settings) },
        ],
      },
    ],
  },
]);
