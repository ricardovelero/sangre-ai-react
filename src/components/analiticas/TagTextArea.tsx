import { useState } from "react";
import { Badge } from "../ui/badge";
import { useTags } from "@/hooks/useTags";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type TagTextAreaProps = {
  analiticaId: string;
};

export default function TagTextArea({ analiticaId }: TagTextAreaProps) {
  const [tag, setTag] = useState("");
  const { tags, isLoading, error, mutate } = useTags(analiticaId);

  if (isLoading) {
    return <div>Cargando...</div>;
  }
  if (error) {
    return <div>Error caragando etiquetas...</div>;
  }

  return (
    <div className='mb-12'>
      {tags.length > 0 && tags.map((tag) => <Badge>{tag.name}</Badge>)}
      <div className='flex flex-col items-center gap-2'>
        <Input
          placeholder='agrega una etiqueta'
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <Button type='button' variant={"outline"} className='self-end'>
          Agregar
        </Button>
      </div>
    </div>
  );
}
