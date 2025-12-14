<template>
  <div class="location-input-container">
    <div class="input-wrapper">
      <input
        v-model="cityInput"
        type="text"
        placeholder="Enter city name (e.g., London, Paris, Tokyo)"
        class="location-input"
        @keyup.enter="handleAddLocation"
        :disabled="loading"
        aria-label="City name"
      />
      <button
        @click="handleAddLocation"
        class="add-btn"
        :disabled="loading || !cityInput.trim()"
        aria-label="Add location"
      >
        <span v-if="loading" class="loading-spinner">⏳</span>
        <span v-else>+</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Emits {
  (e: 'add', location: string): Promise<boolean>;
}

interface Props {
  loading?: boolean;
}

defineProps<Props>();
const emit = defineEmits<Emits>();

const cityInput = ref('');

async function handleAddLocation() {
  if (!cityInput.value.trim()) return;
  
  const success = await emit('add', cityInput.value.trim());
  if (success) {
    cityInput.value = '';
  }
}
</script>

<style scoped>
.location-input-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto 2rem;
}

.input-wrapper {
  display: flex;
  gap: 0.5rem;
  background: white;
  border-radius: 50px;
  padding: 0.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.input-wrapper:focus-within {
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.location-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  background: transparent;
  color: #333;
}

.location-input::placeholder {
  color: #999;
}

.location-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.add-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.add-btn:hover:not(:disabled) {
  transform: rotate(90deg) scale(1.1);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.add-btn:active:not(:disabled) {
  transform: rotate(90deg) scale(0.95);
}

.add-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.loading-spinner {
  animation: spin 1s linear infinite;
  display: inline-block;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .location-input {
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
  }

  .add-btn {
    width: 45px;
    height: 45px;
    font-size: 1.5rem;
  }
}
</style>
