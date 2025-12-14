<script setup lang="ts">
import { useWeather } from './composables/useWeather';
import LocationInput from './components/LocationInput.vue';
import WeatherList from './components/WeatherList.vue';

const {
  weatherData,
  loading,
  error,
  temperatureSymbol,
  addLocation,
  removeLocation,
  toggleTemperatureUnit,
  convertTemperature,
  clearError,
} = useWeather();

async function handleAddLocation(location: string): Promise<boolean> {
  return await addLocation(location);
}

function handleRemoveLocation(id: string) {
  removeLocation(id);
}
</script>

<template>
  <div class="app">
    <header class="app-header">
      <div class="header-content">
        <div class="title-section">
          <h1 class="app-title">
            <span class="weather-emoji">⛅</span>
            Weather App
          </h1>
          <p class="app-subtitle">Track weather for your favorite cities</p>
        </div>
        
        <button 
          class="unit-toggle"
          @click="toggleTemperatureUnit"
          :title="`Switch to ${temperatureSymbol === '°C' ? 'Fahrenheit' : 'Celsius'}`"
        >
          {{ temperatureSymbol }}
        </button>
      </div>
    </header>

    <main class="app-main">
      <LocationInput 
        :loading="loading"
        @add="handleAddLocation"
      />

      <Transition name="error">
        <div v-if="error" class="error-message">
          <span class="error-icon">⚠️</span>
          {{ error }}
          <button class="error-close" @click="clearError" aria-label="Close error">×</button>
        </div>
      </Transition>

      <WeatherList
        :weather-data="weatherData"
        :unit="temperatureSymbol"
        :convert-temperature="convertTemperature"
        @remove="handleRemoveLocation"
      />
    </main>

    <footer class="app-footer">
      <p>Powered by OpenWeatherMap API</p>
    </footer>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem 1rem;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.title-section {
  flex: 1;
}

.app-title {
  color: white;
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.weather-emoji {
  font-size: 3rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.app-subtitle {
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  font-size: 1.1rem;
}

.unit-toggle {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 80px;
}

.unit-toggle:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

.unit-toggle:active {
  transform: scale(0.95);
}

.app-main {
  flex: 1;
  padding: 3rem 1rem;
  position: relative;
}

.error-message {
  max-width: 600px;
  margin: 0 auto 2rem;
  background: rgba(255, 68, 68, 0.95);
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 4px 15px rgba(255, 68, 68, 0.3);
}

.error-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.error-close {
  background: transparent;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.3s ease;
  margin-left: auto;
  flex-shrink: 0;
}

.error-close:hover {
  background: rgba(255, 255, 255, 0.2);
}

.error-enter-active,
.error-leave-active {
  transition: all 0.3s ease;
}

.error-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.error-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.app-footer {
  background: rgba(0, 0, 0, 0.2);
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding: 1.5rem;
  margin-top: 2rem;
}

.app-footer p {
  margin: 0;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .app-header {
    padding: 1.5rem 1rem;
  }

  .header-content {
    flex-direction: column;
    text-align: center;
  }

  .app-title {
    font-size: 2rem;
    justify-content: center;
  }

  .weather-emoji {
    font-size: 2.5rem;
  }

  .app-subtitle {
    font-size: 1rem;
  }

  .unit-toggle {
    width: 100%;
  }

  .app-main {
    padding: 2rem 1rem;
  }

  .error-message {
    padding: 1rem;
    font-size: 0.9rem;
  }
}
</style>
