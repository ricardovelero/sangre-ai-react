import { NavLink } from "react-router-dom";

export default function TermsAndConditions() {
  return (
    <main className='max-w-3xl mx-auto p-6 text-gray-800'>
      <h1 className='text-2xl font-bold mb-4'>Términos y Condiciones de Uso</h1>

      <p className='mb-4'>Última actualización: 25 de marzo de 2025</p>

      <p className='mb-6'>
        Estos Términos y Condiciones regulan el acceso y uso de nuestra
        aplicación web ("la Plataforma"), propiedad de Golden Orinoco LLC. Al
        utilizar la Plataforma, aceptas cumplir con los presentes Términos. Si
        no estás de acuerdo con ellos, por favor no utilices la Plataforma.
      </p>

      <h2 className='text-xl font-semibold mt-6 mb-2'>
        1. Descripción del Servicio
      </h2>
      <p className='mb-4'>
        La Plataforma permite a los usuarios subir archivos (PDF o imágenes) de
        análisis de sangre, los cuales son procesados mediante una inteligencia
        artificial para extraer y analizar datos. Los resultados se almacenan de
        forma segura y pueden ser consultados por el usuario posteriormente.
      </p>

      <h2 className='text-xl font-semibold mt-6 mb-2'>
        2. Registro y Autenticación
      </h2>
      <p className='mb-4'>
        El acceso a la Plataforma requiere el registro mediante el sistema de
        autenticación propio. Al crear una cuenta, te comprometes a proporcionar
        información veraz y a mantener la confidencialidad de tus credenciales.
      </p>

      <h2 className='text-xl font-semibold mt-6 mb-2'>
        3. Privacidad y Protección de Datos
      </h2>
      <p className='mb-4'>
        Nos comprometemos a proteger la privacidad de tus datos personales y
        médicos. La información es almacenada en bases de datos seguras
        (MongoDB), y se implementan medidas de cifrado y acceso restringido.
        Para más detalles, consulta nuestra{" "}
        <NavLink
          to='/porivacy-policy'
          className='text-accent-foreground underline'
        >
          Política de Privacidad
        </NavLink>
        .
      </p>

      <h2 className='text-xl font-semibold mt-6 mb-2'>4. Uso Aceptable</h2>
      <p className='mb-4'>
        El uso de la Plataforma debe realizarse conforme a la ley y con fines
        legítimos. Está prohibido subir contenido ofensivo, ilegal, o que
        infrinja derechos de terceros. También se prohíbe intentar vulnerar la
        seguridad o integridad de la Plataforma.
      </p>

      <h2 className='text-xl font-semibold mt-6 mb-2'>
        5. Limitación de Responsabilidad
      </h2>
      <p className='mb-4'>
        La información proporcionada por la IA no sustituye el diagnóstico
        médico profesional.{" "}
        <u>
          El usuario asume total responsabilidad por el uso que haga de los
          resultados.
        </u>{" "}
        No garantizamos la precisión absoluta de los análisis generados.
      </p>

      <h2 className='text-xl font-semibold mt-6 mb-2'>
        6. Disponibilidad del Servicio
      </h2>
      <p className='mb-4'>
        Nos reservamos el derecho de modificar, suspender o interrumpir el
        servicio en cualquier momento sin previo aviso. No nos hacemos
        responsables por la pérdida de datos debido a cortes técnicos o
        problemas ajenos a nuestro control.
      </p>

      <h2 className='text-xl font-semibold mt-6 mb-2'>
        7. Propiedad Intelectual
      </h2>
      <p className='mb-4'>
        Todos los elementos de la Plataforma (código, diseño, textos, IA, etc.)
        son propiedad de Golden Orinoco LLC o de sus licenciantes. El usuario no
        adquiere ningún derecho de propiedad intelectual por el uso de la
        Plataforma.
      </p>

      <h2 className='text-xl font-semibold mt-6 mb-2'>8. Modificaciones</h2>
      <p className='mb-4'>
        Nos reservamos el derecho de modificar estos Términos y Condiciones en
        cualquier momento. Las modificaciones se publicarán en esta misma página
        y entrarán en vigor una vez publicadas. Recomendamos revisar
        periódicamente esta sección.
      </p>

      <h2 className='text-xl font-semibold mt-6 mb-2'>
        9. Legislación Aplicable
      </h2>
      <p className='mb-4'>
        Estos Términos se rigen por la legislación vigente en Delaware, USA.
        Cualquier controversia será sometida a los tribunales competentes de
        dicha jurisdicción.
      </p>

      <h2 className='text-xl font-semibold mt-6 mb-2'>10. Contacto</h2>
      <p className='mb-4'>
        Si tienes dudas o necesitas más información, puedes contactarnos en{" "}
        <NavLink
          to='mailto:soporte@tudominio.com'
          className='text-accent-foreground underline'
        >
          info@goldenorinoco.com
        </NavLink>
        .
      </p>
    </main>
  );
}
