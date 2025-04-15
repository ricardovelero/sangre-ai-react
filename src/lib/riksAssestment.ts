export type RiskResponse = {
  mensaje: string;
  nivel: "low" | "medium" | "high" | "invalid";
};

export function evaluarRiesgoNoHDL(noHDL: number): RiskResponse {
  switch (true) {
    case noHDL < 100:
      return { mensaje: "Óptimo (riesgo muy bajo)", nivel: "low" };

    case noHDL >= 100 && noHDL < 130:
      return { mensaje: "Bueno (riesgo bajo)", nivel: "medium" };

    case noHDL >= 130 && noHDL < 160:
      return { mensaje: "Intermedio (riesgo moderado)", nivel: "medium" };

    case noHDL >= 160:
      return { mensaje: "Alto riesgo cardiovascular", nivel: "high" };

    default:
      return { mensaje: "Valor inválido", nivel: "invalid" };
  }
}

export function evaluarRiesgoTrigliceridos(
  trigliceridos: number
): RiskResponse {
  switch (true) {
    case trigliceridos < 80:
      return { mensaje: "Óptimo (riesgo muy bajo)", nivel: "low" };

    case trigliceridos >= 80 && trigliceridos < 100:
      return { mensaje: "Bueno (riesgo bajo)", nivel: "medium" };

    case trigliceridos >= 100:
      return {
        mensaje: "Alto riesgo cardiovascular y resistencia a la insulina",
        nivel: "high",
      };

    default:
      return { mensaje: "Valor inválido", nivel: "invalid" };
  }
}

export function evaluarRiesgoHdl(hdl: number): RiskResponse {
  switch (true) {
    case hdl < 40:
      return { mensaje: "Riesgo cardiovascular", nivel: "high" };

    case hdl >= 40 && hdl < 80:
      return { mensaje: "Óptimo", nivel: "low" };

    case hdl >= 80 && hdl <= 100:
      return { mensaje: "Podría indicar disfunción metabólica", nivel: "high" };

    default:
      return { mensaje: "Valor inválido", nivel: "invalid" };
  }
}

export function evaluarRiesgoLdl(ldl: number): RiskResponse {
  switch (true) {
    case ldl < 55:
      return {
        mensaje:
          "Extremadamente óptimo (si eres alto riesgo o con enfermedad cardiovascular existente)",
        nivel: "low",
      };

    case ldl < 70:
      return { mensaje: "Muy óptimo", nivel: "low" };

    case ldl < 100:
      return { mensaje: "Óptimo", nivel: "low" };

    case ldl >= 100 && ldl <= 130:
      return { mensaje: "Riesgo moderado", nivel: "medium" };

    case ldl > 130 && ldl <= 160:
      return { mensaje: "Alto riesgo", nivel: "high" };

    case ldl > 160:
      return { mensaje: "Muy alto riesgo", nivel: "high" };

    default:
      return { mensaje: "Valor inválido", nivel: "invalid" };
  }
}

export function evaluarRiesgoTotalHDL(totalHDL: number): RiskResponse {
  switch (true) {
    case totalHDL < 3.5:
      return { mensaje: "Óptimo (muy bajo)", nivel: "low" };

    case totalHDL >= 3.5 && totalHDL < 4.9:
      return { mensaje: "Riesgo moderado", nivel: "medium" };

    case totalHDL >= 5:
      return { mensaje: "Alto riesgo", nivel: "high" };

    default:
      return { mensaje: "Valor inválido", nivel: "invalid" };
  }
}

export function evaluarRiesgoLdlHDL(ldlHdl: number): RiskResponse {
  switch (true) {
    case ldlHdl < 2:
      return { mensaje: "Óptimo (riesgo muy bajo)", nivel: "low" };

    case ldlHdl >= 2 && ldlHdl < 3.5:
      return { mensaje: "Bueno (riesgo bajo)", nivel: "medium" };

    case ldlHdl >= 3.5:
      return { mensaje: "Alto riesgo cardiovascular", nivel: "high" };

    default:
      return { mensaje: "Valor inválido", nivel: "invalid" };
  }
}
