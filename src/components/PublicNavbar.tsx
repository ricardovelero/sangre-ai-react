import { NavLink } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import PublicAuthBottons from "./PublicAuthBottons";
import { navItems } from "@/lib/navItems";

export default function NavBar() {
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
        <PublicAuthBottons />
      </div>
    </header>
  );
}
