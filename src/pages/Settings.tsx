import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Settings() {
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
    <>
      <PageHeader title={"Ajustes"} />
      <div className='p-4 max-w-xl mx-auto'>
        {rememberedConsent ? (
          <Button
            onClick={handleRevokeConsent}
            className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700'
          >
            Revocar consentimiento para el procesamiento de datos
          </Button>
        ) : (
          <p className='text-sm text-gray-600'>
            No has guardado el consentimiento o ya ha sido revocado.
          </p>
        )}
      </div>
    </>
  );
}
