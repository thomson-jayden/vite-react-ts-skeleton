using Microsoft.Extensions.DependencyInjection;

namespace Module.WeatherForecast;

public static class WeatherForecastModuleExtensions
{
    public static IServiceCollection AddWeatherForecastModule(this IServiceCollection services)
    {
        services.AddSingleton<IWeatherForecastService, WeatherForecastService>();
        return services;
    }
}