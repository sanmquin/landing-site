# Guía de Estilo Visual (Design Guidelines) - Casa Siete

Este documento especifica los lineamientos visuales y de diseño para la página de aterrizaje (landing page) del curso de pareja **"Casa Siete"**. Ha sido estructurado de manera modular para que cualquier diseñador o desarrollador pueda modificar o ampliar el aspecto visual según sus necesidades.

---

## 1. Tono de Comunicación y Marca

- **Idioma:** Español.
- **Tono:** Empático, cálido, reflexivo, sereno y místico pero accesible.
- **Concepto clave:** *El espejo de las relaciones.*
- **Público objetivo:** Usuarios provenientes de redes sociales (principalmente Instagram), buscando desarrollo personal, sanación de vínculos o mejora de su pareja a través de la astrología.

---

## 2. Paleta de Colores

La paleta evoca una atmósfera celestial, cálida y elegante. Se definen las variables hexadecimales y su propósito en la interfaz:

| Nombre Variable | Código HEX | Descripción / Uso |
| :--- | :--- | :--- |
| `brand-night` | `#1C1625` | Fondo oscuro místico, encabezados principales y texto de alto contraste. |
| `brand-plum` | `#3A2541` | Púrpura profundo para secciones destacadas (como el temario) y botones secundarios. |
| `brand-wine` | `#6B304A` | Vino cálido para acentos emocionales e itálicas destacadas. |
| `brand-rose` | `#D4A3A1` | Rosa polvoso suave para texto secundario en fondos oscuros y bordes sutiles. |
| `brand-gold` | `#C5A059` | Dorado celestial para llamadas a la acción (CTA principales), iconos y destellos. |
| `brand-gold-hover` | `#B08C46` | Estado hover para los botones dorados. |
| `brand-gold-light` | `#F4ECE0` | Dorado crema muy suave para badges, fondos de iconos y resaltados. |
| `brand-cream` | `#FAF6F0` | Fondo general de la página (cálido, suave, relajante). |
| `brand-cream-card` | `#FFFDF9` | Fondo blanco crema para tarjetas e incrustaciones. |
| `brand-muted` | `#6E6775` | Gris/morado neutro para párrafos y descripciones secundarias. |

---

## 3. Tipografía

Se utilizan dos familias tipográficas de Google Fonts para crear jerarquía y contraste entre elegancia serena y legibilidad moderna:

### Tipografía Principal (Encabezados / Display)
- **Fuente:** `Playfair Display` (`serif`)
- **Usos:** Títulos principales (H1, H2, H3), citas y nombres de módulo.
- **Pesos recomendados:** 400 (Regular / Italic), 600 (SemiBold), 700 (Bold).

### Tipografía Secundaria (Cuerpo de texto / UI)
- **Fuente:** `Plus Jakarta Sans` (`sans-serif`)
- **Usos:** Textos del cuerpo, botones, menús de navegación, etiquetas de módulos y pie de página.
- **Pesos recomendados:** 400 (Regular), 500 (Medium), 600 (SemiBold).

---

## 4. Componentes Visuales

### Botones (Call to Action - CTA)
1. **Botón Principal (Dorado / Destacado):**
   - Fondo: `bg-[#C5A059]` (o `bg-brand-gold`)
   - Texto: Blanco (`text-white`), `font-semibold`
   - Bordes: Redondeados completos (`rounded-full`)
   - Sombra: Sutil con tinte dorado (`shadow-lg shadow-brand-gold/20`)
   - Estado Hover: `bg-[#B08C46]`
2. **Botón Secundario (Borde / Neutro):**
   - Fondo: Blanco (`bg-white`)
   - Borde: `border border-brand-gold/40`
   - Texto: `text-brand-night`, `font-medium`
   - Bordes: Redondeados completos (`rounded-full`)

*Nota:* Tal como fue especificado, en esta etapa **no se integran campos de formulario en los botones**, únicamente botones interactivos con llamado a la acción claro.

### Tarjetas (Cards)
- **Esquinas:** `rounded-2xl` (16px)
- **Bordes:** `border border-brand-gold/20`
- **Acolchado (Padding):** `p-8`
- **Efectos:** Transición suave con sombra ligera al pasar el cursor (`hover:shadow-md transition-all`).

---

## 5. Espaciado y Layout

- **Diseño Mobile-First:** Optimizado principalmente para la experiencia móvil proveniente de Instagram.
- **Ancho Máximo de Contenedor:** `max-w-6xl` (1152px) centrado en pantalla.
- **Espaciado Vertical entre Secciones:** `py-16 sm:py-24` para garantizar legibilidad y descanso visual.
- **Patrón Estelar de Fondo:** Fondo compuesto por gradiente radial sutil (`radial-gradient(rgba(197, 160, 89, 0.15) 1px, transparent 1px)`) con un tamaño de malla de `24px`.

---

## 6. Instrucciones para Diseñadores

Para modificar la apariencia de la landing page:
1. **Cambiar Colores:** Edita la sección `tailwind.config` dentro del `<head>` de `index.html` cambiando los valores hexadecimales en la clave `colors.brand`.
2. **Cambiar Fuentes:** Sustituye los enlaces de Google Fonts en `<head>` y actualiza la clave `fontFamily` en la configuración de Tailwind.
3. **Imágenes o Ilustraciones:** Se pueden reemplazar los emojis astrales (`✨`, `🌙`, `🌕`, `⚖️`, `♀️`) por ilustraciones SVG vectoriales conservando los colores `brand-gold` o `brand-rose`.
