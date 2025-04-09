import { NavLink } from "react-router-dom";
import Newsletter from "../components/Newsletter";
import Feature from "@/components/Feature";
export default function Home() {
  return (
    <div className='relative px-6 pt-14 lg:px-8'>
      <div
        aria-hidden='true'
        className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className='relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
        />
      </div>
      <div className='mx-auto max-w-2xl h-screen py-32 sm:py-48 lg:py-56'>
        <div className='text-center'>
          <h1 className='text-5xl font-semibold tracking-tight text-balance text-accent-foreground sm:text-7xl'>
            Descifra tu analítica de sangre con IA
          </h1>
          <p className='mt-8 text-lg font-medium text-pretty text-muted-foreground sm:text-xl/8'>
            Sube tu archivo y deja que nuestro sistema traduzca los datos
            médicos en información comprensible. Porque entender tu salud no
            debería requerir un diccionario médico.
          </p>
          <div className='mt-10 flex items-center justify-center gap-x-6'>
            <NavLink
              to='/register'
              className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2'
            >
              Empezar
            </NavLink>
            <NavLink
              to='/how-it-works'
              className='text-sm/6 font-semibold text-accent-foreground'
            >
              Cómo funciona
              <span aria-hidden='true'>→</span>
            </NavLink>
          </div>
        </div>
      </div>
      <div
        aria-hidden='true'
        className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className='relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'
        />
      </div>
      <Feature />
      <Newsletter />
    </div>
  );
}
