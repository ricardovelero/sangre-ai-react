import {
  evaluarRiesgoHbA1c,
  evaluarRiesgoHomaIr,
} from "@/lib/riksAssestment";
import { buildKpiCardState } from "@/lib/kpiMissing";
import SituationCard from "./SituationCard";

export function MissingKpiExamples() {
  const hba1cState = buildKpiCardState(
    "hba1c",
    undefined,
    evaluarRiesgoHbA1c
  );
  const homaIrState = buildKpiCardState(
    "homaIr",
    undefined,
    evaluarRiesgoHomaIr
  );

  return (
    <div className='flex flex-col items-center gap-4 sm:flex-row'>
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
    </div>
  );
}
