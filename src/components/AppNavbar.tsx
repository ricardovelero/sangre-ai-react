const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Analíticas", href: "/analitics" },
  { label: "Cargar Analíticas", href: "/upload" },
  { label: "Ajustes", href: "/settings" },
];

import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { cn } from "@/lib/utils";
import Image from "./ui/image";

export default function NavBar() {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center justify-evenly'>
        <NavLink to={"/"}>
          <Image
            src='/sangreai.webp'
            alt='Logo SangreAI'
            width={30}
            height={30}
          />
        </NavLink>
        <NavigationMenu>
          <NavigationMenuList>
            {navItems.map((item, index) => (
              <NavigationMenuItem>
                <NavLink
                  key={index}
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
      <LogoutButton />
    </div>
  );
}
