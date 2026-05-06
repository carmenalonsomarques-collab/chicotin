# Chicotín — Sitio Web

Sitio web estático para **Chicotín**, restaurante de comida casera para llevar en Piedras Blancas, Asturias.

## Estructura del proyecto

```
chicotin/
├── index.html       # Página única (single-page)
├── css/style.css    # Todos los estilos
└── js/main.js       # Comportamiento: nav, drawer, animaciones, horarios
```

Sin framework, sin build system, sin dependencias npm. HTML/CSS/JS puro.

## Negocio

- **Nombre:** Chicotín
- **Tipo:** Comida casera para llevar
- **Dirección:** Avenida Eysines 24, bajo — 33450 Piedras Blancas, Asturias
- **Teléfono:** 984 18 29 32
- **Valoración Google:** 4.7 ★ (267 reseñas)
- **Facebook:** https://www.facebook.com/Chicotincomidaparallevar/
- **Instagram:** https://www.instagram.com/chicotinpiedras/

### Horario

| Día             | Horario                              |
|-----------------|--------------------------------------|
| Lunes           | Cerrado                              |
| Martes–Miércoles| 11:30 – 15:30                        |
| Jueves–Sábado   | 11:30 – 15:30 · 19:30 – 23:00       |
| Domingo         | 11:30 – 16:00 · 19:30 – 23:00       |

## Sistema de diseño

### Paleta de colores

```css
--cream:        #FAFAF6   /* fondo principal */
--cream-warm:   #F3EBE0   /* fondo secciones alternas */
--terracota:    #C15C38   /* color de acción / énfasis */
--terracota-dk: #9F4C2E   /* hover del terracota */
--charcoal:     #1C1B18   /* texto principal */
--stone:        #787670   /* texto secundario */
--border:       #E3DBD0   /* bordes y separadores */
```

### Tipografía

- **Display/Headings:** Cormorant Garamond (Google Fonts) — serif elegante
- **Body/UI:** DM Sans (Google Fonts) — sans-serif moderna

### Estilo general

Editorial, cálido, artesanal. No es kitschy ni juguetón. El tono de copia es cercano y directo, sin pretensiones.

## Secciones (index.html)

1. **Nav** — fija, se vuelve frosted glass al hacer scroll (`scrolled` class via JS)
2. **Hero** — pantalla completa, título grande, badge de valoración Google
3. **Menú del día** (`#menu-dia`) — Facebook Page Plugin para el feed diario + sidebar con teléfono y horario de hoy
4. **Carta** (`#carta`) — 6 categorías en grid: Hamburguesas, Bocadillos/Sándwiches, Especialidades, Postres, Bebidas, Menús especiales
5. **Nosotros** (`#nosotros`) — fondo carbón, texto sobre el negocio + placeholder de foto
6. **Contacto** (`#contacto`) — horario, dirección, teléfono, redes sociales + mapa Google embebido
7. **Footer** — links y copyright

## JavaScript (main.js)

- **Nav sticky:** `window.scroll` → toggle clase `scrolled`
- **Mobile drawer:** burger button → slide-in desde la derecha, overlay con click para cerrar
- **Fade-up animations:** `IntersectionObserver` con threshold 0.08, fallback a 800ms
- **Horario de hoy:** objeto `schedule` indexado por `getDay()`, muestra el horario del día actual con clases `open`/`closed`

## Pendientes / TODOs en el código

- `nosotros__placeholder` — reemplazar con foto real del local o el equipo
- El feed de Facebook ya está configurado con la URL correcta

## Cómo trabajar

- No hay servidor de desarrollo. Abrir `index.html` directamente en el navegador o con Live Server de VSCode.
- No hay git inicializado. Hacer `git init` si se quiere control de versiones.
- Cambios de estilos: siempre en `css/style.css`. No usar `<style>` inline en el HTML.
- Cambios de comportamiento: siempre en `js/main.js`. No usar `<script>` inline en el HTML.
