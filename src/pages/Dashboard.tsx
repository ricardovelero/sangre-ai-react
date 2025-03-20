import AnalyticsChart from "@/components/dashboard/AnalyticsChart";
import PageHeader from "@/components/PageHeader";

export default function Dashboard() {
  return (
    <div className='py-10'>
      <PageHeader title='Dashboard' />
      <main>
        <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
          <div className='flex flex-col gap-8'>
            <AnalyticsChart />
          </div>
        </div>
      </main>
    </div>
  );
}
