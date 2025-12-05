import { ref } from "vue";

interface DialogOptions {
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  destructive: boolean;
}

const dialogOptions = ref<DialogOptions>({
  title: '',
  description: '',
  confirmText: 'cta.confirm',
  cancelText: 'cta.cancel',
  destructive: true,
});

const isDialogOpen = ref(false);

let dialogResolver: (value: boolean) => void;

export function useConfirm() {

  function confirm(title: string, options: Partial<Omit<DialogOptions, 'title'>>) {
    dialogOptions.value = {
      title,
      description: options.description || '',
      confirmText: options.confirmText || 'cta.confirm',
      cancelText: options.cancelText || 'cta.cancel',
      destructive: options.destructive || false
    };
    isDialogOpen.value = true;

    return new Promise<boolean>(resolve => dialogResolver = resolve);
  }

  function confirmTrue() {
    dialogResolver(true);
    isDialogOpen.value = false;
  }

  function confirmFalse() {
    dialogResolver(false);
    isDialogOpen.value = false;
  }

  return {
    confirm,
    confirmTrue,
    confirmFalse,
    isDialogOpen,
    dialogOptions,
  }
}
