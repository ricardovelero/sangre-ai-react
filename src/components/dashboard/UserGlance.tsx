import { Analitica } from "@/types";
import SituationCard from "./SituationCard";
import {
  evaluarRiesgoHdl,
  evaluarRiesgoLdl,
  evaluarRiesgoNoHDL,
  evaluarRiesgoTrigliceridos,
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
        ] = parseFloat(resultado.valor);
      }
    });

    return resultadoObj;
  });

  console.log(valores[0]);

  let riesgoCnh, cnh, tri, riesgoTri, hdl, riesgoHdl, ldl, riesgoLdl;

  if (valores[0]) {
    const colesterolTotal = parseFloat(
      valores[0]["colesterol total"] as string
    );
    const hdlValue = parseFloat(valores[0]["hdl"] as string);
    const trigliceridosValue = parseFloat(
      valores[0]["trigliceridos"] as string
    );
    const ldlValue = parseFloat(valores[0]["ldl"] as string);

    // Colesterol no HDL
    if (!isNaN(colesterolTotal) && !isNaN(hdlValue)) {
      cnh = colesterolTotal - hdlValue;
      riesgoCnh = evaluarRiesgoNoHDL(cnh);
    } else {
      cnh = "N/D";
      riesgoCnh = "Datos insuficientes";
    }

    // Triglicéridos
    if (!isNaN(trigliceridosValue)) {
      tri = trigliceridosValue;
      riesgoTri = evaluarRiesgoTrigliceridos(tri);
    } else {
      tri = "N/D";
      riesgoTri = "Datos insuficientes";
    }

    // HDL
    if (!isNaN(hdlValue)) {
      hdl = hdlValue;
      riesgoHdl = evaluarRiesgoHdl(hdl);
    } else {
      hdl = "N/D";
      riesgoHdl = "Datos insuficientes";
    }

    // LDL
    if (!isNaN(ldlValue)) {
      ldl = ldlValue;
      riesgoLdl = evaluarRiesgoLdl(ldl);
    } else {
      ldl = "N/D";
      riesgoLdl = "Datos insuficientes";
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
