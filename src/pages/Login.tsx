import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
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

const formSchema = z.object({
  email: z.string().min(1, { message: "Debes ingresar tu email" }),
  password: z.string().min(1, { message: "Debes ingresar tu contraseña" }),
});

export default function LoginForm() {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const errorMessage = await login(values.email, values.password, () => {
      login(values.email, values.password);
      navigate("/a/dashboard");
    });

    if (errorMessage) {
      toast.error(
        errorMessage ||
          "🤦 Falló entrar en la app, por favor intenta de nuevo o contacta sporte."
      );
      console.error(errorMessage || "😵 Something went wrong. Login failed.");
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
          Regístrate
        </h2>
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
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
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
              {form.formState.isSubmitting ? "Ingresando..." : "Ingresar"}
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
