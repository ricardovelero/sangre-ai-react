import type { RiskResponse } from '@/lib/riksAssestment';

export type KpiKey =
  | 'nonHdl'
  | 'triglycerides'
  | 'hdl'
  | 'ldl'
  | 'glucose'
  | 'hba1c'
  | 'homaIr'
  | 'tgHdlRatio';

export type KpiMissingInfo = {
  requiredFields: string[];
  message: string;
};

export const MISSING_VALUE_LABEL = 'N/D';

const KPI_MISSING_CONFIG: Record<KpiKey, KpiMissingInfo> = {
  nonHdl: {
    requiredFields: ['Colesterol total', 'HDL'],
    message:
      'Se calcula automáticamente cuando el informe incluye colesterol total y HDL.',
  },
  triglycerides: {
    requiredFields: ['Triglicéridos'],
    message: 'Este indicador aparece cuando el informe incluye triglicéridos.',
  },
  hdl: {
    requiredFields: ['Colesterol HDL'],
    message: 'Se muestra cuando el informe incluye colesterol HDL.',
  },
  ldl: {
    requiredFields: ['Colesterol LDL'],
    message: 'Se muestra cuando el informe incluye colesterol LDL.',
  },
  glucose: {
    requiredFields: ['Glucosa en ayunas'],
    message: 'Se muestra cuando el informe incluye glucosa en ayunas.',
  },
  hba1c: {
    requiredFields: ['Hemoglobina glicosilada (HbA1c)'],
    message: 'Este indicador requiere hemoglobina glicosilada (HbA1c).',
  },
  homaIr: {
    requiredFields: ['Glucosa en ayunas', 'Insulina en ayunas'],
    message:
      'Se calcula automáticamente cuando el informe incluye glucosa e insulina en ayunas.',
  },
  tgHdlRatio: {
    requiredFields: ['Triglicéridos', 'HDL'],
    message: 'Se calcula automáticamente con triglicéridos y HDL.',
  },
};

export function getKpiMissingInfo(key: KpiKey): KpiMissingInfo {
  return KPI_MISSING_CONFIG[key];
}

export function buildKpiCardState(
  key: KpiKey,
  value: number | undefined,
  evaluateRisk: (value: number) => RiskResponse
): {
  displayValue: number | string;
  risk: RiskResponse;
  missingInfo?: KpiMissingInfo;
} {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return {
      displayValue: MISSING_VALUE_LABEL,
      risk: { mensaje: '', nivel: 'invalid' },
      missingInfo: getKpiMissingInfo(key),
    };
  }

  return {
    displayValue: value,
    risk: evaluateRisk(value),
  };
}
