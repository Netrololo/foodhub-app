FROM ://microsoft.com AS build
WORKDIR /src

COPY ["FoodHubApi.csproj", "."]
RUN dotnet restore "FoodHubApi.csproj"

COPY . .
RUN dotnet build "FoodHubApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "FoodHubApi.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM ://microsoft.com AS final
WORKDIR /app
COPY --from=publish /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "FoodHubApi.dll"]
