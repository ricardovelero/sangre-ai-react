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
} from "@/lib/riksAssestment";
import MetabolicStatusCard from "./MetabolicStatusCard";
import { type MetabolicMetricsInput } from "@/lib/metabolicStatus";
import { buildKpiCardState } from "@/lib/kpiMissing";

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

  const toOptionalNumber = (value: number | string | undefined) => {
    const numericValue = toNumber(value);
    return Number.isFinite(numericValue) ? numericValue : undefined;
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

  const colesterolNoHdlValue = toOptionalNumber(
    getResultadoValor("colesterol no hdl")
  );
  const hdlValue = toOptionalNumber(getResultadoValor("hdl"));
  const trigliceridosValue = toOptionalNumber(
    getResultadoValor("trigliceridos")
  );
  const ldlValue = toOptionalNumber(getResultadoValor("ldl"));
  const glucosaValue = toOptionalNumber(
    getResultadoValor("glucosa", { preferredUnit: /mg\s*\/\s*dl/i })
  );
  const hba1cValue = toOptionalNumber(
    getResultadoValor("hemoglobina_glicosilada_a1c", {
      preferredUnit: /%/i,
    })
  );
  const homaIrValue = toOptionalNumber(getResultadoValor("homa_ir"));
  const tgHdlRatioValue = toOptionalNumber(
    getResultadoValor("tg_hdl_ratio", { allowRatio: true })
  );
  const tgHdlRatioRounded =
    tgHdlRatioValue !== undefined
      ? roundRatioValue(tgHdlRatioValue)
      : undefined;

  const metabolicMetrics: MetabolicMetricsInput = {
    tgHdlRatio: tgHdlRatioRounded,
    glucose: glucosaValue,
    hba1c: hba1cValue,
    homaIr: homaIrValue,
  };

  const cnhState = buildKpiCardState(
    "nonHdl",
    colesterolNoHdlValue,
    evaluarRiesgoNoHDL
  );
  const triState = buildKpiCardState(
    "triglycerides",
    trigliceridosValue,
    evaluarRiesgoTrigliceridos
  );
  const hdlState = buildKpiCardState("hdl", hdlValue, evaluarRiesgoHdl);
  const ldlState = buildKpiCardState("ldl", ldlValue, evaluarRiesgoLdl);
  const glucosaState = buildKpiCardState(
    "glucose",
    glucosaValue,
    evaluarRiesgoGlucosa
  );
  const hba1cState = buildKpiCardState(
    "hba1c",
    hba1cValue,
    evaluarRiesgoHbA1c
  );
  const homaIrState = buildKpiCardState(
    "homaIr",
    homaIrValue,
    evaluarRiesgoHomaIr
  );
  const tgHdlRatioState = buildKpiCardState(
    "tgHdlRatio",
    tgHdlRatioRounded,
    evaluarRiesgoTgHdlRatio
  );

  return (
    <div className='flex w-full flex-col gap-4'>
      <MetabolicStatusCard metrics={metabolicMetrics} />
      <div className='flex flex-col items-center sm:flex-row sm:flex-wrap sm:justify-center gap-4'>
        <SituationCard
          title='Colesterol no HDL'
          description='Colesterol total menos HDL'
          value={cnhState.displayValue}
          unit={"mg/dL"}
          risk={cnhState.risk}
          missingInfo={cnhState.missingInfo}
          recomendation='Óptimo < 100, Bueno entre 100-130'
        />
        <SituationCard
          title='Triglicéridos'
          description='Evaluar riesgo cardiovascular'
          value={triState.displayValue}
          unit={"mg/dL"}
          risk={triState.risk}
          missingInfo={triState.missingInfo}
          recomendation='Óptimo < 80, Bueno ≈ 100'
        />
        <SituationCard
          title='Colesterol HDL'
          description='El colesterol "bueno"'
          value={hdlState.displayValue}
          unit={"mg/dL"}
          risk={hdlState.risk}
          missingInfo={hdlState.missingInfo}
          recomendation='recomendado entre 40-80 mg/dL'
        />
        <SituationCard
          title='Colesterol LDL'
          description='El colesterol malo'
          value={ldlState.displayValue}
          unit={"mg/dL"}
          risk={ldlState.risk}
          missingInfo={ldlState.missingInfo}
          recomendation='recomendado entre 40-80'
        />
        <SituationCard
          title='Glucosa'
          description='Glucosa en ayunas'
          value={glucosaState.displayValue}
          unit={"mg/dL"}
          risk={glucosaState.risk}
          missingInfo={glucosaState.missingInfo}
          recomendation='Ideal entre 70-100 mg/dL'
        />
        <SituationCard
          title='HbA1c'
          description='Promedio de glucosa 3 meses'
          value={hba1cState.displayValue}
          unit={"%"}
          risk={hba1cState.risk}
          missingInfo={hba1cState.missingInfo}
          recomendation='Objetivo < 5.7%'
        />
        <SituationCard
          title='HOMA-IR'
          description='Resistencia a la insulina'
          value={homaIrState.displayValue}
          unit={"index"}
          risk={homaIrState.risk}
          missingInfo={homaIrState.missingInfo}
          recomendation='Objetivo < 2'
        />
        <SituationCard
          title='TG/HDL ratio'
          description='Relación triglicéridos/HDL'
          value={tgHdlRatioState.displayValue}
          unit={"ratio"}
          risk={tgHdlRatioState.risk}
          missingInfo={tgHdlRatioState.missingInfo}
          recomendation='Objetivo < 2'
        />
      </div>
    </div>
  );
}
