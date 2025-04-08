import { CloudUploadIcon, SquareActivity, WandSparkles } from "lucide-react";
import { NavLink } from "react-router-dom";

const features = [
  {
    name: "Sube tu análisis",
    description:
      "Carga un archivo en formato PDF o imagen de tu análisis de sangre. Nuestro sistema acepta documentos escaneados o fotografías legibles.",
    href: "#",
    icon: CloudUploadIcon,
  },
  {
    name: "Análisis con IA",
    description:
      "Nuestra inteligencia artificial extrae los datos relevantes y los compara con valores de referencia médicos, proporcionando una interpretación clara y detallada.",
    href: "#",
    icon: WandSparkles,
  },
  {
    name: "Explora y haz seguimiento",
    description:
      "Accede a tus informes anteriores y compara tendencias en tu historial para un mejor control de tu salud.",
    href: "#",
    icon: SquareActivity,
  },
];

export default function Example() {
  return (
    <div className='py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:text-center'>
          <h2 className='text-base/7 font-semibold text-primary'>
            Otra perspectiva de tu salud
          </h2>
          <p className='mt-2 text-4xl font-semibold tracking-tight text-pretty text-accent-foreground sm:text-5xl lg:text-balance'>
            Visualiza tu análisis de sangre
          </p>
          <p className='mt-6 text-lg/8 text-muted-foreground'>
            Transforma tu análisis de sangre en información útil en cuestión de
            segundos. Nuestra aplicación utiliza inteligencia artificial
            avanzada para interpretar tus resultados de forma rápida, segura y
            sencilla.
          </p>
        </div>
        <div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none'>
          <dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3'>
            {features.map((feature) => (
              <div key={feature.name} className='flex flex-col'>
                <dt className='flex items-center gap-x-3 text-base/7 font-semibold text-accent-foreground'>
                  <feature.icon
                    aria-hidden='true'
                    className='size-5 flex-none text-primary'
                  />
                  {feature.name}
                </dt>
                <dd className='mt-4 flex flex-auto flex-col text-base/7'>
                  <p className='flex-auto text-muted-foreground'>
                    {feature.description}
                  </p>
                  <p className='mt-6'>
                    <NavLink
                      to={feature.href}
                      className='text-sm/6 font-semibold text-primary'
                    >
                      Explora más <span aria-hidden='true'>→</span>
                    </NavLink>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
