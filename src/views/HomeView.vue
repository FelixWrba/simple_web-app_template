<script setup lang="ts">
import { useToastStore } from '@/stores/toastStore';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const toastStore = useToastStore();
</script>

<template>
  <main class="page">
    <h1>{{ t('home.title') }}</h1>
    <p>{{ t('home.message') }} <a href="#" class="link">{{ t('home.link') }}</a>.</p>
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <input type="checkbox" class="switch" />
      <input type="text" class="text-field" :placeholder="t('home.field')">
      <textarea id="textarea" :placeholder="t('home.area')" class="text-area"></textarea>
      <div style="display: flex; justify-content: end; gap: 8px">
        <button class="btn fade">{{ t('cta.cancel') }}</button>
        <button class="btn" @click="toastStore.push('Hallo, Welt!', 'success')">{{ t('cta.send') }}</button>
      </div>
    </div>
  </main>
</template>
