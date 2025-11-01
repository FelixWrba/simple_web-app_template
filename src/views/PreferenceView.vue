<template>
  <main class="page">
    <h1>{{ t(i18nPrefix + 'title') }}</h1>
    <section v-for="({ title, options }) in sections" :key="title">
      <h2 class="settings-heading">{{ t(i18nPrefix + title) }}</h2>
      <div class="settings-item" v-for="option in options" :key="option.label">
        <label :for="option.label">{{ t(i18nPrefix + option.label) }}</label>
        <input type="checkbox" :id="option.label" class="switch" v-if="option.style === 'switch'"
          v-model="preferences[title][option.label]">

        <select :id="option.label" class="dropdown" v-else-if="option.style === 'dropdown'"
          v-model="preferences[title][option.label]">
          <option v-for="item in option.content" :value="item" :key="item">{{ t(i18nPrefix + item) }}</option>
        </select>

        <code v-else>Failed to render input: {{ option.style }}</code>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { usePreferenceStore } from '@/stores/preferenceStore';

const { t } = useI18n();
const { preferences, sections } = usePreferenceStore();

const i18nPrefix = 'preferences.';
</script>

<style>
.settings-item {
  display: flex;
  align-items: center;
  padding: 4px;
  background-color: transparent;
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

.settings-heading {
  margin: 16px 0px 4px;
}
</style>
