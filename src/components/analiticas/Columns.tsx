import { ColumnDef } from "@tanstack/react-table";
import { Analitica } from "@/types/analitica.types";
import { Checkbox } from "../ui/checkbox";
import Markdown from "react-markdown";
import { NavLink } from "react-router-dom";

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
    accessorKey: "markdown",
    header: "Reporte Analítica",
    cell: ({ row }) => {
      const analisis = row.original.markdown;
      return (
        <NavLink to={`/a/analitica/${row.original._id}`}>
          <div className='line-clamp-5 w-lg'>
            <Markdown>{analisis}</Markdown>
          </div>
        </NavLink>
      );
    },
  },
  {
    accessorKey: "datos_analitica",
    header: "Datos Analitica",
  },
];
