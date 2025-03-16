import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "@/store/authStore";
import Markdown from "react-markdown";
import { Analitica } from "@/types/analitica.types";
import PageHeader from "@/components/PageHeader";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import { Button } from "@/components/ui/button";

export default function VerAnalitica() {
  const { id } = useParams();
  const [analitica, setAnalitica] = useState<Analitica | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getToken } = useAuthStore();
  const navigate = useNavigate();

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

  if (loading) return <LoadingState message='Cargando informe...' />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className='py-10'>
      <PageHeader title='Informe de tu analítica' />
      <Button
        type='button'
        variant={"outline"}
        onClick={() => navigate("/a/analiticas")}
      >
        Regresar a Analíticas
      </Button>
      <main className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
        <article className='prose lg:prose-xl'>
          <Markdown>{analitica?.markdown}</Markdown>
        </article>
      </main>
    </div>
  );
}
