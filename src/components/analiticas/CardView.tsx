import { Analitica } from "@/types/analitica.types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Markdown from "react-markdown";
import { Button } from "../ui/button";
import remarkGfm from "remark-gfm";
import { useNavigate } from "react-router-dom";

type CardViewProps = {
  analitica: Analitica;
};

export default function CardView({ analitica }: CardViewProps) {
  const navigate = useNavigate();

  return (
    <Card key={analitica._id}>
      <CardHeader>
        <CardTitle>Resultados</CardTitle>
        <CardDescription>Aquí tienes un extracto del análisis.</CardDescription>
      </CardHeader>
      <CardContent className='line-clamp-6'>
        <Markdown remarkPlugins={[remarkGfm]}>{analitica.markdown}</Markdown>
      </CardContent>
      <CardFooter>
        <Button onClick={() => navigate("/a/analitica/" + analitica._id)}>
          Ver informe completo
        </Button>
      </CardFooter>
    </Card>
  );
}
