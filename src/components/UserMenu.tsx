import { Settings } from "lucide-react";
import LogoutButton from "./LogoutButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { NavLink } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import { useAuthStore } from "@/store/authStore";

export default function UserMenu() {
  const { fullName, user } = useAuthStore();
  const dropdownMenuLabel = fullName ? fullName : user?.email || "Usuario";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='cursor-pointer'>
        <UserAvatar />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{dropdownMenuLabel}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className='flex items-center gap-2 p-3 cursor-pointer'
        >
          <NavLink to='/a/ajustes'>
            <Settings /> Ajustes
          </NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
