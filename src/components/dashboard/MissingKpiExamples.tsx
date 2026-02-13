import { buildKpiCardState } from "@/lib/kpiMissing";
import SituationCard from "./SituationCard";

export function MissingKpiExamples() {
  const hba1cState = buildKpiCardState(
    "hba1c",
    undefined
  );
  const homaIrState = buildKpiCardState(
    "homaIr",
    undefined
  );

  return (
    <div className='flex flex-col items-center gap-4 sm:flex-row'>
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
    </div>
  );
}
