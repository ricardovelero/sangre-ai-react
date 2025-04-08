import { NavLink } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function Newsletter() {
  return (
    <div className='py-16 sm:py-24 lg:py-32'>
      <div className='mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8'>
        <h2 className='max-w-xl text-3xl text-center sm:text-left font-semibold tracking-tight text-balance text-accent-foreground sm:text-4xl lg:col-span-7'>
          Queremos informarte sobre nuestras novedades.
        </h2>
        <form className='w-full max-w-md lg:col-span-5 lg:pt-2'>
          <div className='flex flex-col sm:flex-row gap-4 sm:gap-x-4'>
            <label htmlFor='email-address' className='sr-only'>
              Díganos tu email
            </label>
            <Input
              id='email-address'
              name='email'
              type='email'
              required
              placeholder='Ingresa tu email'
              autoComplete='email'
            />
            <Button type='submit'>Suscribirme</Button>
          </div>
          <p className='mt-4 text-sm/6 text-muted-foreground'>
            Nos importa tu privacidad. Lee nuestra{" "}
            <NavLink
              to='/privacy-policy'
              className='font-semibold underline-offset-4 hover:underline'
            >
              política de privacidad
            </NavLink>
            .
          </p>
        </form>
      </div>
    </div>
  );
}
