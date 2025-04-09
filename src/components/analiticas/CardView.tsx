import { Analitica } from "@/types/analitica.types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Markdown from "react-markdown";
import { Button } from "../ui/button";
import remarkGfm from "remark-gfm";
import { useNavigate } from "react-router-dom";
import { formatDateToSpanish } from "@/lib/utils";
import { toTitleCase } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { BookCopy, Copy, Delete, MoreVertical } from "lucide-react";
import React from "react";

type CardViewProps = {
  analitica: Analitica;
  setAnaliticaToDelete: React.Dispatch<
    React.SetStateAction<{ _id: string } | null>
  >;
  setDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CardView({
  analitica,
  setAnaliticaToDelete,
  setDeleteDialogOpen,
}: CardViewProps) {
  const navigate = useNavigate();

  return (
    <>
      <Card key={analitica._id}>
        <CardHeader className='flex items-start justify-between'>
          <div>
            <CardTitle>Informe de analítica</CardTitle>
            <CardDescription>
              Fecha: {formatDateToSpanish(analitica.fecha_toma_muestra)}
              <br />
              Paciente: {toTitleCase(analitica.paciente.apellidos) ||
                "N/D"}, {toTitleCase(analitica.paciente.nombre) || "N/D"}
              <br />
              Laboratorio: {toTitleCase(analitica.laboratorio) || "N/D"}
              <br />
              Medico: {toTitleCase(analitica.medico) || "N/D"}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className='cursor-pointer'>
              <span className='sr-only'>Abrir menu</span>
              <MoreVertical size={20} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(analitica?.markdown || "")
                }
              >
                <BookCopy />
                Copiar Informe
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(analitica?.resumen || "")
                }
              >
                <Copy />
                Copiar resumen
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className='text-red-500'
                onClick={() => {
                  setAnaliticaToDelete(analitica);
                  setDeleteDialogOpen(true);
                }}
              >
                <Delete />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        {analitica.resumen ? (
          <CardContent>{analitica.resumen}</CardContent>
        ) : (
          <CardContent className='line-clamp-6'>
            <Markdown remarkPlugins={[remarkGfm]}>
              {analitica.markdown}
            </Markdown>
          </CardContent>
        )}
        <CardFooter>
          <Button onClick={() => navigate("/a/analitica/" + analitica._id)}>
            Ver informe completo
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
