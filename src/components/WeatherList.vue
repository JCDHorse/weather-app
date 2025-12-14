<template>
  <div class="weather-list">
    <div v-if="weatherData.length === 0" class="empty-state">
      <div class="empty-icon">🌍</div>
      <h2>No locations added yet</h2>
      <p>Add a city to start tracking weather</p>
    </div>
    
    <TransitionGroup 
      v-else
      name="card-list" 
      tag="div" 
      class="weather-grid"
    >
      <WeatherCard
        v-for="weather in weatherData"
        :key="weather.id"
        :weather="weather"
        :unit="unit"
        :convert-temperature="convertTemperature"
        @remove="handleRemove"
      />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import type { WeatherData } from '../types/weather';
import WeatherCard from './WeatherCard.vue';

interface Props {
  weatherData: WeatherData[];
  unit: string;
  convertTemperature: (temp: number) => number;
}

interface Emits {
  (e: 'remove', id: string): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();

function handleRemove(id: string) {
  emit('remove', id);
}
</script>

<style scoped>
.weather-list {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: white;
}

.empty-icon {
  font-size: 5rem;
  margin-bottom: 1rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.empty-state h2 {
  font-size: 2rem;
  margin: 0 0 0.5rem 0;
  font-weight: 700;
}

.empty-state p {
  font-size: 1.2rem;
  margin: 0;
  opacity: 0.9;
}

.weather-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem 0;
}

/* Card list transitions */
.card-list-enter-active,
.card-list-leave-active {
  transition: all 0.5s ease;
}

.card-list-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.card-list-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.card-list-move {
  transition: transform 0.5s ease;
}

@media (max-width: 768px) {
  .weather-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .empty-icon {
    font-size: 3rem;
  }

  .empty-state h2 {
    font-size: 1.5rem;
  }

  .empty-state p {
    font-size: 1rem;
  }
}
</style>
