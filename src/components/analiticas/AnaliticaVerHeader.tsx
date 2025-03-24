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
      <DialogDrawerEditAnalitica
        setOpen={setOpenDialog}
        open={openDialog}
        addNota={addNota}
      />
    </header>
  );
}
