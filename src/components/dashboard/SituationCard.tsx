import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { RiskResponse } from "@/lib/riksAssestment";

type SituationCardProps = {
  title: string;
  description: string;
  value?: number | string;
  unit: string;
  risk: RiskResponse;
  recomendation?: string;
};

export default function SituationCard({
  title,
  description,
  value,
  unit,
  risk,
  recomendation,
}: SituationCardProps) {
  const riskColorClass = {
    low: "text-green-500",
    medium: "text-yellow-500",
    high: "text-red-500",
    invalid: "text-gray-500",
  }[risk.nivel];
  return (
    <Card className='w-64'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex items-baseline justify-center gap-1'>
          <span className='text-5xl'>{value}</span>
          <span className='text-xs'>{unit}</span>
        </div>
        <div>
          <p className={cn("text-sm", riskColorClass)}>{risk.mensaje}</p>
          <p className='text-xs'>{recomendation}</p>
        </div>
      </CardContent>
    </Card>
  );
}
