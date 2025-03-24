import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Notebook, Printer } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatDateToSpanish, getFullName } from "@/lib/utils";
import Logo from "@/components/Logo";
import { DialogDrawerEditAnalitica } from "@/components/analiticas/DialogDrawerEditAnalitica";
import { useAnaliticas } from "@/hooks/useAnaliticas";
import { useAnaliticaStore } from "@/store/analiticaStore";
import NotesForm from "@/components/analiticas/NotesForm";
import NotesList from "@/components/analiticas/NotesList";

export default function VerAnalitica() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [addNota, setAddNota] = useState(false);
  const { useAnaliticaById } = useAnaliticas();
  const { analitica, setAnalitica } = useAnaliticaStore();
  const {
    analitica: analiticaById,
    isLoading: loading,
    isError: error,
  } = useAnaliticaById(id || "");

  useEffect(() => {
    if (analiticaById) {
      setAnalitica(analiticaById);
    }
  }, [analiticaById]);

  if (loading) return <LoadingState message='Cargando informe...' />;
  if (error) return <ErrorState message={error?.message} />;

  return (
    <>
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
                  <Button
                    variant={"outline"}
                    onClick={() => {
                      setOpenDialog(true);
                      setAddNota(true);
                    }}
                  >
                    <Notebook />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Agregar nota</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={"outline"}
                    onClick={() => {
                      setOpenDialog(true);
                      setAddNota(false);
                    }}
                  >
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
          <div className='md:flex gap-4'>
            <article className='w-full md:w-3/4 prose lg:prose-xl print:prose-sm print:max-w-none dark:prose-invert'>
              <Markdown>{analitica?.markdown}</Markdown>
            </article>
            <aside className='w-full md:w-1/4 pl-4 print:hidden'>
              <NotesForm analiticaId={id || ""} />
              <NotesList analiticaId={id || ""} />
            </aside>
          </div>
        </main>
      </div>
      <DialogDrawerEditAnalitica
        setOpen={setOpenDialog}
        open={openDialog}
        addNota={addNota}
      />
    </>
  );
}
