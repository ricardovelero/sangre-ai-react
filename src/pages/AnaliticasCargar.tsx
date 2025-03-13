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
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

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
  const [analisisId, setAnalisisId] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
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
        setAnalisisId(response.data.id);
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
        <span className='animate-pulse'>Procesando....</span>
      </div>
    );
  }

  return (
    <div className='py-10'>
      <header>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
            Cargar Analítica
          </h1>
        </div>
      </header>
      <main>
        <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
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
                {loading ? "Subiendo..." : "Subir"}
              </Button>
            </form>
          </Form>
          {analisis && (
            <Card className='mt-12 w-2xl'>
              <CardHeader>
                <CardTitle>Resultados</CardTitle>
                <CardDescription>
                  Aquí tienes un extracto del análisis.
                </CardDescription>
              </CardHeader>
              <CardContent className='line-clamp-6'>
                <Markdown remarkPlugins={[remarkGfm]}>{analisis}</Markdown>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate("/a/analitica/" + analisisId)}>
                  Ver informe completo
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
