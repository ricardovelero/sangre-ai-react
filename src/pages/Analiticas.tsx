import { Analitica } from "@/types/analitica.types";
import { columns } from "@/components/analiticas/Columns";
import { DataTable } from "@/components/analiticas/DataTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "@/store/authStore";

export default function Analiticas() {
  const { getToken } = useAuthStore();
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<string>();
  const [analiticas, setAnaliticas] = useState<Analitica[]>();
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
        setAnaliticas(response.data);
      } catch (err) {
        setError("Error al obtener la analítica");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalitica();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className='py-10'>
      <header>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
            Analíticas
          </h1>
        </div>
      </header>
      <main>
        <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
          <DataTable columns={columns} data={analiticas || []} />
        </div>
      </main>
    </div>
  );
}
