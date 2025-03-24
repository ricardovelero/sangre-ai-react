import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNotes } from "@/hooks/useNotes";
const addNotaSchema = z.object({
  nota: z.string().min(1, {
    message: "Debes ingresar una nota.",
  }),
});

export default function NotesForm({ analiticaId }: { analiticaId: string }) {
  const form = useForm<z.infer<typeof addNotaSchema>>({
    resolver: zodResolver(addNotaSchema),
    defaultValues: {
      nota: "",
    },
  });

  const { handleAddNote, mutate } = useNotes(analiticaId);

  async function onSubmit(data: z.infer<typeof addNotaSchema>) {
    await handleAddNote(analiticaId, data.nota || "");
    form.reset();
    await mutate();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='relative'>
        <FormField
          control={form.control}
          name='nota'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder='agrega una nota' {...field} rows={6} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormDescription />
        <div className='absolute inset-x-0 bottom-0 flex justify-end py-2 pr-2 pl-3'>
          <Button
            variant={"outline"}
            type='submit'
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Guardando nota..." : "Guardar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
