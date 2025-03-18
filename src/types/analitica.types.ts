export type Paciente = {
  nombre: string;
  apellidos: string;
  fecha_nacimiento: string; // ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)
  sexo: string;
  fecha_toma_muestra: string; // ISO 8601 format
  laboratorio: string;
  medico: string;
};

export type Analisis = {
  serie_blanca: {
    leucocitos: number | "N/A" | null;
    neutrofilos: number | "N/A" | null;
    linfocitos: number | "N/A" | null;
    monocitos: number | "N/A" | null;
    eosinofilos: number | "N/A" | null;
    basofilos: number | "N/A" | null;
  };
  serie_roja: {
    hematies: number | "N/A" | null;
    hemoglobina: number | "N/A" | null;
    hematocrito: number | "N/A" | null;
    VCM: number | "N/A" | null;
    HCM: number | "N/A" | null;
    CHCM: number | "N/A" | null;
  };
  serie_plaquetar: {
    plaquetas: number | "N/A" | null;
    VPM: number | "N/A" | null;
  };
  eritrosedimentacion: {
    VSG: number | "N/A" | null;
  };
  bioquimica_clinica: {
    glucosa: number | "N/A" | null;
    hemoglobina_glicosilada_a1c: number | "N/A" | null;
    colesterol_total: number | "N/A" | null;
    HDL: number | "N/A" | null;
    LDL: number | "N/A" | null;
    trigliceridos: number | "N/A" | null;
    creatinina: number | "N/A" | null;
    urea: number | "N/A" | null;
    acido_urico: number | "N/A" | null;
    transaminasas: {
      TGO_AST: number | "N/A" | null;
      TGP_ALT: number | "N/A" | null;
    };
    GGT: number | "N/A" | null;
    fosfatasa_alcalina: number | "N/A" | null;
    proteinas_totales: number | "N/A" | null;
    albumina: number | "N/A" | null;
  };
  pruebas_reumaticas: {
    proteina_c_reactiva: number | "N/A" | null;
    factor_reumatoide: number | "N/A" | null;
    anticuerpos_antinucleares: number | "N/A" | null;
    antiCCP: number | "N/A" | null;
  };
  hormonas: {
    TSH: number | "N/A" | null;
    T3: number | "N/A" | null;
    T4: number | "N/A" | null;
    FSH: number | "N/A" | null;
    LH: number | "N/A" | null;
    testosterona: number | "N/A" | null;
    estradiol: number | "N/A" | null;
    progesterona: number | "N/A" | null;
    prolactina: number | "N/A" | null;
    vitamina_d3: number | "N/A" | null;
  };
  marcadores: {
    PSA: number | "N/A" | null;
    CEA: number | "N/A" | null;
    AFP: number | "N/A" | null;
    CA_125: number | "N/A" | null;
    CA_19_9: number | "N/A" | null;
  };
  otros: {
    orina: {
      aspecto: string | "N/A" | null;
      color: string | "N/A" | null;
      densidad: number | "N/A" | null;
      pH: number | "N/A" | null;
      glucosa: string | "N/A" | null;
      proteinas: string | "N/A" | null;
      hematies: number | "N/A" | null;
      leucocitos: number | "N/A" | null;
      cilindros: string | "N/A" | null;
      bacterias: string | "N/A" | null;
    };
    heces: {
      color: string | "N/A" | null;
      consistencia: string | "N/A" | null;
      sangre_oculta: string | "N/A" | null;
      parasitos: string | "N/A" | null;
    };
  };
};

export type Analitica = {
  _id: string;
  markdown: string | null;
  datos_analitica: {
    paciente: Paciente;
    analitica: Analisis;
  };
  resumen: string | "N/A" | null;
};

export type DataPoint = {
  date: string;
  [key: string]: number | string;
};

export type BloodTestResultBySeries = {
  id: string;
  fecha: string;
  valores: {
    [key: string]: number | null;
  };
};
