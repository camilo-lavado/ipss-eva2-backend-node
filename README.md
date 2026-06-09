# RecruitAPI — Backend de Gestión de Reclutamiento

API RESTful desarrollada en **Node.js** y **Express** para la administración integral de procesos de selección de personal, con documentación interactiva Swagger integrada.

## Tecnologías Utilizadas

| Categoría | Tecnología |
|---|---|
| Entorno de ejecución | Node.js |
| Framework web | Express.js 5 |
| ORM | Sequelize 6 |
| Base de datos | MySQL / MariaDB |
| Seguridad | Bcrypt |
| Documentación | swagger-jsdoc + swagger-ui-express |
| Herramientas de desarrollo | Nodemon, Sequelize-CLI |

## Características Principales

- **Arquitectura MVC:** Separación estricta entre Rutas, Middlewares de validación, Controladores y Modelos.
- **Capa de validadores:** Middleware dedicado (`middlewares/validators.js`) que valida campos obligatorios antes de llegar al controlador, devolviendo `400` con mensaje descriptivo.
- **Códigos HTTP semánticos:** `201` en creaciones, `404` en recursos no encontrados, `409` en conflictos de unicidad (email o nombre de usuario duplicado), `400` en violaciones de FK.
- **Transaccionalidad:** Todas las operaciones de escritura están envueltas en `sequelize.transaction()` para garantizar integridad ACID.
- **Migraciones Code-First:** Control de versiones de la BD mediante scripts cronológicos de Sequelize.
- **Documentación Swagger:** OpenAPI 3.0 disponible en `/api-docs` con schemas completos para las 6 entidades.

## Esquema de la Base de Datos

El sistema gestiona 6 entidades relacionadas:

1. `Usuarios` — autenticación y roles (ADMIN, ENTREVISTADOR)
2. `Candidatos` — postulantes
3. `Cargos` — vacantes (estado: 1=activo, 0=inactivo)
4. `Entrevistadores` — equipo evaluador
5. `Entrevistas` — agenda y estados (PROGRAMADA, REALIZADA, CANCELADA, PENDIENTE)
6. `Experiencias` — historial laboral de candidatos

---

## Instalación y Configuración Local

### 1. Clonar el repositorio

```bash
git clone https://github.com/camilo-lavado/ipss-eva2-backend-node
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=recruit_db
PORT=3000
```

> Con XAMPP el usuario es `root` y la contraseña está vacía por defecto.

### 4. Crear y poblar la base de datos

```bash
# Crear la base de datos
npx sequelize-cli db:create

# Crear las tablas con sus relaciones
npx sequelize-cli db:migrate

# Poblar con datos de prueba
npx sequelize-cli db:seed:all
```

### 5. Levantar el servidor

```bash
# Desarrollo (con recarga automática)
npm run dev

# Producción
npm start
```

El servidor escucha en: `http://localhost:3000`

---

## Documentación Swagger

Una vez levantado el servidor, la documentación interactiva de la API está disponible en:

```
http://localhost:3000/api-docs
```

Incluye schemas de request/response para los 14 endpoints, ejemplos de payload y códigos de respuesta posibles (200, 201, 400, 401, 404, 409, 500).

---

## Endpoints

Todas las rutas están bajo el prefijo `/api`.

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/health` | Estado del servidor |
| POST | `/api/usuarios/login` | Inicio de sesión |
| GET/POST | `/api/usuarios` | Listar / crear usuarios |
| GET/PUT/DELETE | `/api/usuarios/:id` | Leer / actualizar / eliminar usuario |
| GET/POST | `/api/candidatos` | Listar / crear candidatos |
| GET/PUT/DELETE | `/api/candidatos/:id` | Leer / actualizar / eliminar candidato |
| GET/POST | `/api/cargos` | Listar / crear cargos |
| GET/PUT/DELETE | `/api/cargos/:id` | Leer / actualizar / eliminar cargo |
| GET/POST | `/api/entrevistadores` | Listar / crear entrevistadores |
| GET/PUT/DELETE | `/api/entrevistadores/:id` | Leer / actualizar / eliminar entrevistador |
| GET/POST | `/api/entrevistas` | Listar / crear entrevistas |
| GET/PUT/DELETE | `/api/entrevistas/:id` | Leer / actualizar / eliminar entrevista |
| GET/POST | `/api/experiencias` | Listar / crear experiencias |
| GET/PUT/DELETE | `/api/experiencias/:id` | Leer / actualizar / eliminar experiencia |

---

## Flujo de una Petición

```
Cliente HTTP
    ↓
Router (routes/)          — mapeo de URL y método HTTP
    ↓
Validator middleware       — valida campos obligatorios → 400 si falta alguno
    ↓
Controller (controllers/) — lógica de negocio + transacción Sequelize
    ↓
Model (models/)           — ORM traduce a SQL
    ↓
MySQL
    ↓
Respuesta JSON estructurada
```

---

## Credenciales de prueba (seeders)

| Usuario | Contraseña | Rol |
|---|---|---|
| `admin_sistema` | `password` | ADMIN |
| `l_aravena` | `password` | ENTREVISTADOR |
| `s_errazuriz` | `password` | ENTREVISTADOR |

---

**Autor:** Camilo Lavado / Instituto Profesional San Sebastián  
**Fecha:** Mayo 2026
