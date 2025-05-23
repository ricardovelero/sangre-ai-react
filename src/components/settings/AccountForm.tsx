import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";

const formSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  //   email: z.string().email({ message: "Email inválido" }),
  //   password: z
  //     .string()
  //     .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
  //     .regex(/[a-z]/, { message: "Debe contener al menos una letra minúscula" })
  //     .regex(/[A-Z]/, { message: "Debe contener al menos una letra mayúscula" })
  //     .regex(/[0-9]/, { message: "Debe contener al menos un número" })
  //     .regex(/[!@#$%^&*(),.?":{}|<>]/, {
  //       message: "Debe contener al menos un carácter especial (!@#$%^&*)",
  //     }),
});

export type UpdateUserFormData = z.infer<typeof formSchema>;

export default function AccountForm() {
  const { updateUser, user } = useAuthStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      //   email: user.email,
      //   password: "",
    },
  });

  const onSubmit = async (values: UpdateUserFormData) => {
    const errorMessage = await updateUser(values, () => {
      toast.success("Datos guardados con éxito.");
    });

    if (errorMessage) {
      toast.error(
        errorMessage ||
          "🤦 Falló el registro, por favor intenta de nuevo o contacta sporte."
      );
      console.error(errorMessage || "😵 Something went wrong. Update failed");
    }
  };

  return (
    <div className='space-y-4'>
      <h2 className='text-2xl'>Cambia tus datos personales</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full sm:w-xs space-y-6'
        >
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input type='text' placeholder='opcional' {...field} />
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
                  <Input type='text' {...field} placeholder='opcional' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
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
    /> */}

          {/* <FormField
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
    /> */}

          <Button
            type='submit'
            disabled={form.formState.isSubmitting}
            className='w-full'
          >
            {form.formState.isSubmitting ? "Guardando..." : "Guardar"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
