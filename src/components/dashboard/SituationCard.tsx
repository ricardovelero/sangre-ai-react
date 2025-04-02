import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

type SituationCardProps = {
  title: string;
  description: string;
  value?: number | string;
  unit: string;
  risk?: string;
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
          <p className='text-sm'>{risk}</p>
          <p className='text-xs'>{recomendation}</p>
        </div>
      </CardContent>
    </Card>
  );
}
