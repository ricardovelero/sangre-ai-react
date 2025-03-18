import AnalyticsChart from "@/components/dashboard/AnalyticsChart";
import BloodTestHeatmap from "@/components/dashboard/BloodTestHeatmap";
import PageHeader from "@/components/PageHeader";
import { useBloodTests } from "@/hooks/useBloodTests";

export default function Dashboard() {
  const { data, loading, error } = useBloodTests();

  return (
    <div className='py-10'>
      <PageHeader title='Dashboard' />
      <main>
        <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
          <div className='flex flex-col gap-8'>
            <BloodTestHeatmap data={data} loading={loading} error={error} />
            <AnalyticsChart />
          </div>
        </div>
      </main>
    </div>
  );
}
