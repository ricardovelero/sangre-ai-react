interface ReferenceValue {
  min?: number; // Valor mínimo normal (si aplica)
  max?: number; // Valor máximo normal (si aplica)
  label: string;
  type: "range" | "max" | "min" | "target";
  unit?: string; // Unidad de medida (ej: mg/dL, g/L, etc.)
}

interface ReferenceConfig {
  [key: string]: ReferenceValue;
}

export const referenceValues: ReferenceConfig = {
  // Lípidos
  "colesterol total": {
    max: 200,
    label: "Valor máximo recomendado",
    type: "max",
    unit: "mg/dL",
  },
  "colesterol no hdl": {
    max: 100,
    label: "Valor máximo recomendado",
    type: "max",
    unit: "mg/dL",
  },
  ldl: {
    max: 100,
    label: "Valor máximo recomendado",
    type: "max",
    unit: "mg/dL",
  },
  hdl: {
    min: 60,
    label: "Valor mínimo recomendado",
    type: "min",
    unit: "mg/dL",
  },
  trigliceridos: {
    max: 100,
    label: "Valor máximo recomendado",
    type: "max",
    unit: "mg/dL",
  },

  // Serie Blanca (Rango de valores normales)
  leucocitos: {
    min: 4.0,
    max: 11.0,
    label: "Rango normal",
    type: "range",
    unit: "×10³/µL",
  },
  neutrofilos: {
    min: 2.0,
    max: 7.5,
    label: "Rango normal",
    type: "range",
    unit: "×10³/µL",
  },
  linfocitos: {
    min: 1.0,
    max: 4.5,
    label: "Rango normal",
    type: "range",
    unit: "×10³/µL",
  },
  monocitos: {
    min: 0.2,
    max: 0.8,
    label: "Rango normal",
    type: "range",
    unit: "×10³/µL",
  },
  eosinofilos: {
    min: 0.0,
    max: 0.5,
    label: "Rango normal",
    type: "range",
    unit: "×10³/µL",
  },
  basofilos: {
    min: 0.0,
    max: 0.1,
    label: "Rango normal",
    type: "range",
    unit: "×10³/µL",
  },

  // Serie Roja (Rango de valores normales)
  hematies: {
    min: 4.2,
    max: 5.7,
    label: "Rango normal",
    type: "range",
    unit: "×10⁶/µL",
  },
  hemoglobina: {
    min: 12,
    max: 17,
    label: "Rango normal",
    type: "range",
    unit: "g/dL",
  },
  hematocrito: {
    min: 37,
    max: 50,
    label: "Rango normal",
    type: "range",
    unit: "%",
  },
  vcm: { min: 80, max: 100, label: "Rango normal", type: "range", unit: "fL" },
  hcm: { min: 27, max: 32, label: "Rango normal", type: "range", unit: "pg" },
  chcm: {
    min: 32,
    max: 36,
    label: "Rango normal",
    type: "range",
    unit: "g/dL",
  },

  // Serie Plaquetar
  plaquetas: {
    min: 150000,
    max: 400000,
    label: "Rango normal",
    type: "range",
    unit: "/µL",
  },
  vpm: { max: 12, label: "Valor máximo normal", type: "max", unit: "fL" },

  // Eritrosedimentación
  vsg: { max: 20, label: "Valor máximo normal", type: "max" },

  // Bioquímica Clínica
  glucosa: { min: 70, max: 100, label: "Rango normal", type: "range" },
  hemoglobina_glicosilada_a1c: {
    max: 5.7,
    label: "Valor máximo recomendado",
    type: "max",
  },
  creatinina: { min: 0.6, max: 1.2, label: "Rango normal", type: "range" },
  urea: { min: 15, max: 50, label: "Rango normal", type: "range" },
  acido_urico: { min: 3.4, max: 7, label: "Rango normal", type: "range" },

  // Transaminasas
  tgo_ast: { max: 40, label: "Valor máximo normal", type: "max" },
  tgp_alt: { max: 40, label: "Valor máximo normal", type: "max" },
  ggt: { max: 60, label: "Valor máximo normal", type: "max" },
  fosfatasa_alcalina: {
    min: 40,
    max: 150,
    label: "Rango normal",
    type: "range",
  },

  // Proteínas y Albúmina
  proteinas_totales: {
    min: 6.0,
    max: 8.5,
    label: "Rango normal",
    type: "range",
  },
  albumina: { min: 3.5, max: 5.0, label: "Rango normal", type: "range" },

  // Pruebas Reumáticas
  proteina_c_reactiva: { max: 5, label: "Valor máximo normal", type: "max" },
  factor_reumatoide: { max: 14, label: "Valor máximo normal", type: "max" },
  anticuerpos_antinucleares: {
    max: 1.2,
    label: "Valor máximo normal",
    type: "max",
  },
  anticcp: { max: 20, label: "Valor máximo normal", type: "max" },

  // Hormonas
  tsh: { min: 0.5, max: 4.5, label: "Rango normal", type: "range" },
  t3: { min: 2.3, max: 4.2, label: "Rango normal", type: "range" },
  t4: { min: 0.8, max: 1.8, label: "Rango normal", type: "range" },
  fsh: { min: 1.5, max: 12, label: "Rango normal", type: "range" },
  lh: { min: 1.0, max: 9, label: "Rango normal", type: "range" },
  testosterona: { min: 300, max: 1000, label: "Rango normal", type: "range" },
  estradiol: { min: 10, max: 50, label: "Rango normal", type: "range" },
  progesterona: { min: 0.2, max: 20, label: "Rango normal", type: "range" },
  prolactina: { min: 2, max: 20, label: "Rango normal", type: "range" },
  vitamina_d3: { min: 30, max: 100, label: "Rango normal", type: "range" },

  // Marcadores Tumorales
  psa: { max: 4, label: "Valor máximo recomendado", type: "max" },
  cea: { max: 3, label: "Valor máximo recomendado", type: "max" },
  afp: { max: 10, label: "Valor máximo recomendado", type: "max" },
  ca_125: { max: 35, label: "Valor máximo recomendado", type: "max" },
  ca_19_9: { max: 37, label: "Valor máximo recomendado", type: "max" },

  // Otros (Orina)
  densidad: { min: 1.005, max: 1.025, label: "Rango normal", type: "range" },
  ph: { min: 4.5, max: 8.0, label: "Rango normal", type: "range" },
  hematies_orina: { max: 5, label: "Valor máximo normal", type: "max" },
  leucocitos_orina: { max: 5, label: "Valor máximo normal", type: "max" },

  // Otros (Heces)
  sangre_oculta: { max: 0, label: "Debe ser negativo", type: "target" },
};
