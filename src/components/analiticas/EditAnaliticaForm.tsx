import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { useAnaliticas } from "@/hooks/useAnaliticas";
import { format } from "date-fns";
import { Analitica } from "@/types/analitica.types";

type EditAnaliticaFormProps = {
  analitica: Analitica;
  className?: string;
  setOpen?: (open: boolean) => void;
};

const editAnaliticaSchema = z.object({
  laboratorio: z.string().min(1, { message: "Debes ingresar un laboratorio." }),
  medico: z.string().min(1, { message: "Debes ingresar un médico." }),
  nombre: z.string().min(1, {
    message: "Debes ingresar un nombre de paciente.",
  }),
  apellidos: z.string().min(1, {
    message: "Debes ingresar un apellido de paciente.",
  }),
  fecha: z.string().min(1, {
    message: "Debes ingresar una fecha de la analítica.",
  }),
});

type PartialAnaliticaData = Partial<z.infer<typeof editAnaliticaSchema>>;

export default function EditAnaliticaForm({
  analitica,
  className,
  setOpen,
}: EditAnaliticaFormProps) {
  const { updateAnalitica, useAnaliticaById } = useAnaliticas();
  const { mutate } = useAnaliticaById(analitica?._id || "");
  const form = useForm<z.infer<typeof editAnaliticaSchema>>({
    resolver: zodResolver(editAnaliticaSchema),
    defaultValues: {
      laboratorio: analitica?.laboratorio || "N/D",
      medico: analitica?.medico || "N/D",
      nombre: analitica?.paciente?.nombre || "N/D",
      apellidos: analitica?.paciente?.apellidos || "N/D",
      fecha: analitica?.fecha_toma_muestra
        ? format(analitica?.fecha_toma_muestra, "yyyy-MM-dd")
        : "",
    },
  });

  async function onSubmit(data: PartialAnaliticaData) {
    setOpen?.(false);
    const analiticaData: Partial<Analitica> = {
      ...data,
      _id: analitica?._id || "",
    };

    updateAnalitica(analiticaData as Analitica);
    await mutate();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("grid items-start gap-4", className)}
      >
        <FormField
          control={form.control}
          name='nombre'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre Paciente</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='el paciente que se analizó'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='apellidos'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellidos Paciente</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='los apellidos del paciente'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='fecha'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha de la analítica</FormLabel>
              <FormControl>
                <Input
                  type='date'
                  placeholder='la fecha de la analítica'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='laboratorio'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Laboratorio</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='el laboratorio donde se hizo la analítica'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='medico'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Médico</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='el médico que ordenó la analítica'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormDescription>
          Haz clic en guardar cuando hayas terminado.
        </FormDescription>
        <Button type='submit' disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Guardando..." : "Guardar"}
        </Button>
      </form>
    </Form>
  );
}
