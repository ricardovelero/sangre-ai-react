import { ColumnDef } from "@tanstack/react-table";
import { Analitica } from "@/types/analitica.types";
import { format, parseISO, isValid } from "date-fns";
import { es } from "date-fns/locale";
import { toTitleCase } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  ArrowUpDown,
  BookCopy,
  Copy,
  Delete,
  MoreHorizontal,
} from "lucide-react";

export const columns = (
  confirmDeleteAnalitica: (analitica: Analitica) => void
): ColumnDef<Analitica>[] => [
  {
    accessorKey: "fecha_toma_muestra",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha Toma
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const fecha = row.original.fecha_toma_muestra;

      if (!fecha || fecha === "N/A") {
        return <span>N/D</span>;
      }
      // Intentamos convertir la fecha en un objeto Date
      const parsedDate = parseISO(fecha);
      if (!isValid(parsedDate)) {
        return <span>Fecha inválida</span>;
      }
      return (
        <>
          <span className='sm:hidden'>
            {format(parsedDate, "d MMM, yyyy", { locale: es })}
          </span>
          <span className='hidden sm:block'>
            {format(parsedDate, "d 'de' MMMM, yyyy", { locale: es })}
          </span>
        </>
      );
    },
    filterFn: "includesString",
  },
  {
    header: "Paciente",
    cell: ({ row }) => {
      const nombre = row.original.paciente?.nombre;
      const apellidos = row.original.paciente?.apellidos;

      if (!nombre || !apellidos) {
        return <span>N/D</span>;
      }

      return (
        <span className='text-wrap'>
          {toTitleCase(apellidos)}, {toTitleCase(nombre)}
        </span>
      );
    },
  },
  {
    header: "Laboratorio",
    cell: ({ row }) => {
      const lab = row.original.laboratorio;

      if (!lab) {
        return <span>N/D</span>;
      }

      return <span className='text-wrap'>{toTitleCase(lab)}</span>;
    },
  },
  {
    accessorKey: "resumen",
    header: "Resumen",
    cell: ({ row }) => {
      const resumen = row.original.resumen;

      if (!resumen) {
        return <span>N/D</span>;
      }

      return (
        <Tooltip>
          <TooltipTrigger>
            <span className='block max-w-xs truncate'>{resumen}</span>
          </TooltipTrigger>
          <TooltipContent className='w-md' sideOffset={5}>
            {resumen}
          </TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const analitica = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Abrir menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
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
            {/* <DropdownMenuItem onClick={() => handleEditContact(analitica)}>
              <Edit />
              Editar
            </DropdownMenuItem> */}
            {/* <DropdownMenuItem onClick={() => confirmArchiveContact(analitica)}>
              <Archive />
              {analitica.archived
                ? "Restaurar analitica"
                : "Archivar analitica"}
            </DropdownMenuItem> */}
            <DropdownMenuItem
              className='text-red-500'
              onClick={() => confirmDeleteAnalitica(analitica)}
            >
              <Delete />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
