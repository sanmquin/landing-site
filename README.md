# Casa Siete - Sitio Web y Registro

Sitio web estático y función serverless Netlify con integración a MongoDB Atlas para el curso de pareja **Casa Siete**.

## Características
- **Landing Page:** Diseño adaptativo e interactivo construido con Tailwind CSS y Google Fonts.
- **Captura de Prospectos:** Formulario dinámico con cambio de vista en una sola página (SPA toggle) y soporte para claves telefónicas internacionales.
- **Backend Serverless:** Función de Netlify (`netlify/functions/register.js`) para validar y almacenar registros.
- **Base de Datos:** Integración robusta y segura con MongoDB Atlas.

## Guía de Base de Datos y Configuración
Para instrucciones completas sobre la configuración del desarrollador, variables de entorno, tipo de colección (`registrations`), exportación/importación de datos (CSV/JSON) y depuración con backend logs, consulta:
👉 **[DATABASE_GUIDE.md](./DATABASE_GUIDE.md)**

## Estructura del Proyecto
```
.
├── index.html                # Landing page principal y formulario de registro
├── netlify.toml              # Configuración de despliegue y funciones de Netlify
├── netlify/
│   └── functions/
│       └── register.js       # Función Netlify serverless para almacenar en MongoDB
├── DATABASE_GUIDE.md         # Documentación de MongoDB Atlas y guías de desarrollador
├── DESIGN_GUIDELINES.md      # Guía de diseño, colores y tipografía
└── package.json              # Dependencias del backend (mongodb)
```

## Desarrollo Local
1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Crear un archivo `.env` local con tus credenciales de MongoDB Atlas:
   ```env
   MONGODB_URI=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority
   MONGODB_DB_NAME=casa_siete
   MONGODB_COLLECTION=registrations
   ```
