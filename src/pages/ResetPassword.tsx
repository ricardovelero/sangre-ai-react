import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import axios from "axios";

// Backend API URL
const API_URL =
  `${import.meta.env.VITE_APP_API_URL}/auth` ||
  "http://localhost:3000/api/auth";

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
      .regex(/[a-z]/, { message: "Debe contener al menos una letra minúscula" })
      .regex(/[A-Z]/, { message: "Debe contener al menos una letra mayúscula" })
      .regex(/[0-9]/, { message: "Debe contener al menos un número" })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Debe contener al menos un carácter especial (!@#$%^&*)",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Debes confirmar tu contraseña" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"], // Para que el error se muestre en confirmPassword
  });

export { formSchema };

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const data = {
      token,
      newPassword: values.password,
    };
    try {
      const response = await axios.post(`${API_URL}/reset-password`, data);

      toast.info(response.data.message);
      navigate("/login");
    } catch (error: any) {
      if (error) {
        toast.error(
          error.response.data.message ||
            "🤦 Falló el cambio de contraseña, por favor intenta de nuevo o contacta sporte."
        );
        console.error(
          error.response.data.message ||
            "😵 Something went wrong. Login failed."
        );
      }
    }
  };

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <img
          alt='Sangre AI'
          src='/sangreai.webp'
          className='mx-auto h-10 w-auto'
        />
        <h2 className='mt-4 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>
          Cambiar Contraseña
        </h2>
        <p className='text-sm text-center text-gray-600'>
          La contraseña debe tener mínimo 8 caracteres, una mayúscula, y un
          caracter especial (!@#$%^&*).
        </p>
      </div>
      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nueva Contraseña</FormLabel>
                  <FormControl>
                    <Input type='password' className='inputs' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Contraseña</FormLabel>
                  <FormControl>
                    <Input type='password' className='inputs' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              disabled={form.formState.isSubmitting}
              className='w-full'
            >
              {form.formState.isSubmitting ? "Procesando..." : "Enviar"}
            </Button>
          </form>
        </Form>
        <p className='mt-10 text-center text-sm/6 text-gray-500'>
          ¿No estás registrado?{" "}
          <NavLink
            to='/register'
            className='font-semibold text-indigo-600 hover:text-indigo-500'
          >
            Regístrate aquí gratis
          </NavLink>
        </p>
      </div>
    </div>
  );
}
