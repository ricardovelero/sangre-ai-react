import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

export default function AppLayout() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);
  return (
    <div className='mx-auto sm:px-6 lg:px-24'>
      <NavBar />
      <Outlet />
    </div>
  );
}
