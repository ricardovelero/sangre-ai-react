import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import EditAnaliticaForm from "./EditAnaliticaForm";
import NotesForm from "./NotesForm";
import { useAnaliticaStore } from "@/store/analiticaStore";
import { Analitica } from "@/types/analitica.types";

type DialogDrawerEditAnaliticaProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  addNota: boolean;
};

export function DialogDrawerEditAnalitica({
  setOpen,
  open,
  addNota,
}: DialogDrawerEditAnaliticaProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { analitica } = useAnaliticaStore();
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>
              {addNota ? "Agregar nota" : "Editar analítica"}
            </DialogTitle>
            <DialogDescription>
              {addNota
                ? "Ingresa una nota para la analítica. La nota se agregará a la analítica."
                : "Realiza cambios en la analítica aquí."}
            </DialogDescription>
          </DialogHeader>
          {addNota ? (
            <NotesForm analiticaId={analitica?._id || ""} setOpen={setOpen} />
          ) : (
            <EditAnaliticaForm
              setOpen={setOpen}
              analitica={analitica || ({} as Analitica)}
            />
          )}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>
            {addNota ? "Agregar nota" : "Editar analítica"}
          </DrawerTitle>
          <DrawerDescription>
            {addNota
              ? "Ingresa una nota para la analítica. La nota se agregará a la analítica."
              : "Realiza cambios en la analítica aquí."}
          </DrawerDescription>
        </DrawerHeader>
        {addNota ? (
          <NotesForm analiticaId={analitica?._id || ""} setOpen={setOpen} />
        ) : (
          <EditAnaliticaForm
            className='px-4'
            setOpen={setOpen}
            analitica={analitica || ({} as Analitica)}
          />
        )}
        <DrawerFooter className='pt-2'>
          <DrawerClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
