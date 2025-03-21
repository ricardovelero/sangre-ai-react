import * as React from "react";

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
  DrawerTrigger,
} from "@/components/ui/drawer";
import EditAnaliticaForm from "./EditAnaliticaForm";

type DialogDrawerEditAnaliticaProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
};

export function DialogDrawerEditAnalitica({
  setOpen,
  open,
}: DialogDrawerEditAnaliticaProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Editar analítica</DialogTitle>
            <DialogDescription>
              Ingresa datos que no hayan sido identificados.
            </DialogDescription>
          </DialogHeader>
          <EditAnaliticaForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant='outline'>Editar analítica</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>Editar analítica</DrawerTitle>
          <DrawerDescription>
            Realiza cambios en la analítica aquí. Haz clic en guardar cuando
            hayas terminado.
          </DrawerDescription>
        </DrawerHeader>
        <EditAnaliticaForm className='px-4' setOpen={setOpen} />
        <DrawerFooter className='pt-2'>
          <DrawerClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
