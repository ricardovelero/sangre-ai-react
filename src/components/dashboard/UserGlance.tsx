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
  const isRatioLikeName = (name?: string) =>
    typeof name === "string" && /\/|ratio/i.test(name);

  const isMgDlUnit = (unit?: string) =>
    typeof unit === "string" && /mg\s*\/\s*dl/i.test(unit);

  const toNumber = (value: number | string | undefined) => {
    if (value === null || value === undefined) return NaN;
    return typeof value === "number" ? value : parseFloat(value);
  };

  const getResultadoValor = (normalizedName: string) => {
    const latestAnalitica = analiticas[0];
    if (!latestAnalitica) return undefined;

    const matching = latestAnalitica.resultados.filter(
      (resultado) =>
        resultado.nombre_normalizado === normalizedName &&
        !isRatioLikeName(resultado.nombre)
    );

    const preferred = matching.find((resultado) =>
      isMgDlUnit(resultado.unidad)
    );

    return (preferred ?? matching[0])?.valor;
  };

  let riesgoCnh: RiskResponse = { mensaje: "", nivel: "invalid" },
    cnh,
    tri,
    riesgoTri: RiskResponse = { mensaje: "", nivel: "invalid" },
    hdl,
    riesgoHdl: RiskResponse = { mensaje: "", nivel: "invalid" },
    ldl,
    riesgoLdl: RiskResponse = { mensaje: "", nivel: "invalid" };

  if (analiticas[0]) {
    const colesterolNoHdl = toNumber(getResultadoValor("colesterol no hdl"));
    const hdlValue = toNumber(getResultadoValor("hdl"));
    const trigliceridosValue = toNumber(getResultadoValor("trigliceridos"));
    const ldlValue = toNumber(getResultadoValor("ldl"));

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
