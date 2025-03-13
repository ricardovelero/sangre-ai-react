import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "@/store/authStore";
import Markdown from "react-markdown";
import { Analitica } from "@/types/analitica.types";

export default function VerAnalitica() {
  const { id } = useParams();
  const [analitica, setAnalitica] = useState<Analitica | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getToken } = useAuthStore();

  useEffect(() => {
    const fetchAnalitica = async () => {
      try {
        setLoading(true);

        const token = await getToken();

        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/analitica/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAnalitica(response.data);
      } catch (err) {
        setError("Error al obtener la analítica");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAnalitica();
    }
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='py-10'>
      <header>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
            Informe de tu analítica
          </h1>
        </div>
      </header>
      <main>
        <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
          <Markdown>{analitica?.markdown}</Markdown>
        </div>
      </main>
    </div>
  );
}
