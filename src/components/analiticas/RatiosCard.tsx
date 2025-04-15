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
  risk: string;
};

export default function RatiosCard({
  title,
  description,
  value,
  risk,
}: RatiosCardProps) {
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
        <p>{risk}</p>
      </CardFooter>
    </Card>
  );
}
