import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

const fileUploadSchema = z.object({
  file: z
    .instanceof(File, { message: "Debe ser un archivo válido" })
    .refine((file) => file.type === "application/pdf", {
      message: "Solo se permiten archivos PDF",
    })
    .refine((file) => file.size < 1 * 1024 * 1024, {
      message: "El archivo debe pesar menos de 1MB",
    }),
});

export default function AnaliticasCargar() {
  const [analisis, setAnalisis] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof fileUploadSchema>>({
    resolver: zodResolver(fileUploadSchema),
    defaultValues: {
      file: undefined,
    },
  });

  async function onSubmit(data: z.infer<typeof fileUploadSchema>) {
    const formData = new FormData();
    formData.append("file", data.file);

    console.log("Archivo PDF subido:", data.file);
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data) {
        setAnalisis(response.data.text);
        toast.success(response.data.message);
      }
      console.log("El texto recibido", response.data.text);
    } catch (error: any) {
      console.error("Error subiendo el archivo", error.response.data.message);
      toast.error(
        error.response.data.message ||
          "Algo malo pasó. Error al subir el archivo"
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center gap-2 h-screen'>
        <LoaderCircle className='animate-spin' size={16} />
        <span className='animate-pulse'>Subiendo....</span>
      </div>
    );
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-2/3 space-y-6'
        >
          <FormField
            control={form.control}
            name='file'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Selecciona tu archivo</FormLabel>
                <FormControl>
                  <Input
                    accept='application/pdf'
                    type='file'
                    placeholder='analitica.pdf'
                    onChange={(e) => field.onChange(e.target.files?.[0])} // ✅ Ensure real file is stored
                  />
                </FormControl>
                <FormDescription>
                  Por ahora, solo aceptamos archivos PDF
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' disabled={loading}>
            Subir
          </Button>
        </form>
      </Form>
      {loading && (
        <>
          <h2>Tu analisis</h2>
          <div>{analisis}</div>
        </>
      )}
    </>
  );
}
