import { Fingerprint, SquareCheckBig, UserCircleIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "framer-motion";
import AccountForm from "./AccountForm";
import ChangePasswordForm from "./ChangePasswordForm";
import ConsentForm from "./ConsentForm";

const settingsOptions = [
  { name: "General", icon: UserCircleIcon },
  { name: "Seguridad", icon: Fingerprint },
  { name: "Privacidad", icon: SquareCheckBig },
];

export default function SettingsSidebar() {
  const [activeSection, setActiveSection] = useState("general");

  return (
    <div className={"flex flex-col sm:flex-row sm:justify-center gap-6"}>
      <aside className={"flex flex-col sm:w-64 sm:min-h-screen sm:gap-4"}>
        {settingsOptions.map(({ name, icon: Icon }) => (
          <Button
            variant='ghost'
            key={name}
            className={`flex items-center gap-2 text-left w-full ${
              activeSection.toLowerCase() === name.toLowerCase()
                ? "bg-accent text-accent-foreground"
                : ""
            }`}
            onClick={() => setActiveSection(name.toLowerCase())}
          >
            <Icon className='w-4 h-4' />
            {name}
          </Button>
        ))}
      </aside>

      <div className='flex-1 p-4 relative'>
        <AnimatePresence mode='wait'>
          {activeSection === "general" && (
            <motion.div
              key='general'
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className='absolute inset-0'
            >
              <AccountForm />
            </motion.div>
          )}
          {activeSection === "seguridad" && (
            <motion.div
              key='seguridad'
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className='absolute inset-0'
            >
              <ChangePasswordForm />
            </motion.div>
          )}
          {activeSection === "privacidad" && (
            <motion.div
              key='privacidad'
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className='absolute inset-0'
            >
              <ConsentForm />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
