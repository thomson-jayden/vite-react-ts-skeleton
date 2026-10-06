import { useEffect, useState } from 'react'
import './App.css'

interface WeatherForecast {
  date: string
  temperatureC: number
  temperatureF: number
  summary: string | null
}

type ForecastState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'success'; forecasts: WeatherForecast[] }

const weekdayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'short' })
const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'short' })

function isWeatherForecast(value: unknown): value is WeatherForecast {
  if (typeof value !== 'object' || value === null) return false

  return (
    'date' in value &&
    typeof value.date === 'string' &&
    'temperatureC' in value &&
    typeof value.temperatureC === 'number' &&
    'temperatureF' in value &&
    typeof value.temperatureF === 'number' &&
    'summary' in value &&
    (typeof value.summary === 'string' || value.summary === null)
  )
}

function App() {
  const [forecastState, setForecastState] = useState<ForecastState>({ status: 'loading' })
  const [requestNumber, setRequestNumber] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadForecast() {
      try {
        const response = await fetch('/weatherforecast', { signal: controller.signal })
        if (!response.ok) throw new Error(`Forecast request failed: ${response.status}`)

        const payload: unknown = await response.json()
        if (!Array.isArray(payload) || !payload.every(isWeatherForecast)) {
          throw new Error('The forecast response had an unexpected format')
        }

        setForecastState({ status: 'success', forecasts: payload })
      } catch {
        if (!controller.signal.aborted) setForecastState({ status: 'error' })
      }
    }

    void loadForecast()
    return () => controller.abort()
  }, [requestNumber])

  function retryForecast() {
    setForecastState({ status: 'loading' })
    setRequestNumber((current) => current + 1)
  }

  let forecastCount = 'FIVE-DAY OUTLOOK'
  if (forecastState.status === 'success') {
    const days = forecastState.forecasts.length
    const unit = days === 1 ? 'DAY' : 'DAYS'
    forecastCount = `${days} ${unit}`
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Weather desk home">
          <span className="brand-mark" aria-hidden="true">
            <span />
          </span>
          <span className="brand-name">WEATHER DESK</span>
        </a>
        <span className="topbar-note">DAILY CONDITIONS, AT A GLANCE</span>
      </header>

      <main className="main-content">
        <section className="forecast-intro" aria-labelledby="page-title">
          <div>
            <p className="eyebrow"><span /> THE DAYS AHEAD</p>
            <h1 id="page-title">Weather forecast</h1>
            <p className="intro-copy">A five-day look at the conditions coming your way.</p>
          </div>
          <div className="intro-index" aria-hidden="true">05</div>
          <span className="service-label"><span className="service-dot" /> FORECAST SERVICE</span>
        </section>

        <section className="forecast-section" aria-labelledby="outlook-title">
          <div className="section-heading">
            <div>
              <p className="section-kicker">YOUR OUTLOOK</p>
              <h2 id="outlook-title">Daily forecast</h2>
            </div>
            <button
              className="refresh-button"
              type="button"
              onClick={retryForecast}
              disabled={forecastState.status === 'loading'}
            >
              <span className="refresh-icon" aria-hidden="true" />
              {forecastState.status === 'error' ? 'Retry forecast' : 'Refresh forecast'}
            </button>
          </div>

          {forecastState.status === 'loading' && (
            <output className="message-panel" aria-live="polite">
              <span className="loading-indicator" aria-hidden="true" />
              <span>Loading the forecast</span>
            </output>
          )}

          {forecastState.status === 'error' && (
            <div className="message-panel error-panel" role="alert">
              <span className="error-mark" aria-hidden="true">!</span>
              <div>
                <strong>Forecast unavailable</strong>
                <p>We couldn’t reach the weather service. Try again in a moment.</p>
              </div>
            </div>
          )}

          {forecastState.status === 'success' && forecastState.forecasts.length === 0 && (
            <output className="message-panel" aria-live="polite">
              <span>No forecast days are available right now.</span>
            </output>
          )}

          {forecastState.status === 'success' && forecastState.forecasts.length > 0 && (
            <>
              <div className="forecast-columns" aria-hidden="true">
                <span>DAY</span>
                <span>CONDITIONS</span>
                <span>TEMPERATURE</span>
              </div>
              <ol className="forecast-list">
                {forecastState.forecasts.map((forecast, index) => {
                  const date = new Date(`${forecast.date}T00:00:00`)

                  return (
                    <li className="forecast-row" key={`${forecast.date}-${index}`}>
                      <time className="forecast-date" dateTime={forecast.date}>
                        <span className="weekday">{weekdayFormatter.format(date)}</span>
                        <span className="calendar-date">
                          <span className="date-day">{date.getDate()}</span>
                          <span className="date-month">{monthFormatter.format(date)}</span>
                        </span>
                      </time>
                      <div className="forecast-condition">
                        <span className="condition-mark" aria-hidden="true" />
                        <span>{forecast.summary || 'Conditions unavailable'}</span>
                      </div>
                      <div className="forecast-temperature">
                        <strong>{forecast.temperatureC}°</strong>
                        <span>C <i>/</i> {forecast.temperatureF}°F</span>
                      </div>
                    </li>
                  )
                })}
              </ol>
            </>
          )}

          <footer className="forecast-footer">
            <span>Source: Weather forecast API</span>
            <span className="forecast-count">{forecastCount}</span>
          </footer>
        </section>
      </main>
    </div>
  )
}

export default App