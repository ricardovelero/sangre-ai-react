import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";

export default function ConsentForm() {
  const [rememberedConsent, setRememberedConsent] = useState(false);

  useEffect(() => {
    const remembered = localStorage.getItem("rememberConsent") === "true";
    setRememberedConsent(remembered);
  }, []);

  const handleRevokeConsent = () => {
    localStorage.removeItem("rememberConsent");
    setRememberedConsent(false);
    toast.success(
      "Se ha revocado el consentimiento. Se te volverá a preguntar al subir una analítica."
    );
  };

  return (
    <div className='space-y-4'>
      <h2 className='text-2xl'>Consentimiento procesamiento de datos</h2>
      {rememberedConsent ? (
        <Button
          onClick={handleRevokeConsent}
          className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700'
        >
          Revocar consentimiento para el procesamiento de datos
        </Button>
      ) : (
        <p className='flex-wrap'>
          No has guardado el consentimiento o ya ha sido revocado.
        </p>
      )}
    </div>
  );
}
