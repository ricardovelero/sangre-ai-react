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

// const test = `**Análisis Integral de la Analítica**

// **Salud Metabólica:**

// *   **Glucosa:** El nivel de glucosa en ayunas de 98 mg/dl es óptimo. Esto sugiere una buena sensibilidad a la insulina y un riesgo bajo de resistencia a la insulina. Mantener una dieta equilibrada rica en fibra y baja en azúcares añadidos puede ayudar a preservar esta salud metabólica.
// *   **Hemoglobina Glicosilada (A1c):** Un valor de 5.0% es excelente y confirma un buen control de la glucosa en sangre a largo plazo. Continuar con hábitos de vida saludables es clave.
// *   **Triglicéridos:** El nivel de 84 mg/dl está dentro del rango normal y saludable. Una dieta baja en grasas saturadas y azúcares refinados, junto con ejercicio regular, contribuye a mantener estos niveles.

// **Inflamación:**

// *   **Proteína C Reactiva (PCR):** El valor elevado de 7.5 mg/l sugiere la presencia de inflamación. Aunque puede ser causada por diversas condiciones, es crucial investigar la causa. Una dieta antiinflamatoria rica en antioxidantes (frutas, verduras, omega-3) puede ser beneficiosa. Considera discutir esto con tu médico para descartar causas subyacentes y determinar si se necesitan pruebas adicionales.

// **Función Hepática:**

// *   **AST (GOT) y ALT (GPT):** Los niveles de AST (24 UI/I) y ALT (15 UI/I) son normales, lo que indica una buena salud hepática.
// *    **Bilirrubina Total:** Ligeramente elevada, junto con la bilirrubina directa e indirecta elevada. Es esencial investigar más a fondo las posibles causas, como problemas hepáticos leves o síndrome de Gilbert, para descartar cualquier problema subyacente.
// *   **GGT y Fosfatasa Alcalina:** Estos valores están dentro del rango normal, lo que también apoya la salud hepática.

// **Función Renal:**

// *   **Creatinina:** El nivel de creatinina (1.10 mg/dl) está dentro del rango normal, indicando una función renal adecuada. Mantener una buena hidratación es importante para la salud renal.

// **Salud Cardiovascular:**

// *   **Colesterol Total:** El nivel de colesterol total (193 mg/dl) es normal.
// *   **HDL (Colesterol "Bueno"):** El HDL (44 mg/dl) podría optimizarse. Un valor más alto es protector para la salud cardiovascular. Aumentar la actividad física, consumir grasas saludables (aguacate, aceite de oliva) y fibra soluble puede ayudar a elevar el HDL.
// *   **LDL (Colesterol "Malo"):** El LDL (132 mg/dl) está dentro del rango normal pero podría ser mejor. Reducir el consumo de grasas saturadas y trans, y aumentar la ingesta de fibra, podría ayudar a reducir el LDL.
// *   **Triglicéridos:** El nivel (84 mg/dl) está dentro de rango saludable.

// **Equilibrio Hormonal:**

// *   **Cortisol:** El cortisol matutino (6.75 µg/dl) está dentro del rango normal, lo que sugiere una función adrenal adecuada.
// *   **TSH (Hormona Estimulante de la Tiroides):** El valor de TSH (6.27 µUI/ml) es alto, y la tiroxina libre (T4 libre) está dentro de rango. Este patrón sugiere un posible hipotiroidismo subclínico. Es importante consultar a un médico para una evaluación más exhaustiva y determinar si es necesario tratamiento.

// **Estado Nutricional:**

// *   **Vitamina D3:** El nivel de vitamina D3 (21.9 ng/ml) es insuficiente. Se recomienda suplementar con vitamina D3, preferiblemente bajo supervisión médica para determinar la dosis adecuada. La vitamina D es esencial para la salud ósea, inmunidad y otras funciones importantes.
// *   **Ferritina:** El nivel de ferritina (85.57 ng/ml) indica reservas adecuadas de hierro.
// *   **Proteínas Totales:** El nivel de proteínas totales (6.89 g/dl) está dentro del rango normal, sugiriendo una ingesta adecuada de proteínas.

// **Serie Blanca y Roja:**

// *   **Serie Blanca:** Todos los componentes de la serie blanca están dentro de rango normal, indicando una respuesta inmune adecuada.
// *   **Serie Roja:** Los parámetros de la serie roja son normales, indicando una buena producción y función de los glóbulos rojos.

// **Orina y Heces:**

// *   **Orina:** Los análisis de orina están normales.
// *    **Heces:** La prueba de sangre oculta en heces es negativa.

// **Recomendaciones Prácticas:**

// 1.  **Inflamación:**
//     *   Adoptar una dieta antiinflamatoria: Incrementar el consumo de frutas, verduras, grasas saludables (omega-3), y reducir alimentos procesados, azúcares y grasas saturadas.
//     *   Consultar al médico para investigar la causa de la PCR elevada y descartar condiciones subyacentes.
// 2.  **Salud Cardiovascular:**
//     *   Aumentar el consumo de fibra soluble (avena, legumbres) para ayudar a reducir el LDL.
//     *   Realizar ejercicio cardiovascular regularmente para mejorar el HDL.
// 3.  **Vitamina D:**
//     *   Suplementar con vitamina D3 bajo supervisión médica para alcanzar niveles óptimos.
//     *   Exponerse al sol de forma segura (15-20 minutos al día) puede ayudar a sintetizar vitamina D.
// 4.  **Función Tiroidea:**
//     *   Consultar al médico para evaluar el posible hipotiroidismo subclínico. Se pueden necesitar pruebas adicionales para confirmar el diagnóstico y determinar si es necesario tratamiento.
// 5.  **Función Hepática:**
//     *   Consultar al médico para investigar la causa de la elevación de la bilirrubina.

// **Consideraciones Adicionales:**

// *   El informe indica inflamación, evidenciado por la PCR alta. Es crucial investigar la causa subyacente.
// *   Aunque la mayoría de los parámetros están dentro de rangos normales, se pueden realizar ajustes en la dieta y el estilo de vida para optimizar la salud cardiovascular y metabólica.
// *   Es importante realizar un seguimiento médico regular y repetir estas pruebas para monitorear cualquier cambio y ajustar las estrategias de intervención según sea necesario.
// *   Dada la elevación de la bilirrubina y la TSH, es muy recomendable buscar atención médica para evaluación y manejo adecuado.`;

// const testId = "67d2c3530275554b7f1b2c48";
