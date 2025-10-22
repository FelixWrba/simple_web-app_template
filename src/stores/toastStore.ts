import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

type ToastStatus = 'success' | 'warning' | 'error' | 'info';

interface Toast {
  text: string;
  status: ToastStatus;
  id: number;
}

export const useToastStore = defineStore('toast', () => {
  const toasts: Ref<Toast[]> = ref([]);

  function push(text: string, status: ToastStatus) {
    const id = Math.random() * 100;

    toasts.value.push({ text, status, id });

    setTimeout(() => toasts.value = toasts.value.filter(t => t.id !== id), 3000);
  }

  return { toasts, push };
});
