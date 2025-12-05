<template>
  <Teleport to='body'>
    <transition-group name="toast" tag="ul" class="toast-stack">
      <li v-for="toast in toastStore.toasts" :key="toast.id" :class="'toast ' + toast.status">
        <div class="toast__actions">
          <button class="icon-btn" :title="t('toast.pin')" :aria-label="t('toast.pin')"
            @click="() => toastStore.preserve(toast.id)" :disabled="toast.preserved">
            <PauseIcon class="icon icon--toast" />
          </button>
          <button class="icon-btn" :title="t('toast.close')" :aria-label="t('toast.close')"
            @click="() => toastStore.close(toast.id)">
            <XMarkIcon class="icon icon--toast" />
          </button>
        </div>
        <span class="toast__status">{{ t('toast.' + toast.status) }}</span>
        <p class="toast__text">{{ toast.text }}</p>
        <span :class="'toast__progress' + (toast.preserved ? ' --preserved' : '')"></span>
      </li>
    </transition-group>
  </Teleport>
</template>

<script setup lang="ts">
import { useToastStore } from '@/stores/toastStore';
import { useI18n } from 'vue-i18n';
import { PauseIcon, XMarkIcon } from '@heroicons/vue/24/solid';

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
  position: relative;
  background-color: var(--color-bg);
  display: block;
  flex: 1;
  box-shadow: var(--shadow-md);
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

.toast__actions {
  right: 2px;
  top: 2px;
  display: flex;
  justify-content: end;
  align-items: center;
  position: absolute;
  opacity: 0;
  transition: opacity 0.3s;
}

.toast:hover>.toast__actions,
.toast:focus-within>.toast__actions {
  opacity: 1;
}

.toast__status {
  padding: 4px 12px 0px;
  display: block;
  font-weight: bold;
  text-transform: uppercase;
}

.toast__text {
  padding: 0px 12px 4px;
  margin: 0;
  color: var(--color-text);
}

.toast__progress {
  display: block;
  height: 0.25em;
  width: 100%;
  background-color: var(--color-border);
  border-top-right-radius: 0.5em;
}

.toast__progress {
  animation: progress 3s linear;
}

.toast__progress.--preserved {
  animation: progress 15s linear 2s;
}

.icon--toast {
  fill: var(--color-text);
  height: 1em;
}

@keyframes progress {
  0% {
    width: 0%;
  }

  100% {
    width: 100%;
  }
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
