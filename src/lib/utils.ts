import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toTitleCase(str: string) {
  if (str && str !== "N/A" && typeof str === "string") {
    return str
      .toLowerCase()
      .replace(/[-_]/g, " ")
      .replace(
        /(^|\s)([a-záéíóúüñ])/g,
        (_, boundary, char) => boundary + char.toUpperCase()
      );
  }
}

export function normalizeString(str: string) {
  return str
    .normalize("NFD") // Decompose accents
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .toLowerCase(); // Convert to lowercase
}

export function normalizeStringAndFixSomeNames(str: string) {
  return normalizeString(str)
    .replace(/volumen corpuscular medio \(vcm\)/g, "vcm")
    .replace(/volumen corpuscular medio/g, "vcm")
    .replace(/hemoglobina corpuscular media \(hcm\)/g, "hcm")
    .replace(/hemoglobina corpuscular media/g, "hcm")
    .replace(/concentracion de hemoglobina corpuscular media \(chcm\)/g, "chcm")
    .replace(/concentracion de hemoglobina corpuscular media/g, "chcm")
    .replace(/indice de distribucion de hematies \(idh\)/g, "idh")
    .replace(/indice de distribucion plaquetaria/g, "idp")
    .replace(/vsg primera hora \(velocidad de sedimentacion globular\)/g, "vsg")
    .replace(/\s*\(.*?\)/g, "");
}

/**
 * Formats a date string to a human-readable format in Spanish locale.
 * @param dateString - The date string to format.
 * @returns The formatted date string or "N/D" if the date is invalid.
 */
export function formatDateToSpanish(
  dateString: string | null | undefined
): string {
  if (!dateString) return "N/D";

  const date = new Date(dateString);
  const isValidDate = !isNaN(date.getTime());

  return isValidDate ? format(date, "PPPP", { locale: es }) : "N/D";
}

/**
 * Outputs the full name of a patient.
 * @param paciente - The patient object.
 * @returns The full name of the patient or "N/D" if the patient is invalid.
 */
type Paciente = {
  apellidos?: string | null;
  nombre?: string | null;
};

export function getFullName(paciente: Paciente): string {
  const { apellidos, nombre } = paciente;

  if (!apellidos || !nombre) {
    return "N/D";
  }

  return `${apellidos}, ${nombre}`;
}
