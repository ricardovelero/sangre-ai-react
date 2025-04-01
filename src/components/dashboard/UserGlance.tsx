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
    cnh =
      (valores[0]["colesterol total"] as number) -
      (valores[0]["hdl (colesterol bueno)"] as number);
    riesgoCnh = evaluarRiesgoNoHDL(cnh);
    tri = valores[0]["trigliceridos"] as number;
    riesgoTri = evaluarRiesgoTrigliceridos(tri);
    hdl = valores[0]["hdl (colesterol bueno)"] as number;
    riesgoHdl = evaluarRiesgoHdl(hdl);
    ldl = valores[0]["ldl"] as number;
    riesgoLdl = evaluarRiesgoLdl(ldl);
  }

  return (
    <div className='flex gap-4'>
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
        description='El colesterlo "bueno"'
        value={hdl}
        unit={"mg/dL"}
        risk={riesgoHdl}
        recomendation='Entre 40-80 mg/dL'
      />
      <SituationCard
        title='Colesterol LDL'
        description='El colesterlo malo'
        value={ldl}
        unit={"mg/dL"}
        risk={riesgoLdl}
        recomendation='Entre 40-80'
      />
    </div>
  );
}
