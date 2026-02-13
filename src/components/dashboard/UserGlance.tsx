import { Analitica } from "@/types";
import SituationCard from "./SituationCard";
import MetabolicStatusCard from "./MetabolicStatusCard";
import { type MetabolicMetricsInput } from "@/lib/metabolicStatus";
import { buildKpiCardState } from "@/lib/kpiMissing";
import { calculateNonHdl } from "@/lib/kpiCalculations";

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

  const colesterolTotalValue = toOptionalNumber(
    getResultadoValor("colesterol total", { preferredUnit: /mg\s*\/\s*dl/i })
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
  const nonHdlValue = calculateNonHdl(colesterolTotalValue, hdlValue);

  const metabolicMetrics: MetabolicMetricsInput = {
    tgHdlRatio: tgHdlRatioRounded,
    glucose: glucosaValue,
    hba1c: hba1cValue,
    homaIr: homaIrValue,
  };

  const nonHdlState = buildKpiCardState("nonHdl", nonHdlValue);
  const triState = buildKpiCardState("triglycerides", trigliceridosValue);
  const hdlState = buildKpiCardState("hdl", hdlValue);
  const ldlState = buildKpiCardState("ldl", ldlValue);
  const glucosaState = buildKpiCardState("glucose", glucosaValue);
  const hba1cState = buildKpiCardState("hba1c", hba1cValue);
  const homaIrState = buildKpiCardState("homaIr", homaIrValue);
  const tgHdlRatioState = buildKpiCardState("tgHdlRatio", tgHdlRatioRounded);

  return (
    <div className='flex w-full flex-col gap-4'>
      <MetabolicStatusCard metrics={metabolicMetrics} />
      <div className='flex flex-col items-center sm:flex-row sm:flex-wrap sm:justify-center gap-4'>
        <SituationCard
          title='Non-HDL Cholesterol'
          description='Total cholesterol minus HDL'
          value={nonHdlState.displayValue}
          unit={"mg/dL"}
          statusLabel={nonHdlState.statusLabel}
          statusTone={nonHdlState.statusTone}
          missingInfo={nonHdlState.missingInfo}
          recomendation='Optimal < 130'
        />
        <SituationCard
          title='Triglicéridos'
          description='Evaluar riesgo cardiovascular'
          value={triState.displayValue}
          unit={"mg/dL"}
          statusLabel={triState.statusLabel}
          statusTone={triState.statusTone}
          missingInfo={triState.missingInfo}
          recomendation='Optimal < 80'
        />
        <SituationCard
          title='Colesterol HDL'
          description='El colesterol "bueno"'
          value={hdlState.displayValue}
          unit={"mg/dL"}
          statusLabel={hdlState.statusLabel}
          statusTone={hdlState.statusTone}
          missingInfo={hdlState.missingInfo}
          recomendation='Optimal 40–80 mg/dL'
        />
        <SituationCard
          title='Colesterol LDL'
          description='El colesterol malo'
          value={ldlState.displayValue}
          unit={"mg/dL"}
          statusLabel={ldlState.statusLabel}
          statusTone={ldlState.statusTone}
          missingInfo={ldlState.missingInfo}
          recomendation='Optimal < 100'
        />
        <SituationCard
          title='Glucosa'
          description='Glucosa en ayunas'
          value={glucosaState.displayValue}
          unit={"mg/dL"}
          statusLabel={glucosaState.statusLabel}
          statusTone={glucosaState.statusTone}
          missingInfo={glucosaState.missingInfo}
          recomendation='Optimal 70–99 mg/dL'
        />
        <SituationCard
          title='HbA1c'
          description='Promedio de glucosa 3 meses'
          value={hba1cState.displayValue}
          unit={"%"}
          statusLabel={hba1cState.statusLabel}
          statusTone={hba1cState.statusTone}
          missingInfo={hba1cState.missingInfo}
          recomendation='Optimal < 5.7%'
        />
        <SituationCard
          title='HOMA-IR'
          description='Resistencia a la insulina'
          value={homaIrState.displayValue}
          unit={"index"}
          statusLabel={homaIrState.statusLabel}
          statusTone={homaIrState.statusTone}
          missingInfo={homaIrState.missingInfo}
          recomendation='Optimal < 2'
        />
        <SituationCard
          title='TG/HDL ratio'
          description='Relación triglicéridos/HDL'
          value={tgHdlRatioState.displayValue}
          unit={"ratio"}
          statusLabel={tgHdlRatioState.statusLabel}
          statusTone={tgHdlRatioState.statusTone}
          missingInfo={tgHdlRatioState.missingInfo}
          recomendation='Optimal < 2'
        />
      </div>
    </div>
  );
}
