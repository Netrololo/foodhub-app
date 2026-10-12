FROM ://microsoft.com AS build
WORKDIR /app

COPY . .
RUN dotnet restore "FoodHubApi.csproj"
RUN dotnet publish "FoodHubApi.csproj" -c Release -o out

FROM ://microsoft.com
WORKDIR /app
COPY --from=build /app/out .
EXPOSE 8080
ENTRYPOINT ["dotnet", "FoodHubApi.dll"]
