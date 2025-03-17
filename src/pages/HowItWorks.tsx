import { Brain, ChartBar, CloudUpload, Globe } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function HowItWorks() {
  return (
    <div className='relative isolate overflow-hidden bg-white py-12 sm:py-24'>
      <div
        aria-hidden='true'
        className='absolute -top-80 left-[max(6rem,33%)] -z-10 transform-gpu blur-3xl sm:left-1/2 md:top-20 lg:ml-20 xl:top-3 xl:ml-56'
      >
        <div
          style={{
            clipPath:
              "polygon(63.1% 29.6%, 100% 17.2%, 76.7% 3.1%, 48.4% 0.1%, 44.6% 4.8%, 54.5% 25.4%, 59.8% 49.1%, 55.3% 57.9%, 44.5% 57.3%, 27.8% 48%, 35.1% 81.6%, 0% 97.8%, 39.3% 100%, 35.3% 81.5%, 97.2% 52.8%, 63.1% 29.6%)",
          }}
          className='aspect-801/1036 w-[50.0625rem] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30'
        />
      </div>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:mx-0'>
          <p className='text-base/7 font-semibold text-indigo-600'>
            Visualiza tu análisis de sangre
          </p>
          <h1 className='mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl'>
            Otra perspectiva de tu salud
          </h1>
          <p className='mt-6 text-xl/8 text-gray-700'>
            Transforma tu análisis de sangre en información útil en cuestión de
            segundos. Nuestra aplicación utiliza inteligencia artificial
            avanzada para interpretar tus resultados de forma rápida, segura y
            sencilla.
          </p>
        </div>
        <div className='mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-10 lg:max-w-none lg:grid-cols-12'>
          <div className='relative lg:order-last lg:col-span-5'>
            <svg
              aria-hidden='true'
              className='absolute -top-[40rem] left-1 -z-10 h-[64rem] w-[175.5rem] -translate-x-1/2 stroke-gray-900/10 [mask-image:radial-gradient(64rem_64rem_at_111.5rem_0%,white,transparent)]'
            >
              <defs>
                <pattern
                  id='e87443c8-56e4-4c20-9111-55b82fa704e3'
                  width={200}
                  height={200}
                  patternUnits='userSpaceOnUse'
                >
                  <path d='M0.5 0V200M200 0.5L0 0.499983' />
                </pattern>
              </defs>
              <rect
                fill='url(#e87443c8-56e4-4c20-9111-55b82fa704e3)'
                width='100%'
                height='100%'
                strokeWidth={0}
              />
            </svg>
            <figure className='border-l border-indigo-600 pl-8'>
              <blockquote className='text-xl/8 font-semibold tracking-tight text-gray-900'>
                <p>
                  “Puedo ver mi salud de una manera más clara y tomar mejores
                  decisiones para mi salud. Con las herramientas y gráficas que
                  me da Sangre AI, puedo sentirme más informada y segura de mi
                  salud.”
                </p>
              </blockquote>
              <figcaption className='mt-8 flex gap-x-4'>
                <img
                  alt=''
                  src='https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                  className='mt-1 size-10 flex-none rounded-full bg-gray-50'
                />
                <div className='text-sm/6'>
                  <div className='font-semibold text-gray-900'>
                    Brenna Goyette
                  </div>
                  <div className='text-gray-600'>@brenna</div>
                </div>
              </figcaption>
            </figure>
          </div>
          <div className='max-w-xl text-base/7 text-gray-700 lg:col-span-7'>
            <p>
              Nuestros modelos de IA están diseñados para interpretar tus
              analíticas y darte una perspectiva más holística de tus valores, y
              así poder tomar mejores decisiones para tu salud a largo plazo.
            </p>
            <ul role='list' className='mt-8 max-w-xl space-y-8 text-gray-600'>
              <li className='flex gap-x-3'>
                <CloudUpload
                  aria-hidden='true'
                  className='mt-1 size-5 flex-none text-indigo-600'
                />
                <span>
                  <strong className='font-semibold text-gray-900'>
                    1. Sube tu análisis.
                  </strong>{" "}
                  Carga un archivo en formato PDF o imagen de tu análisis de
                  sangre. Nuestro sistema acepta documentos escaneados o
                  fotografías legibles.
                </span>
              </li>
              <li className='flex gap-x-3'>
                <Brain
                  aria-hidden='true'
                  className='mt-1 size-5 flex-none text-indigo-600'
                />
                <span>
                  <strong className='font-semibold text-gray-900'>
                    2. Análisis con IA.
                  </strong>{" "}
                  Nuestra inteligencia artificial extrae los datos relevantes y
                  los compara con valores de referencia médicos, proporcionando
                  una interpretación clara y detallada.
                </span>
              </li>
              <li className='flex gap-x-3'>
                <ChartBar
                  aria-hidden='true'
                  className='mt-1 size-5 flex-none text-indigo-600'
                />
                <span>
                  <strong className='font-semibold text-gray-900'>
                    3. Recibe tu informe.
                  </strong>{" "}
                  En pocos segundos, obtendrás un informe personalizado con
                  gráficos intuitivos y explicaciones fáciles de entender.
                </span>
              </li>
              <li className='flex gap-x-3'>
                <Globe
                  aria-hidden='true'
                  className='mt-1 size-5 flex-none text-indigo-600'
                />
                <span>
                  <strong className='font-semibold text-gray-900'>
                    4. Explora y haz seguimiento
                  </strong>{" "}
                  Accede a tus informes anteriores y compara tendencias en tu
                  historial para un mejor control de tu salud.
                </span>
              </li>
            </ul>
            <p className='mt-8'>
              <strong>Tu información es 100% segura</strong>
              <br />
              Nos tomamos la privacidad en serio. Tus datos están protegidos con
              cifrado y no se comparten con terceros.
            </p>
            <h2 className='mt-16 text-2xl font-bold tracking-tight text-gray-900'>
              No tienes que ser un experto en análisis de sangre.
            </h2>
            <p className='mt-6'>
              Nuestra interfaz es intuitiva y fácil de usar, incluso para
              aquellos que no tienen experiencia previa en este campo.
            </p>
          </div>
        </div>
        <div className='mt-10 flex'>
          <NavLink
            to='/register'
            className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Empieza a usar Sangre AI
          </NavLink>
        </div>
      </div>
    </div>
  );
}
