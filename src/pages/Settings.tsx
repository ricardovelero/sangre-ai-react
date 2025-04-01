import PageHeader from "@/components/PageHeader";
import SettingsSidebar from "@/components/settings/SettingsSidebar";

export default function Settings() {
  return (
    <div className='py-10'>
      <PageHeader title={"Ajustes"} />
      <main className='p-4'>
        <SettingsSidebar />
      </main>
    </div>
  );
}
