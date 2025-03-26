import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Markdown from "react-markdown";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";

import { useAnaliticas } from "@/hooks/useAnaliticas";
import { useAnaliticaStore } from "@/store/analiticaStore";
import NotesForm from "@/components/analiticas/NotesForm";
import NotesList from "@/components/analiticas/NotesList";
import AnaliticaVerHeader from "@/components/analiticas/AnaliticaVerHeader";
import TagSearch from "@/components/analiticas/TagSearch";

export default function VerAnalitica() {
  const { id } = useParams();
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
        <AnaliticaVerHeader />
        <main className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
          <div className='md:flex gap-4'>
            <article className='w-full md:w-3/4 prose lg:prose-xl print:prose-sm print:max-w-none dark:prose-invert'>
              <Markdown>{analitica?.markdown}</Markdown>
            </article>
            <aside className='w-full md:w-1/4 py-4 sm:pl-4 print:hidden'>
              <div className='space-y-2'>
                <h3>Agregále una etiqueta a tu analítica:</h3>
                <TagSearch analitica={analitica || undefined} />
              </div>
              <div className='space-y-2'>
                <h3>Escribe una nota para tu anaítica:</h3>
                <NotesForm analiticaId={id || ""} />
                <NotesList analiticaId={id || ""} />
              </div>
            </aside>
          </div>
        </main>
      </div>
    </>
  );
}
