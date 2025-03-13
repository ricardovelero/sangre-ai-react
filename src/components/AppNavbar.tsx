import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { cn } from "@/lib/utils";
import Logo from "./Logo";

const navItems = [
  { label: "Dashboard", href: "/a/dashboard" },
  { label: "Analíticas", href: "/a/analiticas" },
  { label: "Cargar Analíticas", href: "/a/subir-analiticas" },
  // { label: "Ajustes", href: "/a/settings" },
];

export default function NavBar() {
  return (
    <div className='flex items-center justify-between border-b border-gray-200 bg-white h-16 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl px-4 sm:px-6 lg:px-8'>
        <NavigationMenu className='flex h-16 justify-between'>
          <div className='flex shrink-0 items-center'>
            <Logo />
          </div>
          <NavigationMenuList className='hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8'>
            {navItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                <NavLink
                  to={item.href}
                  end
                  className={({ isActive }) =>
                    cn(
                      "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium h-16",
                      isActive
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
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
