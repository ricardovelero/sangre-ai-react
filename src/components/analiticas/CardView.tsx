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
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toTitleCase } from "@/lib/utils";

type CardViewProps = {
  analitica: Analitica;
};

export default function CardView({ analitica }: CardViewProps) {
  const navigate = useNavigate();

  // Parse the date and check if it's valid
  const fechaTomaMuestra = new Date(analitica.fecha_toma_muestra);
  const isValidDate = !isNaN(fechaTomaMuestra.getTime());

  return (
    <Card key={analitica._id}>
      <CardHeader>
        <CardTitle>Informe de analítica</CardTitle>
        <CardDescription>
          Fecha:{" "}
          {isValidDate
            ? format(fechaTomaMuestra, "PPPP", { locale: es })
            : "N/D"}
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
