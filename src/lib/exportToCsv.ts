import { Analitica } from "@/types";
import { getFullName } from "./utils";

export function exportarAnaliticaCSV(analitica: Analitica) {
  if (!analitica) return;

  const metadata = [
    ["Paciente", getFullName(analitica.paciente)],
    ["Fecha Nacimiento", analitica.paciente.fecha_nacimiento || ""],
    ["Laboratorio", analitica.laboratorio || ""],
    ["Fecha toma muestra", analitica.fecha_toma_muestra || ""],
    ["Medico", analitica.medico || ""],
  ]
    .map((line) => line.join(","))
    .join("\n");

  const headers = ["nombre", "nombre_normalizado", "valor", "unidad"];

  const rows = analitica.resultados.map((analito) => {
    return [
      analito.nombre,
      analito.nombre_normalizado,
      analito.valor,
      analito.unidad,
    ].join(",");
  });

  const csvContent = [metadata, "", headers.join(","), ...rows].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute(
    "download",
    `analitica_${analitica.fecha_toma_muestra}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
