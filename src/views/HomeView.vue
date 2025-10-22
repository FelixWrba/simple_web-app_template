<script setup lang="ts">
import { useToastStore } from '@/stores/toastStore';

const toastStore = useToastStore();
</script>

<template>
  <main class="page">
    <h1>Hello, World!</h1>
    <p>Dies ist eine Hallo-Welt-Nachricht. Weiter Infos findest du <a href="#" class="link">hier</a>.</p>
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <input type="checkbox" class="switch" />
      <input type="text" class="text-field" placeholder="Hier eingeben">
      <textarea id="textarea" placeholder="Gebe etwas mehrzeiliges ein" class="text-area"></textarea>
      <div style="display: flex; justify-content: end; gap: 8px">
        <button class="btn fade">Abbrechen</button>
        <button class="btn" @click="toastStore.push('Hallo, Welt!', 'info')">Senden</button>
      </div>
    </div>
  </main>
</template>
