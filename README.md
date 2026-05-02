# 🚀 RecruitAPI - Backend de Gestión de Reclutamiento

Una API RESTful robusta desarrollada en **Node.js** y **Express** para la administración integral de procesos de selección de personal. Este proyecto nace como una migración evolutiva desde una arquitectura monolítica en PHP hacia un entorno JavaScript moderno, asíncrono y transaccional, utilizando **Sequelize ORM** para la gestión de la base de datos MySQL.

## ⚙️ Tecnologías Utilizadas

* **Entorno de Ejecución:** Node.js
* **Framework Web:** Express.js
* **ORM:** Sequelize
* **Base de Datos:** MySQL
* **Seguridad:** Encriptación de contraseñas nativa (Bcrypt)
* **Herramientas de Desarrollo:** Nodemon, Sequelize-CLI

## ✨ Características Principales

* **Arquitectura MVC Adaptada:** Separación clara de responsabilidades entre Rutas, Controladores y Modelos.
* **Integridad Referencial:** Gestión estricta de llaves foráneas (`candidato_id`, `cargo_id`, `entrevistador_id`) mediante Sequelize y validaciones previas al guardado.
* **Manejo de Errores Estandarizado:** Respuestas JSON consistentes con códigos de estado HTTP precisos (200, 201, 400, 401, 404, 500).
* **Migraciones Automatizadas:** Control de versiones de la base de datos mediante scripts cronológicos de Sequelize.

## 🗄️ Esquema de la Base de Datos

El sistema gestiona 6 entidades principales fuertemente tipadas y relacionadas:
1.  `Usuarios` (Autenticación y roles)
2.  `Candidatos` (Postulantes)
3.  `Cargos` (Vacantes operativas)
4.  `Entrevistadores` (Equipo evaluador)
5.  `Entrevistas` (Agenda y estados de evaluación)
6.  `Experiencias` (Historial laboral de candidatos)

---

## 🛠️ Instalación y Configuración Local

Sigue estos pasos para ejecutar el proyecto en tu entorno local.

### 1. Clonar el repositorio
```bash
git clone
https://github.com/camilo-lavado/ipss-eva2-backend-node
```

### 2. Instalar dependencias
Asegúrate de tener Node.js instalado y ejecuta:
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto basándote en un posible archivo de ejemplo (o utiliza esta plantilla):
```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password_aqui
DB_NAME=recruit_db
```
### 4. Crear y poblar la base de datos
Asegúrate de tener MySQL instalado y en ejecución. Luego, ejecuta los archivos
tablas.sql y datos.sql

### 5. Levantar el servidor
Para iniciar la API en modo desarrollo (con recarga automática mediante Nodemon):
```bash
npm run dev
```
O en modo producción:
```bash
npm start
```

El servidor estará escuchando por defecto en: `http://localhost:3000`

---

## 📡 Endpoints Principales

La API centraliza sus rutas bajo el prefijo `/api`. A continuación, un resumen de los módulos disponibles:

* **Diagnóstico:**
    * `GET /api/health` -> Verifica el estado general del servidor.
* **Autenticación:**
    * `POST /api/usuarios/login` -> Inicio de sesión.
* **Recursos CRUD (Soportan GET, POST, PUT, DELETE):**
    * `/api/usuarios`
    * `/api/candidatos`
    * `/api/cargos`
    * `/api/entrevistadores`
    * `/api/entrevistas`
    * `/api/experiencias`

> **Nota:** Para probar los endpoints, se recomienda importar la colección de Postman incluida en el repositorio (`postman_collection.json`).

---

## 🏗️ Patrón Arquitectónico

El flujo de una petición dentro del sistema sigue este ciclo de vida:
1.  **Cliente:** Envía una solicitud HTTP con un payload JSON.
2.  **Enrutador (Routes):** Intercepta la URL, valida el método HTTP y redirige al controlador correspondiente.
3.  **Controlador (Controllers):** Evalúa la lógica de negocio, extrae los parámetros del `req.body` o la URL, e invoca al ORM.
4.  **Modelo (Sequelize):** Traduce la instrucción a sintaxis SQL de forma segura y ejecuta la transacción en la base de datos MySQL.
5.  **Respuesta:** El controlador captura el resultado (o la excepción en el bloque `catch`) y retorna el objeto JSON estructurado al cliente.

---
**Autor:** Camilo Lavado / Instituto Profesional San Sebastián
**Fecha de Creación:** Abril 2026
```