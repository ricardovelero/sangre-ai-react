import { Analitica } from "@/types";
import SituationCard from "./SituationCard";
import {
  evaluarRiesgoHdl,
  evaluarRiesgoLdl,
  evaluarRiesgoNoHDL,
  evaluarRiesgoTrigliceridos,
  RiskResponse,
} from "@/lib/riksAssestment";

type UserGlanceProps = {
  analiticas: Analitica[];
};

export default function UserGlance({ analiticas }: UserGlanceProps) {
  const valores = analiticas.map((analitica) => {
    const resultadoObj: Record<string, number | string> = {
      fecha: analitica.fecha_toma_muestra,
    };

    analitica.resultados.forEach((resultado) => {
      if (resultado.nombre_normalizado) {
        (resultadoObj as Record<string, number | string>)[
          resultado.nombre_normalizado
        ] = resultado.valor;
      }
    });

    return resultadoObj;
  });

  let riesgoCnh: RiskResponse = { mensaje: "", nivel: "invalid" },
    cnh,
    tri,
    riesgoTri: RiskResponse = { mensaje: "", nivel: "invalid" },
    hdl,
    riesgoHdl: RiskResponse = { mensaje: "", nivel: "invalid" },
    ldl,
    riesgoLdl: RiskResponse = { mensaje: "", nivel: "invalid" };

  if (valores[0]) {
    const colesterolNoHdl = parseFloat(
      valores[0]["colesterol no hdl"] as string
    );
    const hdlValue = parseFloat(valores[0]["hdl"] as string);
    const trigliceridosValue = parseFloat(
      valores[0]["trigliceridos"] as string
    );
    const ldlValue = parseFloat(valores[0]["ldl"] as string);

    // Colesterol no HDL
    if (!isNaN(colesterolNoHdl)) {
      cnh = colesterolNoHdl;
      riesgoCnh = evaluarRiesgoNoHDL(cnh);
    } else {
      cnh = "N/D";
      riesgoCnh = { mensaje: "Datos insuficientes", nivel: "invalid" };
    }

    // Triglicéridos
    if (!isNaN(trigliceridosValue)) {
      tri = trigliceridosValue;
      riesgoTri = evaluarRiesgoTrigliceridos(tri);
    } else {
      tri = "N/D";
      riesgoTri = { mensaje: "Datos insuficientes", nivel: "invalid" };
    }

    // HDL
    if (!isNaN(hdlValue)) {
      hdl = hdlValue;
      riesgoHdl = evaluarRiesgoHdl(hdl);
    } else {
      hdl = "N/D";
      riesgoHdl = { mensaje: "Datos insuficientes", nivel: "invalid" };
    }

    // LDL
    if (!isNaN(ldlValue)) {
      ldl = ldlValue;
      riesgoLdl = evaluarRiesgoLdl(ldl);
    } else {
      ldl = "N/D";
      riesgoLdl = { mensaje: "Datos insuficientes", nivel: "invalid" };
    }
  }

  return (
    <div className='flex flex-col items-center sm:flex-row sm:justify-between gap-4'>
      <SituationCard
        title='Colesterol no HDL'
        description='Colesterol total menos HDL'
        value={cnh}
        unit={"mg/dL"}
        risk={riesgoCnh}
        recomendation='Óptimo < 100, Bueno entre 100-130'
      />
      <SituationCard
        title='Triglicéridos'
        description='Evaluar riesgo cardiovascular'
        value={tri}
        unit={"mg/dL"}
        risk={riesgoTri}
        recomendation='Óptimo < 80, Bueno ≈ 100'
      />
      <SituationCard
        title='Colesterol HDL'
        description='El colesterol "bueno"'
        value={hdl}
        unit={"mg/dL"}
        risk={riesgoHdl}
        recomendation='recomendado entre 40-80 mg/dL'
      />
      <SituationCard
        title='Colesterol LDL'
        description='El colesterol malo'
        value={ldl}
        unit={"mg/dL"}
        risk={riesgoLdl}
        recomendation='recomendado entre 40-80'
      />
    </div>
  );
}
