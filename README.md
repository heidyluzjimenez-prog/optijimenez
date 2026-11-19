# Opti-Jiménez | Sitio web y panel administrativo

Aplicación web para **Opti-Jiménez**, un taller óptico de Barranquilla (Colombia) que fabrica lentes formulados. Es un proyecto real para un negocio y, a la vez, parte de mi portafolio como aprendiz de programación de software.

> **Estado: en desarrollo.** El sitio público ya funciona. El panel administrativo, las facturas y la tienda en línea se están construyendo por fases.

## ¿Qué problema resuelve?

- El cliente conoce el negocio y sus servicios desde cualquier dispositivo.
- Solicita una cotización con un formulario que lo guía sobre qué información dar (tipo de lente, material, filtros, montura), y el mensaje llega listo por WhatsApp.
- Consulta el estado de su pedido con el número de pedido.
- El negocio podrá gestionar clientes, pedidos, pagos y facturas desde un panel con acceso por usuario.

## Funcionalidades

**Ya funcionan**
- Página de inicio, servicios y testimonios, con diseño responsivo (móvil y escritorio).
- Cotizador de lentes con reglas entre filtros (por ejemplo, Fotocromático y Transition no se combinan) y envío por WhatsApp.
- Consulta de pedido conectada a la base de datos (API en Flask + MySQL).
- Formulario de contacto por WhatsApp.
- Aviso de privacidad y términos y condiciones, con autorización de tratamiento de datos.
- Credenciales de la base de datos fuera del código (archivo `.env`).

**En desarrollo**
- [ ] Panel administrativo con login por usuario y roles.
- [ ] Gestión de clientes, pedidos, fórmulas y pagos.
- [ ] Generación de facturas.
- [ ] Tienda en línea.
- [ ] Refuerzo de la consulta de pedido (verificación adicional y límite de intentos).
- [ ] Seguridad final y publicación en un hosting.

## Tecnologías

| Parte | Herramientas |
|---|---|
| Frontend | HTML5, CSS3, Bootstrap 5, JavaScript |
| Backend | Python, Flask, Flask-CORS |
| Base de datos | MySQL 8 (`mysql-connector-python`) |
| Configuración | python-dotenv (variables de entorno) |
| Control de versiones | Git y GitHub |

## Estructura del proyecto

```
optijimenez/
├── admin/            # Acceso del panel administrativo (login.html, admin.css)
├── backend/          # API en Flask (app.py, conexion.py, .env.example)
├── css/              # Estilos del sitio público (styles.css)
├── img/              # Imágenes y logo
├── index.html        # Inicio
├── cotizar.html      # Cotizador de lentes
├── consulta.html     # Consulta de pedido
├── contacto.html     # Contacto
├── tienda.html       # Tienda (en construcción)
├── menu.html         # Menú de navegación compartido
├── aviso-privacidad.html
├── terminos-condiciones.html
└── script.js         # Lógica del sitio
```

## Base de datos

La base `optijimenez` tiene 11 tablas: `cliente`, `pedido`, `formula`, `pago`, `pedido_filtro` y los catálogos `tipo_lente`, `material_lente`, `montura`, `tratamiento`, `filtro` y `forma_de_pago`.

## Cómo ejecutarlo en local

**Requisitos:** Python 3, MySQL 8 y Git.

1. Clona el repositorio:
   ```bash
   git clone https://github.com/heidyluzjimenez-prog/optijimenez.git
   cd optijimenez
   ```
2. Instala las dependencias:
   ```bash
   pip install flask flask-cors mysql-connector-python python-dotenv
   ```
3. Crea la base de datos `optijimenez` en MySQL con las tablas descritas arriba.
4. En la carpeta `backend/`, copia `.env.example` como `.env` y escribe tus datos:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=tu_clave
   DB_NAME=optijimenez
   ```
5. Inicia el servidor:
   ```bash
   cd backend
   python app.py
   ```
6. Abre `index.html` en el navegador. La consulta de pedido necesita el servidor encendido en `http://127.0.0.1:5000`.

## Seguridad

- Las credenciales se guardan en `.env`, que está en `.gitignore` y no se sube al repositorio.
- No se publican datos reales de clientes; las pruebas usan datos ficticios.
- Pendiente antes de publicar: login con claves encriptadas, protección de rutas con datos de clientes y HTTPS.

## Autora

**Heidy Jiménez**, aprendiz de programación de software.

- GitHub: - [heidyluzjimenez-prog](https://github.com/heidyluzjimenez-prog)
- LinkedIn: [Heidy Luz Jimenez](www.linkedin.com/in/heidyluzjimenez)
