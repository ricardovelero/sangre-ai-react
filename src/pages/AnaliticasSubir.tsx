import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import ErrorState from "@/components/ErrorState";
import { useAuthStore } from "@/store/authStore";
import { NavLink, useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ProcessingMessagesWithProgress } from "@/components/ProcessingMessagesWithProgress.tsx";

const hasRememberedConsent = localStorage.getItem("rememberConsent") === "true";

const fileUploadSchema = z.object({
  file: z
    .instanceof(File, { message: "Debe ser un archivo válido" })
    .refine((file) => file.type === "application/pdf", {
      message: "Solo se permiten archivos PDF",
    })
    .refine((file) => file.size < 5 * 1024 * 1024, {
      message: "El archivo debe pesar menos de 5MB",
    }),
  consent: hasRememberedConsent
    ? z.boolean().optional()
    : z.boolean().refine((val) => val === true, {
        message: "Debes aceptar la política de privacidad.",
      }),
  style: z.enum(["attia", "jaramillo"], {
    required_error: "Debes seleccionar un estilo de análisis.",
  }),
  rememberConsent: z.boolean().optional(),
});

export default function AnaliticasSubir() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof fileUploadSchema>>({
    resolver: zodResolver(fileUploadSchema),
    defaultValues: {
      file: undefined,
      consent: hasRememberedConsent,
      style: "attia",
      rememberConsent: false,
    },
  });
  const { token } = useAuthStore();
  const navigate = useNavigate();

  async function onSubmit(data: z.infer<typeof fileUploadSchema>) {
    const formData = new FormData();
    formData.append("file", data.file);

    console.log("Archivo PDF subido:", data.file);
    try {
      setLoading(true);

      await axios.post(`${import.meta.env.VITE_APP_API_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Analítica procesada correctamente.");
      navigate("/a/analiticas");
    } catch (err: any) {
      if (err?.response?.status === 422) {
        toast.error(
          "El archivo no es una analítica. Por favor, revisa el archivo o contacta a soporte."
        );
      } else {
        setError(
          err.response?.data.message ||
            "Algo malo pasó. Error al subir el archivo"
        );
        toast.error(err.response?.data.message || "Error al subir el archivo");
      }
      console.log(err.response?.data.message || "Error al subir el archivo");
    } finally {
      setLoading(false);
    }

    if (data.rememberConsent) {
      localStorage.setItem("rememberConsent", "true");
    }
  }

  if (loading) return <ProcessingMessagesWithProgress />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className='py-10'>
      <PageHeader title='Subir Analítica' />
      <main className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='sm:w-2/3 space-y-6'
          >
            <FormField
              control={form.control}
              name='file'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adjunta tu analítica:</FormLabel>
                  <FormControl>
                    <Dropzone
                      onFileSelected={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormDescription>
                    Por ahora, solo aceptamos archivos PDF
                  </FormDescription>
                  <FormMessage className='text-destructive' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='style'
              render={({ field }) => (
                <FormItem className='space-y-2'>
                  <FormLabel>Quiero que la analices al estilo de:</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex flex-col space-y-1'
                    >
                      <FormItem className='flex items-center space-x-2 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='attia' />
                        </FormControl>
                        <FormLabel className='font-normal'>
                          Dr. Peter Attia
                        </FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-x-2 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='jaramillo' />
                        </FormControl>
                        <FormLabel className='font-normal'>
                          Dr. Carlos Jaramillo
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className='text-destructive' />
                </FormItem>
              )}
            />

            {!hasRememberedConsent && (
              <>
                <FormLabel>Aceptar política de privacidad:</FormLabel>
                <FormField
                  control={form.control}
                  name='consent'
                  render={({ field }) => (
                    <FormItem className='flex items-center'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className='text-xs'>
                        <NavLink
                          to='/privacy-policy'
                          className='underline text-accent-foreground'
                        >
                          Acepto la Política de Privacidad y doy mi
                          consentimiento
                        </NavLink>
                        <FormMessage className='text-destructive' />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='rememberConsent'
                  render={({ field }) => (
                    <FormItem className='flex items-center'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className='text-xs'>
                        No volver a preguntarme sobre el consentimiento
                        <FormMessage className='text-destructive' />
                      </div>
                    </FormItem>
                  )}
                />
              </>
            )}

            <Button type='submit' disabled={loading}>
              {loading ? "Subiendo..." : "Subir"}
            </Button>
          </form>
        </Form>
      </main>
    </div>
  );
}

function Dropzone({
  onFileSelected,
  value,
}: {
  onFileSelected: (file: File) => void;
  value: File | undefined;
}) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileSelected(acceptedFiles[0]);
      }
    },
  });

  return (
    <div
      {...getRootProps()}
      className='border border-dashed border-gray-400 rounded-md p-6 text-center cursor-pointer'
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Suelta el archivo aquí...</p>
      ) : value ? (
        <p className='text-sm text-green-700'>📄 {value.name}</p>
      ) : (
        <p className='text-sm'>
          Arrastra un archivo aquí o haz clic para seleccionar uno
        </p>
      )}
    </div>
  );
}
