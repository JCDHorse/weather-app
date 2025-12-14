import type { WeatherApiResponse, WeatherData } from '../types/weather';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || 'demo';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export class WeatherApiError extends Error {
  code?: string;
  
  constructor(message: string, code?: string) {
    super(message);
    this.name = 'WeatherApiError';
    this.code = code;
  }
}

/**
 * Fetch weather data for a specific city
 */
export async function fetchWeatherByCity(city: string): Promise<WeatherData> {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new WeatherApiError('City not found. Please check the spelling and try again.', '404');
      } else if (response.status === 401) {
        throw new WeatherApiError('Invalid API key. Please check your configuration.', '401');
      } else {
        throw new WeatherApiError('Failed to fetch weather data. Please try again later.', `${response.status}`);
      }
    }

    const data: WeatherApiResponse = await response.json();
    return transformWeatherData(data);
  } catch (error) {
    if (error instanceof WeatherApiError) {
      throw error;
    }
    if (error instanceof TypeError) {
      throw new WeatherApiError('Network error. Please check your internet connection.');
    }
    throw new WeatherApiError('An unexpected error occurred. Please try again.');
  }
}

/**
 * Transform API response to our internal WeatherData format
 */
function transformWeatherData(data: WeatherApiResponse): WeatherData {
  const weather = data.weather[0];
  if (!weather) {
    throw new WeatherApiError('Invalid weather data received from API');
  }

  return {
    id: `${data.id}`,
    location: data.name,
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    description: weather.description,
    icon: weather.icon,
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
    country: data.sys.country,
    timestamp: Date.now(),
  };
}

/**
 * Get weather icon URL from OpenWeatherMap
 */
export function getWeatherIconUrl(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}
