# Proyecto Solicitudes Académicas

## Descripción

Este proyecto consiste en una aplicación web para la gestión de solicitudes académicas de estudiantes.

El sistema permite registrar, visualizar, actualizar y eliminar solicitudes académicas, facilitando la organización y seguimiento de los requerimientos de los estudiantes. Además, incorpora filtros de búsqueda y validaciones para mejorar la experiencia de uso.

El desarrollo fue realizado aplicando los conocimientos adquiridos durante la asignatura de Programación Web.

---

## Tecnologías Utilizadas

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js

### Base de Datos

* MySQL

### Control de Versiones

* Git
* GitHub

---

## Funcionalidades Implementadas

### Gestión de Solicitudes

* Crear solicitudes académicas.
* Visualizar listado de solicitudes.
* Actualizar solicitudes existentes.
* Eliminar solicitudes.

### Filtros y Búsqueda

* Filtrar por tipo de solicitud.
* Filtrar por prioridad.
* Buscar por nombre del estudiante.
* Buscar por asignatura.

### Validaciones

* Validación de campos obligatorios.
* Validación de correo electrónico.
* Validación de longitud mínima en campos relevantes.
* Mensajes de error y éxito para el usuario.

### Persistencia de Datos

* Conexión a base de datos MySQL.
* Almacenamiento permanente de la información.
* Operaciones CRUD completas.

---

## Estructura del Proyecto

```text
proyecto-solicitudes-academicas
│
├── public
│   ├── css
│   ├── js
│   ├── index.html
│   └── formulario.html
│
├── src
│   ├── config
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── services
│   └── app.js
│
├── package.json
├── package-lock.json
└── README.md
```

---

## Instalación y Ejecución

### 1. Clonar el repositorio

```bash
git clone URL_DEL_REPOSITORIO
```

### 2. Ingresar al proyecto

```bash
cd proyecto-solicitudes-academicas
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Configurar las variables de entorno

Crear un archivo `.env` con la configuración de la base de datos:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=TU_PASSWORD
DB_NAME=solicitudes_academicas
DB_PORT=3306
```

### 5. Ejecutar la aplicación

```bash
npm start
```

### 6. Abrir en el navegador

```text
http://localhost:3000
```

---

## Base de Datos

La aplicación utiliza MySQL para almacenar la información de las solicitudes académicas.

Cada solicitud contiene los siguientes datos:

* ID
* Nombre del estudiante
* Correo institucional
* Asignatura
* Tipo de solicitud
* Descripción
* Prioridad
* Fecha de ingreso

---

## Integrantes

* Juan Briceño 
* Bastian Arredondo

---

## Conclusión

Durante el desarrollo de este proyecto se aplicaron los contenidos aprendidos en la asignatura de Programación Web, utilizando tecnologías como HTML, CSS, JavaScript, Node.js, Express y MySQL.

La aplicación desarrollada permite gestionar solicitudes académicas mediante operaciones CRUD, incorporando validaciones, filtros de búsqueda y almacenamiento de datos en una base de datos relacional.

Además, el trabajo permitió fortalecer habilidades relacionadas con la manipulación del DOM, el manejo de eventos, la comunicación entre frontend y backend, el uso de GitHub para el control de versiones y el trabajo colaborativo en equipo.

Como resultado, se logró desarrollar una solución funcional que cumple con los requerimientos planteados para la actividad.

```
```
