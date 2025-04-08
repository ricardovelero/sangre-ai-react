export default function AboutUs() {
  return (
    <div className='relative isolate overflow-hidden py-12 sm:py-24'>
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
          <p className='text-base/7 font-semibold text-primary'>
            Nos gustan los datos
          </p>
          <h1 className='mt-2 text-4xl font-semibold tracking-tight text-pretty text-accent-foreground sm:text-5xl'>
            ¿Quienes somos?
          </h1>
          <p className='mt-6 text-xl/8 text-muted-foreground'>
            Inteligencia artificial para entender, mejorar y optimizar tu
            bienestar.
          </p>
        </div>
        <div className='mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-10 lg:max-w-none lg:grid-cols-12'>
          <div className='relative lg:order-last lg:col-span-5'>
            <svg
              aria-hidden='true'
              className='absolute -top-[40rem] left-1 -z-10 h-[64rem] w-[175.5rem] -translate-x-1/2 stroke-atext-accent-foreground/10 [mask-image:radial-gradient(64rem_64rem_at_111.5rem_0%,white,transparent)]'
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
          </div>
          <div className='max-w-xl text-base/7 text-muted-foreground lg:col-span-7'>
            <p>
              La salud es un juego de precisión, pero demasiadas veces nos
              enfrentamos a nuestros análisis de sangre sin una guía clara para
              interpretarlos. Me llamo Ricardo Rodriguez, y soy ingeniero
              industrial, pero también un apasionado del potencial que tiene la
              inteligencia artificial para transformar nuestra vida diaria.
              Después de años de intentar mantener mis valores en óptimas
              condiciones, sumergiéndome en podcasts de salud y explorando la
              ciencia de la longevidad, me di cuenta de algo fundamental: la
              información sin contexto no genera cambios. Así nació esta
              aplicación. No solo para traducir informes médicos en datos
              comprensibles, sino para brindar claridad sobre cómo esos números
              impactan la calidad y duración de nuestra vida. Porque la
              longevidad no se trata solo de vivir más años, sino de vivir
              mejor. Pequeños ajustes en el estilo de vida pueden marcar una
              diferencia enorme, pero todo empieza con el conocimiento adecuado.
              Nuestra misión es simple: ofrecerte información clara, basada en
              ciencia actualizada, para que puedas tomar decisiones informadas
              sobre tu salud. Con el respaldo de la inteligencia artificial,
              nuestro objetivo es que cada informe que analices se convierta en
              una herramienta útil para optimizar tu bienestar. La ciencia
              evoluciona, y con ella nuestra comprensión de lo que realmente nos
              hace más saludables. Queremos asegurarnos de que siempre tengas
              acceso a los últimos descubrimientos respaldados por evidencia,
              para que puedas aplicar en tu vida lo que realmente funciona.
              Porque la mejor inversión que podemos hacer es en nuestra salud. Y
              todo empieza con una mejor interpretación de la información que ya
              tenemos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
