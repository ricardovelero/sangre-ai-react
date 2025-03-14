import axios from "axios";
import { Analitica } from "@/types/analitica.types";
import { columns } from "@/components/analiticas/Columns";
import { DataTable } from "@/components/analiticas/DataTable";
import CardView from "@/components/analiticas/CardView";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import EmptyState from "@/components/EmptyState";
import { Clipboard, IdCard, Rows4 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";

export default function Analiticas() {
  const { getToken } = useAuthStore();
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<string>();
  const [analiticas, setAnaliticas] = useState<Analitica[]>([]);
  const [isTableView, setIsTableView] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnalitica = async () => {
      try {
        setLoading(true);

        const token = await getToken();

        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/analitica`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = Array.isArray(response.data) ? response.data : [];
        setAnaliticas(data);

        setIsTableView(data.length > 4);
      } catch (err) {
        setError("Error al obtener la analítica");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalitica();
  }, []);

  if (loading) return <LoadingState message='Cargando analíticas...' />;
  if (error) return <ErrorState message={error} />;
  return (
    <div className='py-10'>
      <header className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10'>
        <div className='flex justify-between'>
          <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
            Analíticas
          </h1>
          <div className='flex'>
            <Button
              variant={"link"}
              className={cn(!isTableView && "bg-accent-foreground text-white")}
              onClick={() => setIsTableView(false)}
            >
              <IdCard />
            </Button>
            <Button
              variant={"link"}
              className={cn(isTableView && "bg-accent-foreground text-white")}
              onClick={() => setIsTableView(true)}
            >
              <Rows4 />
            </Button>
          </div>
        </div>
      </header>
      <main className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
        {analiticas?.length === 0 ? (
          <EmptyState
            message='No tienes analiticas.'
            icon={<Clipboard size={32} />}
            buttonLabel='Subir analítica'
            onButtonClick={() => navigate("/a/subir-analitica")}
          />
        ) : isTableView ? (
          <DataTable columns={columns} data={analiticas || []} />
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {analiticas.map((analitica) => (
              <CardView key={analitica._id} analitica={analitica} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
