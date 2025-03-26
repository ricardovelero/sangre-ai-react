import { NavLink } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function Newsletter() {
  return (
    <div className='bg-white py-16 sm:py-24 lg:py-32'>
      <div className='mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8'>
        <h2 className='max-w-xl text-3xl text-center sm:text-left font-semibold tracking-tight text-balance text-gray-900 sm:text-4xl lg:col-span-7'>
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
              className='min-w-0 flex-auto rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
            />
            <Button
              type='submit'
              className='flex-none rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Suscribirme
            </Button>
          </div>
          <p className='mt-4 text-sm/6 text-gray-900'>
            Nos importa tu privacidad. Lee nuestra{" "}
            <NavLink
              to='/privacy-policy'
              className='font-semibold text-indigo-600 hover:text-indigo-500'
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
