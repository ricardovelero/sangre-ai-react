import { Analitica } from "@/types";
import RatiosCard from "./RatiosCard";

type RatiosSidebarProps = {
  analitica?: Analitica;
};

export default function RatiosSidebar({ analitica }: RatiosSidebarProps) {
  const totalHdl = analitica?.resultados
    .filter((r) => r.nombre_normalizado === "total/hdl")[0]
    .valor.toFixed(1);

  const colNoHdl = analitica?.resultados
    .filter((r) => r.nombre_normalizado === "colesterol no hdl")[0]
    .valor.toFixed(0);

  const ldlHdl = analitica?.resultados
    .filter((r) => r.nombre_normalizado === "ldl/hdl")[0]
    .valor.toFixed(1);

  return (
    <>
      <RatiosCard
        title='Colesterol Total/HDL'
        description='Mide riesgo cardio'
        value={totalHdl}
        risk='Alto riesgo'
      />
      <RatiosCard
        title='Colesterol no HDL'
        description='El favorito de Dr. Peter Attia'
        value={colNoHdl}
        risk='Normal'
      />
      <RatiosCard
        title='LDL/HDL'
        description='Relacion entre LDL y HDL'
        value={ldlHdl}
        risk='Normal'
      />
    </>
  );
}
