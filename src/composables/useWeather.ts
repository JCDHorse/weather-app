import { ref, computed, onMounted } from 'vue';
import type { WeatherData, TemperatureUnit } from '../types/weather';
import { fetchWeatherByCity } from '../services/weatherApi';

const STORAGE_KEY = 'weather-app-locations';
const UNIT_STORAGE_KEY = 'weather-app-unit';

export function useWeather() {
  const weatherData = ref<WeatherData[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const temperatureUnit = ref<TemperatureUnit>('celsius');

  // Load saved locations from localStorage on mount
  onMounted(() => {
    loadLocationsFromStorage();
    loadTemperatureUnit();
  });

  /**
   * Load locations from localStorage
   */
  function loadLocationsFromStorage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const locations: string[] = JSON.parse(saved);
        // Fetch weather for each saved location
        locations.forEach(location => {
          addLocation(location);
        });
      }
    } catch (err) {
      console.error('Failed to load locations from storage:', err);
    }
  }

  /**
   * Load temperature unit preference from localStorage
   */
  function loadTemperatureUnit() {
    try {
      const saved = localStorage.getItem(UNIT_STORAGE_KEY);
      if (saved && (saved === 'celsius' || saved === 'fahrenheit')) {
        temperatureUnit.value = saved;
      }
    } catch (err) {
      console.error('Failed to load temperature unit:', err);
    }
  }

  /**
   * Save locations to localStorage
   */
  function saveLocationsToStorage() {
    try {
      const locations = weatherData.value.map(data => data.location);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(locations));
    } catch (err) {
      console.error('Failed to save locations to storage:', err);
    }
  }

  /**
   * Save temperature unit to localStorage
   */
  function saveTemperatureUnit() {
    try {
      localStorage.setItem(UNIT_STORAGE_KEY, temperatureUnit.value);
    } catch (err) {
      console.error('Failed to save temperature unit:', err);
    }
  }

  /**
   * Add a new location and fetch its weather
   */
  async function addLocation(location: string): Promise<boolean> {
    if (!location.trim()) {
      error.value = 'Please enter a valid location';
      return false;
    }

    // Check for duplicates by ID (more reliable than name comparison)
    // We'll check after fetching to get the actual city ID from API
    const locationTrimmed = location.trim();

    loading.value = true;
    error.value = null;

    try {
      const data = await fetchWeatherByCity(locationTrimmed);
      
      // Check if this city ID already exists
      const exists = weatherData.value.some(item => item.id === data.id);
      if (exists) {
        error.value = 'This location is already added';
        return false;
      }
      
      weatherData.value.push(data);
      saveLocationsToStorage();
      return true;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch weather data';
      return false;
    } finally {
      loading.value = false;
    }
  }

  /**
   * Remove a location by ID
   */
  function removeLocation(id: string) {
    weatherData.value = weatherData.value.filter(data => data.id !== id);
    saveLocationsToStorage();
  }

  /**
   * Refresh weather data for all locations
   */
  async function refreshAllWeather() {
    const locations = weatherData.value.map(data => data.location);
    weatherData.value = [];
    
    // Fetch all locations concurrently for better performance
    const results = await Promise.allSettled(
      locations.map(location => fetchWeatherByCity(location))
    );
    
    // Only add successfully fetched weather data
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        weatherData.value.push(result.value);
      }
    });
    
    saveLocationsToStorage();
  }

  /**
   * Toggle temperature unit
   */
  function toggleTemperatureUnit() {
    temperatureUnit.value = temperatureUnit.value === 'celsius' ? 'fahrenheit' : 'celsius';
    saveTemperatureUnit();
  }

  /**
   * Convert temperature based on current unit
   */
  function convertTemperature(celsius: number): number {
    if (temperatureUnit.value === 'fahrenheit') {
      return Math.round((celsius * 9/5) + 32);
    }
    return celsius;
  }

  /**
   * Get temperature unit symbol
   */
  const temperatureSymbol = computed(() => {
    return temperatureUnit.value === 'celsius' ? '°C' : '°F';
  });

  /**
   * Clear error message
   */
  function clearError() {
    error.value = null;
  }

  return {
    weatherData,
    loading,
    error,
    temperatureUnit,
    temperatureSymbol,
    addLocation,
    removeLocation,
    refreshAllWeather,
    toggleTemperatureUnit,
    convertTemperature,
    clearError,
  };
}
