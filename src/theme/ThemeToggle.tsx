import { Button } from "@/components/ui/button";
import { useTheme } from "@/theme/ThemeProvider";
import { MoonIcon, SunIcon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  console.log(theme);

  return (
    <Button
      type='button'
      variant={"ghost"}
      aria-label={`Activar modo ${theme === "dark" ? "claro" : "oscuro"}`}
      className='fixed bottom-5 right-5 flex items-center justify-center cursor-pointer w-[3rem] h-[3rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-white border-opacity-40 shadow-2xl rounded-full hover:scale-[1.15] active:scale-105 transition-all'
      onClick={toggleTheme}
    >
      {theme === "light" ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}
