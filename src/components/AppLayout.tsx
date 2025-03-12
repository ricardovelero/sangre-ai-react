import { Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";
import AppNavbar from "./AppNavbar";

export default function AppLayout() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <div className='mx-auto sm:px-6 lg:px-24'>
      <AppNavbar />
      <Outlet />
    </div>
  );
}
