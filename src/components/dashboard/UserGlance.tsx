import { Analitica } from "@/types";
import SituationCard from "./SituationCard";
import {
  evaluarRiesgoHdl,
  evaluarRiesgoHbA1c,
  evaluarRiesgoHomaIr,
  evaluarRiesgoGlucosa,
  evaluarRiesgoLdl,
  evaluarRiesgoNoHDL,
  evaluarRiesgoTgHdlRatio,
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

  const roundRatioValue = (value: number) =>
    Math.round(value * 10) / 10;

  const getResultadoValor = (
    normalizedName: string,
    options: { allowRatio?: boolean; preferredUnit?: RegExp } = {}
  ) => {
    const latestAnalitica = analiticas[0];
    if (!latestAnalitica) return undefined;

    const matching = latestAnalitica.resultados.filter(
      (resultado) =>
        resultado.nombre_normalizado === normalizedName &&
        (options.allowRatio || !isRatioLikeName(resultado.nombre))
    );

    const preferred = options.preferredUnit
      ? matching.find((resultado) =>
          options.preferredUnit?.test(resultado.unidad ?? "")
        )
      : matching.find((resultado) => isMgDlUnit(resultado.unidad));

    return (preferred ?? matching[0])?.valor;
  };

  let riesgoCnh: RiskResponse = { mensaje: "", nivel: "invalid" },
    cnh,
    tri,
    riesgoTri: RiskResponse = { mensaje: "", nivel: "invalid" },
    hdl,
    riesgoHdl: RiskResponse = { mensaje: "", nivel: "invalid" },
    ldl,
    riesgoLdl: RiskResponse = { mensaje: "", nivel: "invalid" },
    glucosa,
    riesgoGlucosa: RiskResponse = { mensaje: "", nivel: "invalid" },
    hba1c,
    riesgoHba1c: RiskResponse = { mensaje: "", nivel: "invalid" },
    homaIr,
    riesgoHomaIr: RiskResponse = { mensaje: "", nivel: "invalid" },
    tgHdlRatio,
    riesgoTgHdlRatio: RiskResponse = { mensaje: "", nivel: "invalid" };

  if (analiticas[0]) {
    const colesterolNoHdl = toNumber(
      getResultadoValor("colesterol no hdl")
    );
    const hdlValue = toNumber(getResultadoValor("hdl"));
    const trigliceridosValue = toNumber(
      getResultadoValor("trigliceridos")
    );
    const ldlValue = toNumber(getResultadoValor("ldl"));
    const glucosaValue = toNumber(
      getResultadoValor("glucosa", { preferredUnit: /mg\s*\/\s*dl/i })
    );
    const hba1cValue = toNumber(
      getResultadoValor("hemoglobina_glicosilada_a1c", {
        preferredUnit: /%/i,
      })
    );
    const homaIrValue = toNumber(getResultadoValor("homa_ir"));
    const tgHdlRatioValue = toNumber(
      getResultadoValor("tg_hdl_ratio", { allowRatio: true })
    );

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

    // Glucosa
    if (!isNaN(glucosaValue)) {
      glucosa = glucosaValue;
      riesgoGlucosa = evaluarRiesgoGlucosa(glucosa);
    } else {
      glucosa = "N/D";
      riesgoGlucosa = { mensaje: "Datos insuficientes", nivel: "invalid" };
    }

    // HbA1c
    if (!isNaN(hba1cValue)) {
      hba1c = hba1cValue;
      riesgoHba1c = evaluarRiesgoHbA1c(hba1c);
    } else {
      hba1c = "N/D";
      riesgoHba1c = { mensaje: "Datos insuficientes", nivel: "invalid" };
    }

    // HOMA-IR
    if (!isNaN(homaIrValue)) {
      homaIr = homaIrValue;
      riesgoHomaIr = evaluarRiesgoHomaIr(homaIr);
    } else {
      homaIr = "N/D";
      riesgoHomaIr = { mensaje: "Datos insuficientes", nivel: "invalid" };
    }

    // TG/HDL ratio
    if (!isNaN(tgHdlRatioValue)) {
      tgHdlRatio = roundRatioValue(tgHdlRatioValue);
      riesgoTgHdlRatio = evaluarRiesgoTgHdlRatio(tgHdlRatio);
    } else {
      tgHdlRatio = "N/D";
      riesgoTgHdlRatio = { mensaje: "Datos insuficientes", nivel: "invalid" };
    }
  }

  return (
    <div className='flex flex-col items-center sm:flex-row sm:flex-wrap sm:justify-center gap-4'>
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
      <SituationCard
        title='Glucosa'
        description='Glucosa en ayunas'
        value={glucosa}
        unit={"mg/dL"}
        risk={riesgoGlucosa}
        recomendation='Ideal entre 70-100 mg/dL'
      />
      <SituationCard
        title='HbA1c'
        description='Promedio de glucosa 3 meses'
        value={hba1c}
        unit={"%"}
        risk={riesgoHba1c}
        recomendation='Objetivo < 5.7%'
      />
      <SituationCard
        title='HOMA-IR'
        description='Resistencia a la insulina'
        value={homaIr}
        unit={"index"}
        risk={riesgoHomaIr}
        recomendation='Objetivo < 2'
      />
      <SituationCard
        title='TG/HDL ratio'
        description='Relación triglicéridos/HDL'
        value={tgHdlRatio}
        unit={"ratio"}
        risk={riesgoTgHdlRatio}
        recomendation='Objetivo < 2'
      />
    </div>
  );
}
