import { useAuthStore } from "@/store/authStore";
import { LoaderCircle, LogIn } from "lucide-react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { navigationMenuTriggerStyle } from "./ui/navigation-menu";

export default function PublicAuthBottons() {
  const { isAuthenticated, loading } = useAuthStore();

  return (
    <div className='flex justify-between gap-2'>
      {loading ? (
        <LoaderCircle className='animate-spin' />
      ) : isAuthenticated ? (
        <>
          <NavLink
            to={"/a/dashboard"}
            className='bg-accent-foreground text-accent text-sm px-4 py-2 mr-2 rounded-md hover:bg-accent hover:text-accent-foreground'
          >
            Dashboard
          </NavLink>
          <LogoutButton />
        </>
      ) : (
        <>
          <NavLink
            to={"/login"}
            className={`flex gap-1 mr-2 ${navigationMenuTriggerStyle()}`}
          >
            Ingresar <LogIn size={16} />
          </NavLink>
          <NavLink
            to={"/register"}
            className='bg-accent-foreground text-accent text-sm px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground'
          >
            Registrarse
          </NavLink>
        </>
      )}
    </div>
  );
}
