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
            Inteligencia artificial al servicio de tu bienestar
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
          <div className='text-base/7 text-muted-foreground lg:col-span-12 prose'>
            <p>
              En SangreAI creemos que la salud es un juego de precisión, en el
              que la información clara y relevante marca la diferencia. Sabemos
              lo frustrante que puede ser enfrentarse a un análisis de sangre
              repleto de cifras difíciles de interpretar, sin una guía práctica
              que explique qué significan realmente esos valores para nuestra
              vida diaria.
            </p>
            <p>
              Soy Ricardo Rodríguez, ingeniero industrial y apasionado de la
              inteligencia artificial, especialmente en cómo puede transformar
              nuestra calidad de vida. Tras años explorando la ciencia de la
              longevidad y buscando cómo mantener mis propios indicadores de
              salud en sus mejores niveles, comprendí algo fundamental:{" "}
              <strong>
                la información, si no es clara y contextualizada, no genera
                cambios.
              </strong>
            </p>
            <p>
              Así nació esta aplicación. Nuestra misión va más allá de convertir
              resultados médicos complejos en información sencilla y útil.
              Queremos que entiendas con precisión cómo cada dato afecta tu
              bienestar, cómo pequeños ajustes en tu estilo de vida pueden
              generar enormes beneficios, y cómo aprovechar al máximo el
              conocimiento actual para vivir no solo más años, sino mejores
              años.
            </p>
            <p>
              Nos apoyamos en la inteligencia artificial para brindarte análisis
              detallados y recomendaciones prácticas, siempre basadas en
              evidencia científica actualizada. Queremos ser tu aliado de
              confianza en el camino hacia una vida más saludable y plena.
            </p>
            <p>
              Porque la ciencia evoluciona constantemente, y con ella nuestra
              capacidad para optimizar nuestra salud. En SangreAI nos
              comprometemos a mantenerte al día con los últimos avances
              científicos, ofreciéndote las herramientas necesarias para tomar
              decisiones informadas que realmente impacten positivamente tu
              vida.
            </p>
            <p>
              Creemos firmemente que la mejor inversión que puedes hacer es en
              tu salud, y todo comienza aquí: con una interpretación clara,
              precisa y útil de la información que ya tienes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
