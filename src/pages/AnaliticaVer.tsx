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
// import TagTextArea from "@/components/analiticas/TagTextArea";

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
            <aside className='w-full md:w-1/4 pl-4 print:hidden'>
              {/* <TagTextArea analiticaId={id || ""} /> */}
              <NotesForm analiticaId={id || ""} />
              <NotesList analiticaId={id || ""} />
            </aside>
          </div>
        </main>
      </div>
    </>
  );
}
