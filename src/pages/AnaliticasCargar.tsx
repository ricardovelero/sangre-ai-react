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
import PageHeader from "@/components/PageHeader";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import CardView from "@/components/analiticas/CardView";
import { Analitica } from "@/types/analitica.types";
import { useAuthStore } from "@/store/authStore";

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
  const [analisis, setAnalisis] = useState<Analitica>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof fileUploadSchema>>({
    resolver: zodResolver(fileUploadSchema),
    defaultValues: {
      file: undefined,
    },
  });
  const { getToken } = useAuthStore();

  async function onSubmit(data: z.infer<typeof fileUploadSchema>) {
    const formData = new FormData();
    formData.append("file", data.file);

    console.log("Archivo PDF subido:", data.file);
    try {
      setLoading(true);
      const token = await getToken();

      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        setAnalisis(response.data);
        toast.success(response.data.message);
      }
      console.log("El texto recibido", response.data.text);
    } catch (error: any) {
      if (error) {
        setError(
          error.response?.data.message ||
            "Algo malo pasó. Error al subir el archivo"
        );
        toast.error(
          error.response?.data.message ||
            "Algo malo pasó. Error al subir el archivo"
        );
      }
      console.log("Algo malo pasó");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <LoadingState message='Procesando analítica...' />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className='py-10'>
      <PageHeader title='Cargar Analítica' />
      <main className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
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
                      onChange={(e) => field.onChange(e.target.files?.[0])}
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
              {loading ? "Subiendo..." : "Subir"}
            </Button>
          </form>
        </Form>
        {analisis && <CardView analitica={analisis} />}
      </main>
    </div>
  );
}
