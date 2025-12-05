import { defineStore } from 'pinia';
import { ref } from 'vue';

type ToastStatus = 'success' | 'warning' | 'error' | 'info';
type ToastId = number;

interface Toast {
  text: string;
  status: ToastStatus;
  id: ToastId;
  preserved: boolean;
}

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<Toast[]>([]);
  const toastIDs: { [_: ToastId]: number } = {};

  function push(text: string, status: ToastStatus) {
    const id = Math.random() * 1000;

    toasts.value.push({ text, status, id, preserved: false });

    toastIDs[id] = setTimeout(() => close(id), 3000);
  }

  function close(id: ToastId) {
    toasts.value = toasts.value.filter(t => t.id !== id);
    delete toastIDs[id];
  }

  function preserve(id: ToastId) {
    toasts.value[toasts.value.findIndex(t => t.id === id)]!.preserved = true;

    clearTimeout(toastIDs[id]);

    toastIDs[id] = setTimeout(() => close(id), 15000);
  }

  return { toasts, push, close, preserve };
});
