# 🩸 SangreAI

Aplicación web para subir análisis de sangre en formato PDF o imagen, extraer automáticamente los datos mediante una API de IA, almacenarlos en una base de datos y permitir futuras consultas y análisis.

## Características

- Subida de archivos (PDF o imágenes) con validaciones de seguridad
- Procesamiento mediante API de inteligencia artificial (ChatGPT / Gemini)
- Análisis inteligente y visualización de resultados
- Histórico de análisis con consultas filtrables
- Autenticación segura con JWT Tokens en el backend
- Almacenamiento en MongoDB
- Actualización automática del estado del análisis (con SWR + polling o WebSockets)
- Encriptación de datos sensibles
- Diseño responsive, accesible y mobile-first

---

## Tecnologías utilizadas

### Frontend

- React + Vite + TypeScript
- Zustand (gestión de estado)
- SWR (data fetching y revalidación)
- Tailwind CSS (estilos)
- Componentes Shadcn/ui

### Backend

- Servidor Node.js con JWT tokens para autenticación
- API de IA (OpenAI / Gemini)
- Validación y parsing de archivos

### Base de datos

- MongoDB (vía MongoDB Atlas)
- Patrón Repository + DTOs

### Autenticación

- JWT Tokens

### DevOps

- pnpm
- Jest + jsdom (testing)
- GitHub Actions (CI/CD)
- Husky + Lint-Staged (pre-commits)

---

## Instalación local

```bash
git clone https://github.com/tuusuario/sangreai.git
cd sangreai
pnpm install
pnpm dev
```

## Variables de entorno

Crea un archivo .env local con:

- VITE_APP_API_URL=http://localhost:3000/api (que apunte a tu backend)

## Ejecutar Tests

pnpm test

## 🚧 Roadmap

- Procesamiento de archivos en paralelo con notificación al usuario con esté listo
- Ajsutes generales
- Confirmación del correo electrónico al registrarse
- Las notas necesitan más trabajo
- Ajustar a los móviles, por ahora en Desktop es que se ve bien

## Licencia

GNU GPL

## Contribuciones

¡Las contribuciones son bienvenidas! Abre un issue o pull request con tus sugerencias o mejoras.

## Contacto

[Duda o soporte: https://solucionesio.es](https://solucionesio.es)
