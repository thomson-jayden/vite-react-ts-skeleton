namespace Module.WeatherForecast;

public interface IWeatherForecastService
{
    IReadOnlyList<WeatherForecast> GetForecast();
}