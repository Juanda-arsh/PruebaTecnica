# Gestion de autos de usuarios

Aplicacion full stack para registrar usuarios, autenticar con JWT y gestionar autos propios. El backend esta en `prueba/` y el frontend en `frontend/`.

## Arquitectura

Backend Spring Boot con arquitectura hexagonal:

```text
prueba/src/main/java/com/example/prueba
  domain/
    model/              Modelos puros: User, Car, Role, TokenClaims
    port/in/            Casos de uso y comandos de entrada
    port/out/           Puertos de persistencia, token y password
  application/
    dto/                Requests y responses de API
    mapper/             Mappers hacia DTOs
    service/            Implementacion de casos de uso
    exception/          Errores de aplicacion
  infrastructure/
    adapter/in/web/     Controladores REST
    adapter/out/persistence/
                         Entidades JPA, repositorios y adaptadores
    config/             Spring Security y CORS
    security/           JWT, BCrypt y filtro de autenticacion
    exception/          GlobalExceptionHandler
```

El dominio no depende de JPA ni de Spring MVC. La persistencia implementa puertos de salida y los controladores consumen puertos de entrada.

## Stack

- Java 21
- Spring Boot 4
- Spring Web MVC, Spring Security, Spring Data JPA
- PostgreSQL
- Flyway
- JWT HMAC SHA-256
- React + Vite
- React Router, Axios, Context API

## Variables de entorno

Backend:

```env
DB_URL=jdbc:postgresql://localhost:5432/car_management
DB_USERNAME=postgres
DB_PASSWORD=postgres
JWT_SECRET=local-development-secret-change-me-to-at-least-32-characters
JWT_EXPIRATION_MINUTES=120
CORS_ALLOWED_ORIGINS=http://localhost:5173
SERVER_PORT=8090
```

Frontend:

```env
VITE_API_BASE_URL=http://localhost:8090/api
```

## Ejecutar local sin Docker

1. Crear una base PostgreSQL local:

```sql
CREATE DATABASE car_management;
```

2. Levantar backend:

```powershell
cd "C:\Users\Juan Buitrago\Downloads\prueba\prueba"
.\gradlew.bat bootRun
```

El backend queda en `http://localhost:8090`.

3. Levantar frontend:

```powershell
cd "C:\Users\Juan Buitrago\Downloads\prueba\frontend"
npm install
npm run dev
```

El frontend queda en `http://localhost:5173`.

## Ejecutar con Docker Compose

Desde la carpeta raiz `C:\Users\Juan Buitrago\Downloads\prueba`:

```powershell
docker compose up --build
```

Servicios:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8090`
- PostgreSQL: `localhost:5432`

Flyway crea las tablas `users` y `cars` al iniciar el backend.

## Endpoints principales

Publicos:

- `POST /api/auth/register`
- `POST /api/auth/login`

Protegidos con `Authorization: Bearer <token>`:

- `GET /api/cars`
- `GET /api/cars/{id}`
- `POST /api/cars`
- `PUT /api/cars/{id}`
- `DELETE /api/cars/{id}`
- `GET /api/cars/search?plate=ABC&model=Corolla&brand=Toyota&color=Rojo&year=2022`
- `GET /api/cars/filter?brand=Toyota&color=Rojo&year=2022`

## Ejemplo de flujo API

Registro:

```json
{
  "name": "Juan",
  "email": "juan@example.com",
  "password": "Password123"
}
```

Crear auto:

```json
{
  "brand": "Toyota",
  "model": "Corolla",
  "year": 2022,
  "plate": "ABC123",
  "color": "Rojo",
  "photoUrl": "https://example.com/car.jpg"
}
```

## Verificacion

Backend:

```powershell
.\gradlew.bat --gradle-user-home .gradle-run test --no-daemon
```

Frontend:

```powershell
npm install
npm run build
```

## Coleccion Postman

La coleccion esta en `postman/car-management.postman_collection.json`. Usa la variable `baseUrl` con valor `http://localhost:8090/api` y guarda automaticamente el token tras registro o login.
