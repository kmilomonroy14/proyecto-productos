# Sistema de Registro y Listado de Productos

CRUD de productos (nombre, precio, stock) con Spring Boot + React.

## Requisitos
- Java 17+ y Maven
- Node.js 18+

## Backend (puerto 8080)
```
cd backend
mvn spring-boot:run
```
Base de datos H2 en memoria. Consola en http://localhost:8080/h2-console
(JDBC URL: `jdbc:h2:mem:productosdb`, usuario `sa`, sin contraseña).

### Endpoints
| Método | Ruta              | Descripción                                   |
|--------|-------------------|-----------------------------------------------|
| GET    | `/productos`      | Lista todos los productos                     |
| POST   | `/productos`      | Crea (sin `id`) o actualiza (con `id`)        |
| POST   | `/productos/{id}` | Elimina el producto (204, o 404 si no existe) |

Validaciones: nombre obligatorio, precio >= 0, stock entero >= 0 (400 con detalle del error).

## Frontend (puerto 5173)
```
cd frontend
npm install
npm run dev
```
La URL del backend se configura en `frontend/.env` (`VITE_API_URL`).

## Nota de diseño
El enunciado define la eliminación como `POST /productos/{id}`; se respetó tal cual,
aunque en una API REST convencional sería `DELETE /productos/{id}`.
