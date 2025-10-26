<template>
  <Teleport to='body'>
    <transition-group name="toast" tag="ul" class="toast-stack">
      <li v-for="toast in toastStore.toasts" :key="toast.id" :class="'toast ' + toast.status">
        <span class="toast__status">{{ t('status.' + toast.status) }}</span>
        <p class="toast__text">{{ toast.text }}</p>
      </li>
    </transition-group>
  </Teleport>
</template>

<script setup lang="ts">
import { useToastStore } from '@/stores/toastStore';
import { useI18n } from 'vue-i18n';

const toastStore = useToastStore();
const { t } = useI18n();
</script>

<style>
.toast-stack {
  position: fixed;
  top: 12px;
  right: 12px;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 300px;
  width: 100%;
  z-index: 9;
}

.toast {
  background-color: var(--color-bg);
  display: block;
  flex: 1;
  padding: 4px 12px;
  box-shadow: var(--shadow-lg);
  border-radius: 4px;
  border: 1px solid var(--color-border);
  border-left: 4px solid var(--color-info);
  color: var(--color-info);
}

.toast.success {
  border-left: 4px solid var(--color-success);
  color: var(--color-success);
}

.toast.warning {
  border-left: 4px solid var(--color-warning);
  color: var(--color-warning);
}

.toast.error {
  border-left: 4px solid var(--color-error);
  color: var(--color-error);
}

.toast__status {
  font-weight: bold;
  text-transform: uppercase;
}

.toast__text {
  margin: 0;
  color: var(--color-text);
}

.toast-enter-from,
.toast-leave-to {
  margin-top: -73px;
  opacity: 0;
}

.toast-enter-active,
.toast-leave-active {
  transition: .3s ease all;
}
</style>
