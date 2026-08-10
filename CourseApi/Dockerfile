FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY CourseApi/CourseApi.csproj CourseApi/
RUN dotnet restore CourseApi/CourseApi.csproj

COPY CourseApi/ CourseApi/
WORKDIR /src/CourseApi
RUN dotnet publish -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app

COPY --from=build /app .

ENV ASPNETCORE_URLS=http://+:10000

EXPOSE 10000

ENTRYPOINT ["dotnet", "CourseApi.dll"]