import { useAuthStore } from "@/store/authStore";
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

const formSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .regex(/[a-z]/, { message: "Debe contener al menos una letra minúscula" })
    .regex(/[A-Z]/, { message: "Debe contener al menos una letra mayúscula" })
    .regex(/[0-9]/, { message: "Debe contener al menos un número" })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Debe contener al menos un carácter especial (!@#$%^&*)",
    }),
});

export type FormData = z.infer<typeof formSchema>;

export default function RegisterForm() {
  const { register } = useAuthStore();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    const errorMessage = await register(values, () => {
      console.log("Registration successful!");
      toast.success("Te has registrado con éxito.");
      navigate("/a/dashboard");
    });

    if (errorMessage) {
      toast.error(
        errorMessage ||
          "🤦 Falló el registro, por favor intenta de nuevo o contacta sporte."
      );
      console.error(
        errorMessage || "😵 Something went wrong. Registration failed"
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
        <h2 className='mt-4 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>
          Regístrate
        </h2>
      </div>
      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      className='inputs'
                      placeholder='opcional'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellidos</FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      className='inputs'
                      {...field}
                      placeholder='opcional'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              {form.formState.isSubmitting ? "Registrando..." : "Registrar"}
            </Button>
          </form>
        </Form>
        <p className='mt-10 text-center text-sm/6 text-gray-500'>
          ¿Ya estás registrado?{" "}
          <NavLink
            to='/login'
            className='font-semibold text-indigo-600 hover:text-indigo-500'
          >
            Ingresa con tus credenciales
          </NavLink>
        </p>
      </div>
    </div>
  );
}
