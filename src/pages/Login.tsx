import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";

const schema = z.object({
  email: z.string().min(1, { message: "Debes ingresar tu email" }),
  password: z.string().min(1, { message: "Debes ingresar tu contraseña" }),
});

// Infer TypeScript type from the Zod schema
type FormData = z.infer<typeof schema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        `${process.env.API_URL}/api/auth/login`,
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
            <div className='flex items-center justify-between'>
              <label
                htmlFor='password'
                className='block text-sm/6 font-medium text-gray-900'
              >
                Contraseña
              </label>
              <div className='text-sm'>
                <Link
                  to='/forgot-password'
                  className='font-semibold text-indigo-600 hover:text-indigo-500'
                >
                  ¿Olvidastes tu contraseña?
                </Link>
              </div>
            </div>
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
            {isSubmitting ? "Ingresando..." : "Ingresar"}
          </Button>
        </form>
        <p className='mt-10 text-center text-sm/6 text-gray-500'>
          ¿No estás registrado?{" "}
          <Link
            to='/register'
            className='font-semibold text-indigo-600 hover:text-indigo-500'
          >
            Regístrate aquí gratis
          </Link>
        </p>
      </div>
    </div>
  );
}
