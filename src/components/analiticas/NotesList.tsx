import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useNotes } from "@/hooks/useNotes";
import { Loader2, X } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

type NotesListProps = {
  analiticaId: string;
};

export default function NotesList({ analiticaId }: NotesListProps) {
  const { notes, isLoading, handleDeleteNote, isProcessing, mutate } =
    useNotes(analiticaId);

  if (isLoading) {
    return <Skeleton className='h-8 w-full mt-4' />;
  }

  return notes.length === 0 ? (
    <NoNotas />
  ) : (
    <ul className='space-y-6 mt-4'>
      {notes?.map((nota, index) => (
        <li key={index} className='relative flex gap-x-4'>
          <div
            className={cn(
              "absolute top-0 left-0 flex w-6 justify-center",
              index === notes.length - 1 ? "h-6" : "-bottom-6"
            )}
          >
            <div className='w-px bg-gray-200' />
          </div>
          <div className='relative flex size-6 flex-none items-center justify-center bg-white'>
            <div className='size-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300'></div>
          </div>
          <div className='flex-auto text-sm text-gray-600'>{nota.content}</div>
          <Button
            variant={"link"}
            className='text-red-500 hover:text-red-600'
            onClick={() => {
              handleDeleteNote(nota._id);
              mutate();
            }}
          >
            {isProcessing ? (
              <Loader2 className='animate-spin' size={14} />
            ) : (
              <X size={14} />
            )}
          </Button>
        </li>
      ))}
    </ul>
  );
}
function NoNotas() {
  return (
    <ul className='space-y-6 mt-4'>
      <li className='relative flex gap-x-4'>
        <div className='absolute top-0 left-0 flex w-6 justify-center h-6'>
          <div className='w-px bg-gray-200' />
        </div>
        <div className='relative flex size-6 flex-none items-center justify-center bg-white'>
          <div className='size-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300' />
        </div>
        <div className='flex-auto text-xs text-gray-500 pt-1'>
          Aquí aparecerán las notas.
        </div>
      </li>
    </ul>
  );
}
