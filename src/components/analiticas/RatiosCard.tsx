import { RiskResponse } from "@/lib/riksAssestment";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

type RatiosCardProps = {
  title: string;
  description: string;
  value?: string;
  risk: RiskResponse;
};

export default function RatiosCard({
  title,
  description,
  value,
  risk,
}: RatiosCardProps) {
  const riskColorClass = {
    low: "text-green-500",
    medium: "text-yellow-500",
    high: "text-red-500",
    invalid: "text-gray-500",
  }[risk.nivel];
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className='text-center'>
        <h2 className='text-5xl'>{value}</h2>
      </CardContent>
      <CardFooter>
        <p className={riskColorClass}>{risk.mensaje}</p>
      </CardFooter>
    </Card>
  );
}
