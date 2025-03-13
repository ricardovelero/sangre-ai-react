import { NavLink } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import { useAuthStore } from "@/store/authStore";
import { LoaderCircle, LogIn, LogOut } from "lucide-react";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "¿Cómo funciona?", href: "/how-it-works" },
  { label: "Quienes somos", href: "/about-us" },
];

export default function NavBar() {
  const { isAuthenticated, loading } = useAuthStore();
  return (
    <header>
      <div className='flex items-center justify-between'>
        <div className='flex items-center justify-evenly'>
          <NavigationMenu className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8'>
            <Logo />
            <NavigationMenuList>
              {navItems.map((item, index) => (
                <NavigationMenuItem key={index}>
                  <NavLink
                    to={item.href}
                    end
                    className={({ isActive }) =>
                      cn(
                        navigationMenuTriggerStyle(),
                        isActive && "accent-accent-foreground"
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div>
          {loading ? (
            <LoaderCircle className='animate-spin' size={16} />
          ) : isAuthenticated ? (
            <>
              <NavLink
                to={"/a/dashboard"}
                className='bg-accent-foreground text-accent text-sm px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground'
              >
                Dashboard
              </NavLink>
              <NavLink
                to={"/logout"}
                className={`flex gap-1 ${navigationMenuTriggerStyle()}`}
              >
                Salir <LogOut size={16} />
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to={"/login"}
                className={`flex gap-1 ${navigationMenuTriggerStyle()}`}
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
      </div>
    </header>
  );
}
