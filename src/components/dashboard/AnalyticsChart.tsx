import { useAnaliticaData } from "@/hooks/useAnaliticaData";
import LineaChart from "./LineaChart";

const DashboardCharts = () => {
  const serieBlanca = useAnaliticaData({ endpoint: "/analitica/serie-blanca" });
  const serieRoja = useAnaliticaData({ endpoint: "/analitica/serie-roja" });
  const lipidos = useAnaliticaData({ endpoint: "/analitica/lipidos" });

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      <LineaChart
        title='Serie Blanca'
        description='Evolución de la serie blanca'
        parameters={serieBlanca.parameters}
        data={serieBlanca.data}
        loading={serieBlanca.loading}
        error={serieBlanca.error}
      />
      <LineaChart
        title='Serie Roja'
        description='Evolución de la serie roja'
        parameters={serieRoja.parameters}
        data={serieRoja.data}
        loading={serieRoja.loading}
        error={serieRoja.error}
      />
      <LineaChart
        title='Lípidos'
        description='Evolución de lípidos en sangre'
        parameters={lipidos.parameters}
        data={lipidos.data}
        loading={lipidos.loading}
        error={lipidos.error}
      />
    </div>
  );
};

export default DashboardCharts;
