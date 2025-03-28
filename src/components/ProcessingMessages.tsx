import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const messages = [
  "⏳ Analizando tu archivo...",
  "💡 Esto puede tardar unos segundos.",
  "🧬 Desentrañando tus glóbulos rojos...",
  "🔬 Buscando patrones invisibles...",
  "📊 Preparando tu informe personalizado...",
  "🧠 Activando inteligencia artificial...",
  "✨ Casi listo...",
];

export function ProcessingMessages() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 5000); // cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className='w-1/2 max-w-md mx-auto mt-6 animate-pulse shadow-lg'>
      <CardContent className='p-6 text-center text-muted-foreground text-base'>
        {messages[index]}
      </CardContent>
    </Card>
  );
}
