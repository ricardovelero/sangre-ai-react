import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Logo from "./Logo";
import PublicAuthBottons from "./PublicAuthBottons";
import { navItems } from "@/lib/navItems";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function PublicMobileSheet() {
  const location = useLocation();
  return (
    <header className='m-4 flex justify-between'>
      <Logo />
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='outline'>
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent className='p-4 bg-opacity-80 backdrop-blur-[0.5rem]'>
          <SheetHeader>
            <SheetTitle>Menú Principal</SheetTitle>
            <SheetDescription>
              Cuida tu salud con una analítica anual.
            </SheetDescription>
          </SheetHeader>
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.href;
            return (
              <SheetClose asChild key={index}>
                <Link
                  to={item.href}
                  className={cn(
                    "bg-accent py-2 px-4 rounded-md block",
                    isActive && "bg-accent-foreground text-accent"
                  )}
                >
                  {item.label}
                </Link>
              </SheetClose>
            );
          })}
          <SheetFooter>
            <SheetClose asChild>
              <PublicAuthBottons />
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </header>
  );
}
