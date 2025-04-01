export function evaluarRiesgoNoHDL(noHDL: number) {
  switch (true) {
    case noHDL < 100:
      return "Óptimo (riesgo muy bajo)";

    case noHDL >= 100 && noHDL < 130:
      return "Bueno (riesgo bajo)";

    case noHDL >= 130 && noHDL < 160:
      return "Intermedio (riesgo moderado)";

    case noHDL >= 160:
      return "Alto riesgo cardiovascular";

    default:
      return "Valor inválido";
  }
}

export function evaluarRiesgoTrigliceridos(trigliceridos: number) {
  switch (true) {
    case trigliceridos < 80:
      return "Óptimo (riesgo muy bajo)";

    case trigliceridos >= 80 && trigliceridos < 100:
      return "Bueno (riesgo bajo)";

    case trigliceridos >= 100:
      return "Alto riesgo cardiovascular y resistencia a la insulina";

    default:
      return "Valor inválido";
  }
}

export function evaluarRiesgoHdl(hdl: number) {
  switch (true) {
    case hdl < 40:
      return "Riesgo cardiovascular";

    case hdl >= 40 && hdl < 80:
      return "Óptimo";

    case hdl >= 80 && hdl <= 100:
      return "Podría indicar disfunción metabólica";

    default:
      return "Valor inválido";
  }
}

export function evaluarRiesgoLdl(ldl: number) {
  switch (true) {
    case ldl < 55:
      return "Extremadamente óptimo (si eres alto riesgo o con enfermedad cardiovascular existente)";

    case ldl < 70:
      return "Muy óptimo";

    case ldl < 100:
      return "Óptimo";

    case ldl >= 100 && ldl <= 130:
      return "Riesgo moderado";

    case ldl > 130:
      return "Alto riesgo";

    case ldl > 160:
      return "Muy alto riesgo";

    default:
      return "Valor inválido";
  }
}
