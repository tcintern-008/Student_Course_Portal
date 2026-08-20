# CourseApi

ASP.NET Core Web API backend for the Student Course Portal. Manages Courses, Instructors, Students, and Enrollments, with JWT-based authentication and role-based + ownership-based authorization, backed by SQL Server via Entity Framework Core.

## Running locally (without Docker)

1. Open `CourseApi.sln` in Visual Studio.
2. Let NuGet restore.
3. In Package Manager Console: `Add-Migration InitialCreate`, then run with F5 (migrations apply automatically on startup).
4. Swagger opens at `https://localhost:7242/swagger` or `http://localhost:5242/swagger`.

## Running with Docker

The API connects to SQL Server over the network, so containerizing it also means running SQL Server as a container — SQL Server LocalDB (used above) cannot be reached from inside a Docker container.

### 1. Create a Docker network

```
docker network create course-api-network
```

### 2. Run SQL Server in a container

```
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=YourStrong!Passw0rd" -p 1433:1433 --name sql-server-container --network course-api-network -d mcr.microsoft.com/mssql/server:2022-latest
```

Wait 20-30 seconds for it to finish starting before continuing.

### 3. Build the API image

From this folder (the one containing `Dockerfile`):

```
docker build -t course-api .
```

### 4. Run the API container

```
docker run -d --name course-api-container --network course-api-network -p 5242:8080 -e "ConnectionStrings__DefaultConnection=Server=sql-server-container,1433;Database=CourseApiDb;User Id=sa;Password=YourStrong!Passw0rd;TrustServerCertificate=True" -e "Jwt__Key=ThisIsADevOnlySecretKeyChangeItBeforeDeploying123!" -e "Jwt__Issuer=CourseApi" -e "Jwt__Audience=CourseApiUsers" -e "Jwt__ExpiryMinutes=120" -e "AllowedOrigins__0=http://localhost:3000" course-api
```

The API is then reachable at `http://localhost:5242`. Migrations apply automatically on startup.

### Required environment variables

| Variable | Purpose |
|---|---|
| `ConnectionStrings__DefaultConnection` | SQL Server connection string |
| `Jwt__Key` | Secret used to sign JWTs |
| `Jwt__Issuer` | JWT issuer |
| `Jwt__Audience` | JWT audience |
| `Jwt__ExpiryMinutes` | Token lifetime |
| `AllowedOrigins__0` | Frontend origin allowed by CORS |

None of these are hard-coded in the Dockerfile or committed to source control — they're passed at `docker run` time.

### Port

The container listens on `8080` internally. The example maps it to `5242` on the host, matching local (non-Docker) development.

### Useful commands

```
docker ps
docker images
docker logs course-api-container
docker stop course-api-container
docker rm course-api-container
```
