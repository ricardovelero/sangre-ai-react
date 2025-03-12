import { NavLink } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { cn } from "@/lib/utils";
import Logo from "./Logo";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "¿Cómo funciona?", href: "/how-it-works" },
  { label: "Quienes somos", href: "/about-us" },
];

export default function NavBar() {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center justify-evenly'>
        <Logo />
        <NavigationMenu>
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
        <NavLink to={"/login"} className={navigationMenuTriggerStyle()}>
          Ingresar
        </NavLink>
        <NavLink
          to={"/register"}
          className='bg-accent-foreground text-accent text-sm px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground'
        >
          Registrarse
        </NavLink>
      </div>
    </div>
  );
}
