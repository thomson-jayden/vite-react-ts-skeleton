using Module.WeatherForecast;

namespace App.Api.Endpoints;

public static class WeatherForecastEndpoints
{
    public static WebApplication MapWeatherForecast(this WebApplication app)
    {
        app.MapGet("/weatherforecast", (IWeatherForecastService forecastService) => forecastService.GetForecast())
            .WithName("GetWeatherForecast");

        return app;
    }
}