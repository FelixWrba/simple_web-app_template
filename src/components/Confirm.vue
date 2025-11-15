<template>
  <dialog :open="isDialogOpen" class="confirm">
    <h3 class="confirm__title">{{ dialogOptions.title }}</h3>
    <p class="confirm__description" v-if="dialogOptions.description">{{ dialogOptions.description }}</p>

    <div class="confirm__cta" v-if="dialogOptions.destructive">
      <button class="btn cancel" @click="confirmFalse">{{ t(dialogOptions.cancelText!) }}</button>
      <button class="btn danger" @click="confirmTrue">{{ t(dialogOptions.confirmText!) }}</button>
    </div>

    <div class="confirm__cta" v-else>
      <button class="btn fade" @click="confirmFalse">{{ t('cta.cancel') }}</button>
      <button class="btn" @click="confirmTrue">{{ t('cta.confirm') }}</button>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useConfirm } from '@/lib/useConfirm';

const { t } = useI18n();
const { confirmTrue, confirmFalse, dialogOptions, isDialogOpen } = useConfirm();
</script>

<style>
.confirm {
  position: fixed;
  top: 2em;
  left: 50%;
  transform: translateX(-50%);
  transform-origin: 0%;
  padding: 1em;
  max-width: 32em;
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: 0.25em;
  box-shadow: var(--shadow-lg);
  background-color: var(--color-bg);
  z-index: 5;
  transition: scale 0.3s;
}

.confirm__title {
  font-size: 1.25em;
  line-height: 1.6em;
  margin-bottom: 0.25em;
}

.confirm__description {
  color: var(--color-text-mute);
  margin-bottom: 1.5em;
}

.confirm::backdrop {
  background-color: var(--color-shadow);
}

.confirm__cta {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.confirm:has(.confirm__cta button:active) {
  scale: 0.9;
}

.confirm[open] {
  animation: fade-in 0.3s ease-out;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-2em);
  }

  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0em);
  }
}

@media (max-width: 500px) {
  .confirm {
    top: unset;
    max-width: unset;
    width: 100%;
    bottom: 0;
    left: 50%;
    padding: 2em 2em 4em 2em;
    border: none;
    border-top: 1px solid var(--color-border);
    border-radius: 1.5em 1.5em 0px 0px;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(2em);
    }

    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0em);
    }
  }
}
</style>
