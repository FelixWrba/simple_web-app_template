import { defineStore } from "pinia";
import { type Section } from "@/lib/types";
import { watch, ref, type WritableComputedRef } from "vue";
import { useI18n } from "vue-i18n";

export const usePreferenceStore = defineStore('preference', () => {
  const { locale } = useI18n();

  const sections: Section[] = [
    {
      title: 'presentation',
      options: [
        { label: 'mode', style: 'dropdown', content: ['auto', 'light', 'dark'] },
        { label: 'high', style: 'switch' },
      ]
    },
    {
      title: 'contents',
      options: [
        { label: 'language', style: 'dropdown', content: ['detect', 'de', 'en'] },
      ]
    }
  ];

  const storedPreferences = localStorage.getItem('preferences');
  const preferences = ref(
    storedPreferences ? JSON.parse(storedPreferences) : createPreferences(sections)
  );

  watch(preferences, newPreferences =>updateStoredPreferences(newPreferences, locale), { deep: true });

  return { preferences, sections };
});

function createPreferences(sections: Section[]): object {
  const preferences: any = {};

  for (const section of sections) {
    preferences[section.title] = {};

    for (const option of section.options) {
      preferences[section.title][option.label] = option.style === 'switch' ? false : option.content[0];
    }
  }

  return preferences;
}

function updateStoredPreferences(newPreferences: any, locale: WritableComputedRef<string, string>): void {
  localStorage.setItem('preferences', JSON.stringify(newPreferences));

  const newLocale = newPreferences.contents.language;
  localStorage.setItem('locale', newLocale);
  locale.value = (newLocale === 'detect' ? navigator.language.split('-')[0] : newLocale);
}
