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
import { formatDateToSpanish } from "@/lib/utils";
import { toTitleCase } from "@/lib/utils";

type CardViewProps = {
  analitica: Analitica;
};

export default function CardView({ analitica }: CardViewProps) {
  const navigate = useNavigate();

  return (
    <Card key={analitica._id}>
      <CardHeader>
        <CardTitle>Informe de analítica</CardTitle>
        <CardDescription>
          Fecha: {formatDateToSpanish(analitica.fecha_toma_muestra)}
          <br />
          Laboratorio: {toTitleCase(analitica.laboratorio) || "N/D"}
          <br />
          Medico: {toTitleCase(analitica.medico) || "N/D"}
        </CardDescription>
      </CardHeader>
      {analitica.resumen ? (
        <CardContent>{analitica.resumen}</CardContent>
      ) : (
        <CardContent className='line-clamp-6'>
          <Markdown remarkPlugins={[remarkGfm]}>{analitica.markdown}</Markdown>
        </CardContent>
      )}
      <CardFooter>
        <Button onClick={() => navigate("/a/analitica/" + analitica._id)}>
          Ver informe completo
        </Button>
      </CardFooter>
    </Card>
  );
}
