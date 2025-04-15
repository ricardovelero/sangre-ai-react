import { Analitica } from "@/types";
import RatiosCard from "./RatiosCard";
import {
  evaluarRiesgoLdlHDL,
  evaluarRiesgoNoHDL,
  evaluarRiesgoTotalHDL,
} from "@/lib/riksAssestment";

type RatiosSidebarProps = {
  analitica?: Analitica;
};

export default function RatiosSidebar({ analitica }: RatiosSidebarProps) {
  const totalHdl = analitica?.resultados.filter(
    (r) => r.nombre_normalizado === "total/hdl"
  )[0].valor;

  const colNoHdl = analitica?.resultados.filter(
    (r) => r.nombre_normalizado === "colesterol no hdl"
  )[0].valor;

  const ldlHdl = analitica?.resultados.filter(
    (r) => r.nombre_normalizado === "ldl/hdl"
  )[0].valor;

  const colNoHdlRisk = evaluarRiesgoNoHDL(colNoHdl ?? 0);
  const totalHdlRisk = evaluarRiesgoTotalHDL(totalHdl ?? 0);
  const ldlHdlRisk = evaluarRiesgoLdlHDL(ldlHdl ?? 0);

  return (
    <>
      <RatiosCard
        title='Colesterol no HDL'
        description='El favorito de Dr. Peter Attia'
        value={colNoHdl?.toFixed(0)}
        risk={colNoHdlRisk}
      />
      <RatiosCard
        title='Colesterol Total/HDL'
        description='La escala del ratio colesterol total entre HDL (colesterol bueno).'
        value={totalHdl?.toFixed(1)}
        risk={totalHdlRisk}
      />
      <RatiosCard
        title='LDL/HDL'
        description='La relación LDL/HDL compara el colesterol “malo” (LDL) con el colesterol “bueno” (HDL).'
        value={ldlHdl?.toFixed(1)}
        risk={ldlHdlRisk}
      />
    </>
  );
}
