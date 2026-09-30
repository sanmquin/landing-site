# Guía de Base de Datos y Configuración Backend | Casa Siete

Este documento especifica la arquitectura de datos, configuración de entorno y procedimentos para leer, exportar e importar las respuestas del formulario de registro de **Casa Siete** almacenadas en **MongoDB Atlas**.

---

## 1. Especificaciones de la Base de Datos

- **Motor de Base de Datos:** MongoDB Atlas (Cloud)
- **Tipo de Colección:** Colección de documentos BSON (`Document Collection`)
- **Base de Datos por Defecto:** `casa_siete`
- **Nombre de Colección por Defecto:** `registrations`

---

## 2. Estructura del Documento (`Schema`)

Cada registro capturado por la función Netlify (`netlify/functions/register.js`) se almacena como un documento en MongoDB con el siguiente esquema JSON/BSON:

```json
{
  "_id": { "$oid": "651a2b3c4d5e6f7a8b9c0d1e" },
  "fullName": "María García",
  "email": "maria@ejemplo.com",
  "phone": "5512345678",
  "countryCode": "+52",
  "fullPhone": "+52 5512345678",
  "createdAt": { "$date": "2025-02-28T12:34:56.789Z" },
  "source": "web_form",
  "userAgent": "Mozilla/5.0 ...",
  "clientIp": "189.203.11.5"
}
```

### Descripción de Campos
- **`fullName`** (`String | null`): Nombre completo proporcionado por el usuario.
- **`email`** (`String | null`): Correo electrónico del usuario (normalizado a minúsculas).
- **`phone`** (`String | null`): Número telefónico sin clave de país.
- **`countryCode`** (`String | null`): Clave telefónica internacional (ej. `+52`, `+34`).
- **`fullPhone`** (`String | null`): Teléfono completo formateado (`+52 5512345678`).
- **`createdAt`** (`Date`): Fecha y hora exacta de registro en formato ISO 8601 UTC.
- **`source`** (`String`): Origen del registro (`web_form`).
- **`userAgent`** (`String | null`): User Agent del navegador para análisis técnico.
- **`clientIp`** (`String | null`): Dirección IP de origen de la solicitud.

---

## 3. Configuración de Variables de Entorno y Seguridad

Las credenciales y configuraciones sensibles **nunca** deben incluirse directamente en el código fuente. Se manejan mediante variables de entorno en Netlify (o archivo `.env` local).

### Variables Requeridas

| Variable | Descripción | Valor por Defecto / Ejemplo |
| :--- | :--- | :--- |
| `MONGODB_URI` | URI de conexión a MongoDB Atlas (encriptado TLS/SSL) | `mongodb+srv://<user>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority` |
| `MONGODB_DB_NAME` | Nombre de la base de datos | `casa_siete` |
| `MONGODB_COLLECTION` | Nombre de la colección de registros | `registrations` |

### Configuración en Netlify
1. Ve a **Site Configuration** > **Environment variables** en el panel de Netlify.
2. Añade las variables `MONGODB_URI`, `MONGODB_DB_NAME` y `MONGODB_COLLECTION`.
3. Para desarrollo local, crea un archivo `.env` en la raíz del proyecto (este archivo está ignorado por `.gitignore`).

---

## 4. Lectura, Exportación e Importación de Datos

### Opción A: Usando MongoDB Compass (Interfaz Gráfica)
1. Descarga e instala [MongoDB Compass](https://www.mongodb.com/products/tools/compass).
2. Pega tu cadena de conexión `MONGODB_URI`.
3. Selecciona la base de datos `casa_siete` y la colección `registrations`.
4. Para exportar respuestas:
   - Haz clic en **Collection** > **Export Data**.
   - Selecciona el formato **CSV** o **JSON**.
5. Para importar respuestas:
   - Haz clic en **Add Data** > **Import JSON or CSV File**.

### Opción B: Usando herramientas de línea de comandos (`mongoexport` / `mongoimport`)

#### Exportar registros a JSON o CSV:
```bash
# Exportar a archivo JSON
mongoexport --uri="$MONGODB_URI" --collection=registrations --out=registros_casa_siete.json --jsonArray

# Exportar a archivo CSV (ideal para Excel/Google Sheets)
mongoexport --uri="$MONGODB_URI" --collection=registrations --type=csv --fields=fullName,email,fullPhone,createdAt --out=registros_casa_siete.csv
```

#### Importar registros desde un archivo JSON:
```bash
mongoimport --uri="$MONGODB_URI" --collection=registrations --file=registros_casa_siete.json --jsonArray
```

### Opción C: Usando Shell de MongoDB (`mongosh`)
```javascript
// Conectar
mongosh "MONGODB_URI_AQUI"

// Cambiar a base de datos
use casa_siete

// Consultar todos los registros
db.registrations.find().pretty()

// Consultar registros por correo
db.registrations.find({ email: "maria@ejemplo.com" })

// Contar total de inscritos
db.registrations.countDocuments()
```

---

## 5. Registros del Backend y Depuración (Backend Logs)

La función de Netlify (`netlify/functions/register.js`) incluye registros detallados en la consola del servidor:

- **Conexión:** Notifica el establecimiento de conexión sanitizando las credenciales de la URI (ocultando usuario y contraseña).
- **Validación:** Muestra advertencias con detalles específicos si el usuario envía datos incompletos o con formato erróneo.
- **Inserción:** Confirma la inserción exitosa imprimiendo el ID generado (`insertedId`).
- **Manejo de Errores:** Captura y muestra el stack trace de cualquier error no controlado sin exponer datos sensibles al cliente.

Para ver los logs en vivo en Netlify:
1. Ve a **Functions** en el panel de Netlify.
2. Selecciona la función `register`.
3. Revisa la pestaña **Logs** en tiempo real.
