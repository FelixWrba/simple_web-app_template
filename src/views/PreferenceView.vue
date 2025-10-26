<template>
  <main class="page">
    <h1>{{ t('preferences.title') }}</h1>
    <h2>{{ t('preferences.presentation') }}</h2>
    <div class="settings-item">
      <label for="mode">{{ t('preferences.mode') }}</label>
      <select id="mode" class="dropdown">
        <option value="device">{{ t('preferences.auto') }}</option>
        <option value="light">{{ t('preferences.light') }}</option>
        <option value="dark">{{ t('preferences.dark') }}</option>
      </select>
    </div>
    <div class="settings-item">
      <label for="high-contrast">{{ t('preferences.high') }}</label>
      <input type="checkbox" id="high-contrast" class="switch">
    </div>
  </main>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style>
.settings-item {
  display: flex;
  align-items: center;
  padding: 4px;
  background-color: transparent;
  transition: background-color 0.3s;
  height: 3em;
  border-radius: 4px;
  user-select: none;
}

.settings-item:active {
  background-color: var(--color-bg-mute);
}

.settings-item label {
  cursor: pointer;
  flex: 1;
}
</style>
