<template>
  <dialog ref="confirm-modal" class="confirm" @close="confirmFalse">
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
import { useTemplateRef, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useConfirm } from '@/lib/useConfirm';

const { t } = useI18n();
const { confirmTrue, confirmFalse, dialogOptions, isDialogOpen } = useConfirm();

const confirmModalRef = useTemplateRef('confirm-modal');

watch(isDialogOpen, newIsOpen => {
  if (newIsOpen) {
    confirmModalRef.value?.showModal();
  }
  else {
    confirmModalRef.value?.classList.add('close');
    setTimeout(() => {
      confirmModalRef.value?.close();
      confirmModalRef.value?.classList.remove('close');
    }, 300);
  }
});
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
  transition: all 0.2s ease-in;
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

.confirm__cta {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.confirm::backdrop {
  background-color: var(--color-shadow);
  animation: fade-shadow 0.2s ease-out;
  transition: background-color 0.2s ease-in;
}

.confirm.close::backdrop {
  background-color: transparent;
}

body:has(.confirm[open]) {
  overflow: hidden;
}

.confirm[open]:not(.close) {
  animation: fade-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.confirm.close {
  opacity: 0;
  transform: translateX(-50%) translateY(-2em);
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(-2em);
  }

  100% {
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
    box-shadow: 0px 200px 0px var(--color-bg);
  }

  .confirm.close {
    opacity: 0;
    transform: translateX(-50%) translateY(100%);
    transform-origin: 100% 100%;
    scale: 1 0;
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
      transform: translateX(-50%) translateY(100%);
      scale: 1 0;
      transform-origin: 100% 100%;
    }

    100% {
      opacity: 1;
      transform: translateX(-50%) translateY(0px);
      transform-origin: center;
    }
  }
}

@keyframes fade-shadow {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
