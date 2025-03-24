export type Paciente = {
  id: string;
  nombre: string;
  apellidos: string;
  fecha_nacimiento: string; // ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)
  sexo: string;
};

export type Analito = {
  nombre: string;
  valor: string;
  unidad: string;
  rango_referencia: {
    minimo: number;
    maximo: number;
  };
  indicador: "Alto" | "Bajo" | "Normal";
  observaciones: string;
  nombre_normalizado: string;
};

export type Nota = {
  _id: string;
  content: string;
};

export type Analitica = {
  _id: string;
  fecha: string;
  paciente: Paciente;
  fecha_toma_muestra: string;
  laboratorio: string;
  medico: string;
  resumen: string | null;
  markdown: string | null;
  resultados: Analito[];
  notas?: Nota[];
};

export type DataPoint = {
  date: string;
  [key: string]: number | string;
};

export type AnaliticaResponse = {
  fecha: string;
  resultados: Analito[];
};
