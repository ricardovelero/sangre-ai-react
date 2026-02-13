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
  const getRatioValue = (ratioName: string) =>
    analitica?.resultados.find(
      (resultado) => resultado.nombre_normalizado === ratioName
    )?.valor;

  const totalHdl = getRatioValue("total/hdl");
  const colNoHdl = getRatioValue("colesterol no hdl");
  const ldlHdl = getRatioValue("ldl/hdl");

  const colNoHdlRisk = evaluarRiesgoNoHDL(colNoHdl ?? 0);
  const totalHdlRisk = evaluarRiesgoTotalHDL(totalHdl ?? 0);
  const ldlHdlRisk = evaluarRiesgoLdlHDL(ldlHdl ?? 0);

  return (
    <>
      <RatiosCard
        title='Colesterol no HDL'
        description='El favorito de Dr. Peter Attia'
        value={typeof colNoHdl === "number" ? colNoHdl.toFixed(0) : undefined}
        risk={colNoHdlRisk}
      />
      <RatiosCard
        title='Colesterol Total/HDL'
        description='La escala del ratio colesterol total entre HDL (colesterol bueno).'
        value={typeof totalHdl === "number" ? totalHdl.toFixed(1) : undefined}
        risk={totalHdlRisk}
      />
      <RatiosCard
        title='LDL/HDL'
        description='La relación LDL/HDL compara el colesterol “malo” (LDL) con el colesterol “bueno” (HDL).'
        value={typeof ldlHdl === "number" ? ldlHdl.toFixed(1) : undefined}
        risk={ldlHdlRisk}
      />
    </>
  );
}
