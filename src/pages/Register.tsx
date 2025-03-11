import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";

const schema = z.object({
  nombre: z.string().optional(),
  apellido: z.string().optional(),
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

// Infer TypeScript type from the Zod schema
type FormData = z.infer<typeof schema>;

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/registro",
        data
      );

      console.log(response.data);
      // Aquí puedes guardar los tokens o redirigir al usuario
      alert(response.data.message);
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "Error al registrar");
    }
  };

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <img alt='Sangre AI' src='' className='mx-auto h-10 w-auto' />
        <h2 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>
          Regístrate
        </h2>
      </div>
      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div>
            <label
              htmlFor='nombre'
              className='block text-sm/6 font-medium text-gray-900'
            >
              Nombre (opcional)
            </label>
            <div className='mt-2'>
              <Input type='text' {...register("nombre")} className='inputs' />
            </div>
          </div>

          <div>
            <label
              htmlFor='apellido'
              className='block text-sm/6 font-medium text-gray-900'
            >
              Apellido (opcional)
            </label>
            <div className='mt-2'>
              <Input type='text' {...register("apellido")} className='inputs' />
            </div>
          </div>

          <div>
            <label
              htmlFor='email'
              className='block text-sm/6 font-medium text-gray-900'
            >
              Email
            </label>
            <div className='mt-2'>
              <Input type='email' {...register("email")} className='inputs' />
              {errors.email && (
                <p className='form-error'>{errors.email.message}</p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor='password'
              className='block text-sm/6 font-medium text-gray-900'
            >
              Contraseña
            </label>
            <div className='mt-2'>
              <Input
                type='password'
                {...register("password")}
                className='inputs'
              />
              {errors.password && (
                <p className='form-error'>{errors.password.message}</p>
              )}
            </div>
          </div>

          <Button
            color='indigo'
            type='submit'
            disabled={isSubmitting}
            className='w-full cursor-pointer'
          >
            {isSubmitting ? "Registrando..." : "Registrar"}
          </Button>
        </form>
        <p className='mt-10 text-center text-sm/6 text-gray-500'>
          ¿Ya estás registrado?{" "}
          <Link
            to='/login'
            className='font-semibold text-indigo-600 hover:text-indigo-500'
          >
            Ingresa con tus credenciales
          </Link>
        </p>
      </div>
    </div>
  );
}
