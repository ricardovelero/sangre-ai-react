import AnalyticsChart from "@/components/dashboard/AnalyticsChart";
import UserGlance from "@/components/dashboard/UserGlance";
import EmptyState from "@/components/EmptyState";
import LoadingState from "@/components/LoadingState";
import PageHeader from "@/components/PageHeader";
import { useAnaliticas } from "@/hooks/useAnaliticas";
import { HeartCrack, Clipboard } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { analiticas, isLoading } = useAnaliticas();
  const navigate = useNavigate();

  return (
    <div className='py-10'>
      <PageHeader title='Dashboard' />
      <main>
        {analiticas && analiticas.length > 0 ? (
          <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-4'>
            <div className='space-y-4 mb-12'>
              <h2 className='text-2xl font-semibold'>
                Vista rápida de tu última analítica
              </h2>
              <p>
                Una vista de pájaro de los lípidos tomados de tu última
                analítica. Siempre es importante contar con la consulta de un
                médico especializado. La evaluación del riesgo de estos valores
                son según la opinión del{" "}
                <a
                  href='https://peterattiamd.com/'
                  target='_blank'
                  className='underline hover:border-b-2 hover:border-blue-500 hover:no-underline'
                >
                  Dr. Peter Attia.
                </a>{" "}
                Haz click aquí para{" "}
                <NavLink
                  to={`/a/analitica/${analiticas[0]._id}`}
                  className='underline hover:border-b-2 hover:border-blue-500 hover:no-underline'
                >
                  ver tu última analítica.
                </NavLink>
              </p>
              <UserGlance analiticas={analiticas} />
            </div>
            <div className='flex flex-col gap-8'>
              <h2 className='text-2xl font-semibold'>Gráficas</h2>
              <p>
                Tomando en cuenta tus últimas analíticas, elaboramos algunos
                gráficos para que tengas una idea de la tendencia de tus
                valores.
              </p>
              <AnalyticsChart />
            </div>
          </div>
        ) : isLoading ? (
          <LoadingState />
        ) : (
          <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-4'>
            <div className='w-xl mx-auto space-y-4'>
              <h2 className='text-2xl font-semibold flex items-center gap-2'>
                No tienes analíticas <HeartCrack />
              </h2>
              <p>
                Una vez que cargues tu primera analítica, aquí empezará a
                aperecer datos y gráficos sobre tus valores y algunas los
                niveles recomendados
              </p>
              <EmptyState
                icon={<Clipboard size={32} />}
                buttonLabel='Sube tu primera analítica'
                onButtonClick={() => navigate("/a/subir-analitica")}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
