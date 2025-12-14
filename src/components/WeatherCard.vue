<template>
  <div class="weather-card" :class="weatherTheme">
    <button class="remove-btn" @click="handleRemove" aria-label="Remove location">
      <span class="remove-icon">×</span>
    </button>
    
    <div class="weather-header">
      <h2 class="location">{{ weather.location }}</h2>
      <p class="country">{{ weather.country }}</p>
    </div>

    <div class="weather-main">
      <img 
        :src="iconUrl" 
        :alt="weather.description"
        class="weather-icon"
      />
      <div class="temperature">{{ displayTemperature }}{{ unit }}</div>
    </div>

    <p class="description">{{ capitalizedDescription }}</p>

    <div class="weather-details">
      <div class="detail-item">
        <span class="detail-icon">💧</span>
        <div>
          <div class="detail-label">Humidity</div>
          <div class="detail-value">{{ weather.humidity }}%</div>
        </div>
      </div>
      
      <div class="detail-item">
        <span class="detail-icon">💨</span>
        <div>
          <div class="detail-label">Wind Speed</div>
          <div class="detail-value">{{ weather.windSpeed }} km/h</div>
        </div>
      </div>
      
      <div class="detail-item">
        <span class="detail-icon">🌡️</span>
        <div>
          <div class="detail-label">Feels Like</div>
          <div class="detail-value">{{ displayFeelsLike }}{{ unit }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { WeatherData } from '../types/weather';
import { getWeatherIconUrl } from '../services/weatherApi';

interface Props {
  weather: WeatherData;
  unit: string;
  convertTemperature: (temp: number) => number;
}

interface Emits {
  (e: 'remove', id: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const iconUrl = computed(() => getWeatherIconUrl(props.weather.icon));

const capitalizedDescription = computed(() => {
  return props.weather.description.charAt(0).toUpperCase() + 
         props.weather.description.slice(1);
});

const displayTemperature = computed(() => {
  return props.convertTemperature(props.weather.temperature);
});

const displayFeelsLike = computed(() => {
  return props.convertTemperature(props.weather.feelsLike);
});

const weatherTheme = computed(() => {
  const icon = props.weather.icon;
  if (icon.includes('01')) return 'clear';
  if (icon.includes('02') || icon.includes('03') || icon.includes('04')) return 'clouds';
  if (icon.includes('09') || icon.includes('10')) return 'rain';
  if (icon.includes('11')) return 'thunderstorm';
  if (icon.includes('13')) return 'snow';
  if (icon.includes('50')) return 'mist';
  return 'default';
});

function handleRemove() {
  emit('remove', props.weather.id);
}
</script>

<style scoped>
.weather-card {
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 2rem;
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  animation: slideIn 0.5s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.weather-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.weather-card.clear {
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
}

.weather-card.clouds {
  background: linear-gradient(135deg, #a8c0ff 0%, #3f2b96 100%);
}

.weather-card.rain {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.weather-card.thunderstorm {
  background: linear-gradient(135deg, #4b6cb7 0%, #182848 100%);
}

.weather-card.snow {
  background: linear-gradient(135deg, #e0e0e0 0%, #a0a0a0 100%);
  color: #333;
}

.weather-card.mist {
  background: linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%);
}

.remove-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  color: white;
}

.remove-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
}

.remove-icon {
  font-size: 24px;
  line-height: 1;
}

.weather-header {
  margin-bottom: 1.5rem;
}

.location {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
}

.country {
  font-size: 1rem;
  margin: 0;
  opacity: 0.9;
}

.weather-main {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.5rem 0;
}

.weather-icon {
  width: 100px;
  height: 100px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.temperature {
  font-size: 3.5rem;
  font-weight: 700;
  margin-left: 1rem;
}

.description {
  text-align: center;
  font-size: 1.2rem;
  margin: 1rem 0 1.5rem 0;
  text-transform: capitalize;
}

.weather-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.detail-icon {
  font-size: 1.5rem;
}

.detail-label {
  font-size: 0.75rem;
  opacity: 0.8;
  margin-bottom: 0.25rem;
}

.detail-value {
  font-size: 1rem;
  font-weight: 600;
}

.weather-card.snow .remove-btn,
.weather-card.snow .location,
.weather-card.snow .country,
.weather-card.snow .temperature,
.weather-card.snow .description,
.weather-card.snow .detail-label,
.weather-card.snow .detail-value {
  color: #333;
}

@media (max-width: 768px) {
  .weather-card {
    padding: 1.5rem;
  }

  .location {
    font-size: 1.5rem;
  }

  .temperature {
    font-size: 2.5rem;
  }

  .weather-icon {
    width: 80px;
    height: 80px;
  }

  .weather-details {
    grid-template-columns: 1fr;
  }
}
</style>
