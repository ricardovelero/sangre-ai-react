export default function PrivacyPolicy() {
  return (
    <main className='max-w-3xl mx-auto p-6 text-gray-800'>
      <h1 className='text-2xl font-bold mb-4'>Política de Privacidad</h1>

      <p className='mb-4'>Última actualización: 25 de marzo de 2025</p>

      <p className='mb-6'>
        En Sangre AI y Golden Orinoco LLC nos tomamos muy en serio la privacidad
        y protección de tus datos. Esta Política de Privacidad explica qué datos
        recopilamos, cómo los utilizamos, cómo los almacenamos y qué derechos
        tienes como usuario.
      </p>

      <h2 className='text-xl font-semibold mt-6 mb-2'>
        1. Datos que Recopilamos
      </h2>
      <ul className='list-disc list-inside mb-4'>
        <li>
          Información personal proporcionada al registrarte (nombre, correo
          electrónico, etc.).
        </li>
        <li>
          Archivos subidos a la plataforma (análisis de sangre en formato PDF o
          imagen).
        </li>
        <li>Datos derivados del análisis automático mediante IA.</li>
        <li>
          Información técnica como dirección IP, tipo de navegador y actividad
          de uso.
        </li>
      </ul>

      <h2 className='text-xl font-semibold mt-6 mb-2'>
        2. Finalidad del Tratamiento
      </h2>
      <p className='mb-4'>
        Utilizamos tus datos únicamente para ofrecerte el servicio de análisis
        automatizado de tus documentos médicos, así como para:
      </p>
      <ul className='list-disc list-inside mb-4'>
        <li>Identificar y autenticar tu cuenta mediante tokens JWT.</li>
        <li>
          Procesar tus archivos con IA para generar resultados personalizados.
        </li>
        <li>
          Guardar los análisis y permitirte acceder a ellos cuando lo desees.
        </li>
        <li>Mejorar el funcionamiento y seguridad de la plataforma.</li>
      </ul>

      <h2 className='text-xl font-semibold mt-6 mb-2'>
        3. Almacenamiento y Seguridad
      </h2>
      <p className='mb-4'>
        Toda la información se almacena en bases de datos seguras (MongoDB). Los
        archivos subidos pueden almacenarse temporal o permanentemente en
        servicios externos cifrados (como AWS S3 o Cloudinary). Implementamos
        medidas de seguridad técnicas y organizativas para evitar accesos no
        autorizados, incluyendo autenticación por JWT, cifrado y control de
        acceso.
      </p>

      <h2 className='text-xl font-semibold mt-6 mb-2'>
        4. Compartición de Datos
      </h2>
      <p className='mb-4'>
        No compartimos tus datos personales ni médicos con terceros, salvo que
        sea requerido por ley o con tu consentimiento explícito. No vendemos ni
        comercializamos tus datos bajo ninguna circunstancia.
      </p>

      <h2 className='text-xl font-semibold mt-6 mb-2'>
        5. Conservación de Datos
      </h2>
      <p className='mb-4'>
        Conservamos tus datos mientras tu cuenta esté activa o hasta que
        solicites su eliminación. Puedes ejercer tu derecho a borrar tus datos
        en cualquier momento escribiéndonos a nuestro correo de soporte.
      </p>

      <h2 className='text-xl font-semibold mt-6 mb-2'>
        6. Derechos del Usuario
      </h2>
      <p className='mb-4'>
        Tienes derecho a acceder, rectificar, eliminar y portar tus datos, así
        como a limitar u oponerte al tratamiento. Para ejercer estos derechos,
        contáctanos a través de{" "}
        <a
          href='mailto:soporte@tudominio.com'
          className='text-accent-foreground underline'
        >
          info@goldenorinoco.com
        </a>
        .
      </p>

      <h2 className='text-xl font-semibold mt-6 mb-2'>
        7. Cookies y Tecnologías Similares
      </h2>
      <p className='mb-4'>
        Podemos utilizar cookies técnicas para el funcionamiento correcto de la
        plataforma, pero no empleamos cookies con fines publicitarios ni de
        seguimiento de terceros.
      </p>

      <h2 className='text-xl font-semibold mt-6 mb-2'>
        8. Modificaciones a esta Política
      </h2>
      <p className='mb-4'>
        Nos reservamos el derecho de modificar esta Política de Privacidad.
        Cualquier cambio será publicado en esta página y, si es significativo,
        se notificará por correo electrónico o dentro de la plataforma.
      </p>

      <h2 className='text-xl font-semibold mt-6 mb-2'>9. Contacto</h2>
      <p className='mb-4'>
        Para cualquier duda sobre esta política o sobre el tratamiento de tus
        datos personales, puedes escribirnos a{" "}
        <a
          href='mailto:soporte@tudominio.com'
          className='text-accent-foreground underline'
        >
          info@goldenorinoco.com
        </a>
        .
      </p>
    </main>
  );
}
