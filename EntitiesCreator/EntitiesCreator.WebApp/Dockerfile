#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["EntitiesCreator.WebApp/EntitiesCreator.WebApp.csproj", "EntitiesCreator.WebApp/"]
COPY ["EntitiesCreator.Infrastructure/EntitiesCreator.Infrastructure.csproj", "EntitiesCreator.Infrastructure/"]
COPY ["EntitiesCreator.Application/EntitiesCreator.Application.csproj", "EntitiesCreator.Application/"]
COPY ["EntitiesCreator.Domain/EntitiesCreator.Domain.csproj", "EntitiesCreator.Domain/"]
RUN dotnet restore "EntitiesCreator.WebApp/EntitiesCreator.WebApp.csproj"
COPY . .
WORKDIR "/src/EntitiesCreator.WebApp"
RUN dotnet build "EntitiesCreator.WebApp.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "EntitiesCreator.WebApp.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "EntitiesCreator.WebApp.dll"]