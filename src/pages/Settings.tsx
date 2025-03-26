import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCircleIcon, Fingerprint, SquareCheckBig } from "lucide-react";
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
    <div className='py-10'>
      <PageHeader title={"Ajustes"} />
      <main className='p-4'>
        <Tabs defaultValue='account' orientation='vertical'>
          <TabsList>
            <TabsTrigger value='account'>
              <UserCircleIcon /> General
            </TabsTrigger>
            <TabsTrigger value='password'>
              <Fingerprint /> Seguridad
            </TabsTrigger>
            <TabsTrigger value='consent'>
              <SquareCheckBig /> Consentimiento
            </TabsTrigger>
          </TabsList>
          <TabsContent value='account'>
            Formulario de cambiar nombre y mail
          </TabsContent>
          <TabsContent value='password'>
            Formulario cambiar contraseña.
          </TabsContent>
          <TabsContent value='consent'>
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
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
