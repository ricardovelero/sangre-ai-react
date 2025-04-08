import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from "react-router-dom";
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

const formSchema = z.object({
  email: z.string().min(1, { message: "Debes ingresar tu email" }),
});

// Backend API URL
const API_URL =
  `${import.meta.env.VITE_APP_API_URL}/auth` ||
  "http://localhost:3000/api/auth";

export default function LoginForm() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, values);

      console.log(response.data.message);

      toast.info(response.data.message);
      navigate("/");
    } catch (error: any) {
      console.error(
        error.response.data.message || "😵 Something went wrong. Login failed."
      );
      toast.error(
        error.response.data.message ||
          "🤦 Algo salió mal!, por favor intenta de nuevo o contacta soporte."
      );
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
        <h2 className='mt-4 text-center text-2xl/9 font-bold tracking-tight text-accent-foreground'>
          Restaurar Contraseña
        </h2>
        <p className='text-sm text-center text-gray-600'>
          Ingresa el correo electrónico con que te registraste.
        </p>
      </div>
      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type='email' className='inputs' {...field} />
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
              {form.formState.isSubmitting ? "Enviando..." : "Enviar"}
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
