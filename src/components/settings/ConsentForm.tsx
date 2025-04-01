import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Switch } from "../ui/switch";

export default function ConsentForm() {
  const [rememberedConsent, setRememberedConsent] = useState(false);

  useEffect(() => {
    const remembered = localStorage.getItem("rememberConsent") === "true";
    setRememberedConsent(remembered);
  }, []);

  const handleToggleConsent = (checked: boolean) => {
    if (checked) {
      localStorage.setItem("rememberConsent", "true");
      setRememberedConsent(true);
      toast.success("Consentimiento guardado. No se te volverá a preguntar.");
    } else {
      localStorage.removeItem("rememberConsent");
      setRememberedConsent(false);
      toast.success(
        "Se ha revocado el consentimiento. Se te volverá a preguntar al subir una analítica."
      );
    }
  };

  return (
    <div className='space-y-4'>
      <h2 className='text-2xl'>Tu consentimiento</h2>
      <div className='flex flex-row items-center justify-between w-full sm:w-lg rounded-lg border p-3 shadow-sm'>
        <div>
          <h3 className='font-semibold'>
            Consentimiento para el procesamiento de datos
          </h3>
          <p className='text-sm text-muted-foreground'>
            Al activarla, no se te volverá a preguntar al subir una analítica.
          </p>
        </div>
        <Switch
          checked={rememberedConsent}
          onCheckedChange={handleToggleConsent}
          className='cursor-pointer'
        />
      </div>
    </div>
  );
}
