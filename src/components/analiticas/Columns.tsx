import { ColumnDef } from "@tanstack/react-table";
import { Analitica } from "@/types/analitica.types";
import { Checkbox } from "../ui/checkbox";
import { format, parseISO, isValid } from "date-fns";
import { es } from "date-fns/locale";
import { toTitleCase } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export const columns: ColumnDef<Analitica>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "Fecha Toma",
    cell: ({ row }) => {
      const fecha = row.original.datos_analitica.paciente?.fecha_toma_muestra;

      if (!fecha || fecha === "N/A") {
        return <span>N/A</span>;
      }
      // Intentamos convertir la fecha en un objeto Date
      const parsedDate = parseISO(fecha);
      if (!isValid(parsedDate)) {
        return <span>Fecha inválida</span>;
      }
      return (
        <span>{format(parsedDate, "d 'de' MMMM, yyyy", { locale: es })}</span>
      );
    },
  },
  {
    header: "Paciente",
    cell: ({ row }) => {
      const nombre = row.original.datos_analitica.paciente?.nombre;
      const apellidos = row.original.datos_analitica.paciente?.apellidos;

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
      const lab = row.original.datos_analitica.paciente?.laboratorio;

      return <span className='text-wrap'>{toTitleCase(lab)}</span>;
    },
  },
  {
    accessorKey: "resumen",
    header: "Resumen",
    cell: ({ row }) => {
      return (
        <Tooltip>
          <TooltipTrigger>
            <span className='block max-w-xs truncate'>
              {row.original.resumen}
            </span>
          </TooltipTrigger>
          <TooltipContent className='w-md' sideOffset={5}>
            {row.original.resumen}
          </TooltipContent>
        </Tooltip>
      );
    },
  },
];
