import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "@/store/authStore";
import Markdown from "react-markdown";
import { Analitica } from "@/types/analitica.types";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Printer } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatDateToSpanish, getFullName } from "@/lib/utils";
import Logo from "@/components/Logo";

export default function VerAnalitica() {
  const { id } = useParams();
  const [analitica, setAnalitica] = useState<Analitica | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnalitica = async () => {
      try {
        setLoading(true);

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

  console.log(analitica);

  return (
    <div className='py-10'>
      <header className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10 print:px-0 print:py-4 print:mb-0'>
        <div className='flex justify-between print:flex print:justify-between'>
          <div className='hidden print:block'>
            <Logo />
          </div>
          <div className='print:text-xs'>
            <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
              Informe de Analítica
            </h1>
            <p>Fecha: {formatDateToSpanish(analitica?.fecha_toma_muestra)}</p>
            <p>
              Paciente:{" "}
              {analitica?.paciente ? getFullName(analitica.paciente) : "N/D"}
            </p>
            <p>Laboratorio: {analitica?.laboratorio || "N/D"}</p>
            <p>Medico: {analitica?.medico || "N/D"}</p>
          </div>
          <div className='flex gap-2 print:hidden'>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant={"outline"} onClick={() => window.print()}>
                  <Printer />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Imprimir informe</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant={"outline"}>
                  <Edit />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Editar analítica</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type='button'
                  variant={"outline"}
                  onClick={() => navigate("/a/analiticas")}
                >
                  <ArrowLeft />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Regresar al listado de Analíticas</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </header>

      <main className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
        <article className='prose lg:prose-xl print:prose-sm print:max-w-none dark:prose-invert'>
          <Markdown>{analitica?.markdown}</Markdown>
        </article>
      </main>
    </div>
  );
}
