import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Notebook, Printer } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatDateToSpanish, getFullName } from "@/lib/utils";
import Logo from "@/components/Logo";
import { DialogDrawerEditAnalitica } from "./DialogDrawerEditAnalitica";
import { useAnaliticaStore } from "@/store/analiticaStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AnaliticaVerHeader() {
  const { analitica } = useAnaliticaStore();
  const [openDialog, setOpenDialog] = useState(false);
  const [addNota, setAddNota] = useState(false);
  const navigate = useNavigate();
  return (
    <header className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 sm:mb-4 print:px-0 print:py-4 print:mb-0'>
      <div className='flex flex-col-reverse gap-6 sm:flex sm:justify-between print:flex-row print:justify-between'>
        <div className='hidden print:block print:w-1/2'>
          <Logo />
        </div>
        <div className='print:text-xs print:w-1/2 print:text-wrap'>
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
        <div className='flex gap-2 self-end print:hidden'>
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
          <div className='sm:hidden'>
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
          </div>
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
      <DialogDrawerEditAnalitica
        setOpen={setOpenDialog}
        open={openDialog}
        addNota={addNota}
      />
    </header>
  );
}
