import { columns } from "@/components/analiticas/Columns";
import { DataTable } from "@/components/analiticas/DataTable";
import CardView from "@/components/analiticas/CardView";
import { useEffect, useState } from "react";
import EmptyState from "@/components/EmptyState";
import { Clipboard, LayoutList, Table } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { useAnaliticas } from "@/hooks/useAnaliticas";
import { AnimatePresence, motion } from "framer-motion";

export default function Analiticas() {
  const {
    deleteDialogOpen,
    setDeleteDialogOpen,
    isProcessing,
    error,
    analiticas,
    isLoading,
    analiticaToDelete,
    setAnaliticaToDelete,
    handleDeleteAnalitica,
  } = useAnaliticas();
  const [isTableView, setIsTableView] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (analiticas?.length <= 4 && analiticas?.length > 0) {
      setIsTableView(false);
    }
  }, [analiticas]);

  if (isLoading) return <LoadingState message='Cargando analíticas...' />;
  if (error) return <ErrorState message={error} />;
  return (
    <div className='py-10'>
      <header className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10'>
        <div className='flex justify-between'>
          <h1 className='text-3xl font-bold tracking-tight text-accent-foreground'>
            Analíticas
          </h1>
          {analiticas?.length > 0 && (
            <div className='flex'>
              <Button
                variant={"link"}
                className={cn(
                  !isTableView && "bg-accent text-accent-foreground"
                )}
                onClick={() => setIsTableView(false)}
              >
                <LayoutList />
              </Button>
              <Button
                variant={"link"}
                className={cn(
                  isTableView && "bg-accent text-accent-foreground"
                )}
                onClick={() => setIsTableView(true)}
              >
                <Table />
              </Button>
            </div>
          )}
        </div>
      </header>
      <main className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
        <AnimatePresence mode='wait'>
          {analiticas?.length === 0 ? (
            <motion.div
              key='empty'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <EmptyState
                message='No tienes analiticas.'
                icon={<Clipboard size={32} />}
                buttonLabel='Subir analítica'
                onButtonClick={() => navigate("/a/subir-analitica")}
              />
            </motion.div>
          ) : isTableView ? (
            <motion.div
              key='table'
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <DataTable
                columns={columns((analitica) => {
                  setAnaliticaToDelete(analitica);
                  setDeleteDialogOpen(true);
                })}
                data={analiticas || []}
              />
            </motion.div>
          ) : (
            <motion.div
              key='cards'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className='grid grid-cols-1 md:grid-cols-2 gap-4'
            >
              {analiticas.map((analitica) => (
                <CardView
                  key={analitica._id}
                  analitica={analitica}
                  setAnaliticaToDelete={setAnaliticaToDelete}
                  setDeleteDialogOpen={setDeleteDialogOpen}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <ConfirmationDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteAnalitica}
        title='Eliminar analítica'
        description={`Estás seguro de querer eliminar la analítica ${analiticaToDelete?._id}?`}
        confirmText='Eliminar'
        confirmVariant='destructive'
        isProcessing={isProcessing}
      />
    </div>
  );
}
