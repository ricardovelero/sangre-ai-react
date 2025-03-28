import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const messages = [
  "⏳ Analizando tu archivo...",
  "💡 Esto puede tardar unos segundos.",
  "🧬 Desentrañando tus glóbulos rojos...",
  "🔬 Buscando patrones invisibles...",
  "📊 Preparando tu informe personalizado...",
  "🧠 Activando inteligencia artificial...",
  "✨ Casi listo...",
];

const TOTAL_DURATION = 35_000; // 35 segundos
const UPDATE_INTERVAL = 500; // cada medio segundo

export function ProcessingMessagesWithProgress({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Rota mensajes cada 3s
  useEffect(() => {
    const msgInterval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 5000);
    return () => clearInterval(msgInterval);
  }, []);

  // Barra sincronizada con duración total
  useEffect(() => {
    const totalSteps = TOTAL_DURATION / UPDATE_INTERVAL;
    const increment = 100 / totalSteps;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(progressInterval);
          if (onComplete) onComplete();
          return 100;
        }
        return next;
      });
    }, UPDATE_INTERVAL);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  return (
    <Card className='w-full max-w-md mx-auto mt-6 shadow-md'>
      <CardContent className='p-6 text-center space-y-4'>
        <div className='h-6 relative overflow-hidden'>
          <AnimatePresence mode='wait'>
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className='text-muted-foreground text-base'
            >
              {messages[index]}
            </motion.p>
          </AnimatePresence>
        </div>

        <Progress value={progress} />
      </CardContent>
    </Card>
  );
}
