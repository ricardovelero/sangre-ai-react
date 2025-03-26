import PageHeader from "@/components/PageHeader";
import AccountForm from "@/components/settings/AccountForm";
import ChangePasswordForm from "@/components/settings/ChangePasswordForm";
import ConsentForm from "@/components/settings/ConsentForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCircleIcon, Fingerprint, SquareCheckBig } from "lucide-react";

export default function Settings() {
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
              <TabsTrigger value='privacy'>
                <SquareCheckBig /> Privacidad
              </TabsTrigger>
            </TabsList>
            <TabsContent value='account' className='py-6'>
              <AccountForm />
            </TabsContent>
            <TabsContent value='password' className='py-6'>
              <ChangePasswordForm />
            </TabsContent>
            <TabsContent value='privacy' className='py-6'>
              <ConsentForm />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
