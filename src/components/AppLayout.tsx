import { Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";
import AppNavbar from "./AppNavbar";
import { TooltipProvider } from "./ui/tooltip";
import AppMobileSheet from "./AppMobileSheet";

export default function AppLayout() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <div className='container mx-auto sm:px-6 lg:px-8'>
      <div className='min-h-full'>
        <div className='hidden sm:block'>
          <AppNavbar />
        </div>
        <div className='sm:hidden'>
          <AppMobileSheet />
        </div>
        <TooltipProvider>
          <Outlet />
        </TooltipProvider>
      </div>
    </div>
  );
}
