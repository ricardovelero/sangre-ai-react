import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Notebook, Printer, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn, formatDateToSpanish, getFullName } from "@/lib/utils";
import Logo from "@/components/Logo";
import { DialogDrawerEditAnalitica } from "@/components/analiticas/DialogDrawerEditAnalitica";
import { useAnaliticas } from "@/hooks/useAnaliticas";
import { useAnaliticaStore } from "@/store/analiticaStore";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Analitica } from "@/types/analitica.types";

const addNotaSchema = z.object({
  notas: z.string().min(1, {
    message: "Debes ingresar una nota.",
  }),
});

export default function VerAnalitica() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [addNota, setAddNota] = useState(false);
  const { useAnaliticaById, updateAnalitica, handleDeleteNota } =
    useAnaliticas();
  const { analitica, setAnalitica } = useAnaliticaStore();
  const {
    analitica: analiticaById,
    isLoading: loading,
    isError: error,
    mutate,
  } = useAnaliticaById(id || "");

  useEffect(() => {
    if (analiticaById) {
      setAnalitica(analiticaById);
    }
  }, [analiticaById]);

  const form = useForm<z.infer<typeof addNotaSchema>>({
    resolver: zodResolver(addNotaSchema),
    defaultValues: {
      notas: "",
    },
  });

  type PartialAnaliticaData = Partial<z.infer<typeof addNotaSchema>>;

  async function onSubmit(data: PartialAnaliticaData) {
    const notaArray = data.notas ? [data.notas] : [];

    const analiticaData: Partial<Analitica> = {
      _id: analitica?._id || "",
      notas: notaArray,
    };

    updateAnalitica(analiticaData as Analitica);
    form.reset();
    await mutate();
  }

  const reversedNotas = analitica?.notas?.slice().reverse();

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
            <aside className='w-full md:w-1/4 pl-4'>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='relative'
                >
                  <FormField
                    control={form.control}
                    name='notas'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder='agrega una nota'
                            {...field}
                            rows={6}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormDescription />
                  <div className='absolute inset-x-0 bottom-0 flex justify-end py-2 pr-2 pl-3'>
                    <Button
                      variant={"outline"}
                      type='submit'
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting
                        ? "Guardando nota..."
                        : "Guardar"}
                    </Button>
                  </div>
                </form>
              </Form>
              {analitica?.notas?.length === 0 ? (
                <NoNotas />
              ) : (
                <ul className='space-y-6 mt-4'>
                  {reversedNotas?.map((nota, index) => (
                    <li key={index} className='relative flex gap-x-4'>
                      <div
                        className={cn(
                          "absolute top-0 left-0 flex w-6 justify-center",
                          index === (analitica?.notas?.length || 0) - 1
                            ? "h-6"
                            : "-bottom-6"
                        )}
                      >
                        <div className='w-px bg-gray-200' />
                      </div>
                      <div className='relative flex size-6 flex-none items-center justify-center bg-white'>
                        <div className='size-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300' />
                      </div>
                      <div className='flex-auto text-sm text-gray-600'>
                        {nota}
                      </div>
                      <Button
                        variant={"link"}
                        className='text-red-500 hover:text-red-600'
                        onClick={() => {
                          handleDeleteNota(nota, analitica?._id || "");
                          mutate();
                        }}
                      >
                        <X size={14} />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
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
