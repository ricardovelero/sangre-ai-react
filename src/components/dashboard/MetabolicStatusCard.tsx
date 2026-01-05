import {
  evaluateMetabolicStatus,
  type MetabolicMetricsInput,
  type MetabolicStatusLevel,
} from '@/lib/metabolicStatus';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const statusCopy: Record<
  MetabolicStatusLevel,
  { label: string; summary: string }
> = {
  healthy: {
    label: 'Perfil metabólico saludable',
    summary:
      'Los valores disponibles se mantienen en rangos favorables y apuntan a un equilibrio metabólico estable.',
  },
  watch: {
    label: 'Perfil metabólico a vigilar',
    summary:
      'Se observan señales fuera del rango óptimo; conviene seguirlas de cerca y mantener hábitos consistentes.',
  },
  altered: {
    label: 'Perfil metabólico alterado',
    summary:
      'Hay varias señales por encima de los rangos recomendados; es recomendable revisarlas con tu profesional de salud.',
  },
};

const statusStyles: Record<
  MetabolicStatusLevel,
  { badge: string; bar: string; border: string }
> = {
  healthy: {
    badge: 'border border-emerald-200 bg-emerald-50 text-emerald-700',
    bar: 'bg-emerald-500',
    border: 'border-l-emerald-500',
  },
  watch: {
    badge: 'border border-amber-200 bg-amber-50 text-amber-700',
    bar: 'bg-amber-500',
    border: 'border-l-amber-500',
  },
  altered: {
    badge: 'border border-rose-200 bg-rose-50 text-rose-700',
    bar: 'bg-rose-500',
    border: 'border-l-rose-500',
  },
};

type MetabolicStatusCardProps = {
  metrics: MetabolicMetricsInput;
  className?: string;
};

export default function MetabolicStatusCard({
  metrics,
  className,
}: MetabolicStatusCardProps) {
  const status = evaluateMetabolicStatus(metrics);
  const copy = statusCopy[status.level];
  const styles = statusStyles[status.level];

  return (
    <Card className={cn('w-full border-l-4', styles.border, className)}>
      <CardHeader className='pb-3'>
        <CardTitle>Estado metabólico general</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <div className='space-y-2'>
            <div className='flex flex-wrap items-center gap-3'>
              <span
                className={cn(
                  'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold',
                  styles.badge
                )}
              >
                {copy.label}
              </span>
              <span
                className={cn('h-2 w-24 rounded-full', styles.bar)}
                aria-hidden='true'
              />
            </div>
            <p className='text-sm text-muted-foreground'>{copy.summary}</p>
            {status.partial && (
              <p className='text-xs text-muted-foreground'>
                Evaluación parcial basada en los datos disponibles.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function MetabolicStatusCardExample() {
  return (
    <MetabolicStatusCard
      metrics={{
        tgHdlRatio: 4,
        glucose: 130,
        hba1c: 5.4,
        homaIr: 2.1,
      }}
    />
  );
}
