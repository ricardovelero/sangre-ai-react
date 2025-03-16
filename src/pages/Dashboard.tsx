import AnalyticsChart from "@/components/dashboard/AnalyticsChart";
import { AnalyticsChart2 } from "@/components/dashboard/AnalyticsChart2";
import Lipidos from "@/components/dashboard/Lipidos";
import PageHeader from "@/components/PageHeader";

export default function Dashboard() {
  return (
    <div className='py-10'>
      <PageHeader title='Dashboard' />
      <main>
        <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <AnalyticsChart />
            <AnalyticsChart2 />
            <Lipidos />
          </div>
        </div>
      </main>
    </div>
  );
}
