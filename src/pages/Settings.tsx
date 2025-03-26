import PageHeader from "@/components/PageHeader";
import AccountForm from "@/components/settings.tsx/AccountForm";
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
        <div className='flex flex-col items-center justify-center px-6 py-12 lg:px-8'>
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
            <TabsContent value='account' className='py-6'>
              <AccountForm />
            </TabsContent>
            <TabsContent value='password'>
              Formulario cambiar contraseña.
            </TabsContent>
            <TabsContent value='consent' className='py-6'>
              <div className='py-6'>
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
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
