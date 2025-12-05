import { defineStore } from "pinia";
import { type Section, type Option, type OptionValue } from "@/lib/types";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useConfirm } from "@/lib/useConfirm";

export const usePreferenceStore = defineStore('preference', () => {
  const { locale } = useI18n();
  const { confirm } = useConfirm();

  const sections: Section[] = [
    {
      title: 'presentation',
      options: [
        {
          label: 'mode', style: 'dropdown', content: ['auto', 'light', 'dark'], callback(event) {
            const value = event.target?.value || 'auto';
            localStorage.setItem('mode', value);

            document.body.classList.value = preferences.value.presentation.high ? 'high' : getPreferredColorScheme(value);
          }
        },
        {
          label: 'high', style: 'switch', callback(event) {
            const value = event.target?.checked || false;
            localStorage.setItem('high', value);

            document.body.classList.value = value ? 'high' : getPreferredColorScheme(preferences.value.presentation.mode);
          },
        },
        {
          label: 'font-size', style: 'slider', content: ['0.5', '1.5', '0.25'], callback(event) {
            const value = event.target?.value || 1;
            localStorage.setItem('font-size', value);

            document.body.style.setProperty('font-size', value + 'rem');
          },
        }
      ]
    },
    {
      title: 'contents',
      options: [
        {
          label: 'language', style: 'dropdown', content: ['detect', 'de', 'en'], callback(event) {
            const value = event.target?.value || 'detect';
            localStorage.setItem('language', value);

            locale.value = (value === 'detect' ? navigator.language.split('-')[0] : value);
          },
        },
      ]
    },
    {
      title: 'data-cache',
      options: [
        { label: 'reset-cache', style: 'button', content: ['fade'] },
        { label: 'reset-pref', style: 'button', content: ['fade'] },
        { label: 'show-data', style: 'button' },
        {
          label: 'reset-data', style: 'button', content: ['danger'], async callback() {
            const isPermitted = await confirm('Wollen Sie wirklich alle Daten löschen?', { description: 'Diese Aktion kann nicht rückgängig gemacht werden.' });

            if (isPermitted) {
              localStorage.clear();
              window.location.reload();
            }
          }
        },
      ],
    }
  ];

  const preferences = ref(createPreferences(sections));

  function init(): void {
    document.body.classList.value = preferences.value.presentation.high ? 'high' : getPreferredColorScheme(preferences.value.presentation.mode);

    document.body.style.setProperty('font-size', preferences.value.presentation['font-size'] + 'rem');
  }

  return { preferences, sections, init };
});

function createPreferences(sections: Section[]): any {
  const preferences: any = {};

  for (const section of sections) {
    preferences[section.title] = {};

    for (const option of section.options) {
      let value: OptionValue = false;

      const storedItem = localStorage.getItem(option.label);
      if (storedItem) {
        value = parseStored(storedItem);
      }
      else {
        value = getDefaultOptionValue(option);
      }

      preferences[section.title][option.label] = value;
    }
  }

  return preferences;
}

function getPreferredColorScheme(setting: 'light' | 'dark' | 'auto'): 'light' | 'dark' {
  if (setting === 'auto') {
    return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  }
  return setting;
}

function parseStored(item: string): OptionValue {
  const number = parseFloat(item);

  if (!isNaN(number)) return number;

  if (item === 'true') return true;
  if (item === 'false') return false;

  return item;
}

function getDefaultOptionValue(option: Option) {
  let value: OptionValue = false;

  switch (option.style) {
    case "switch":
      value = false;
      break;
    case "dropdown":
      value = option.content![0] ?? '';
      break;
    case "slider":
      value = (Number(option.content![0]) + Number(option.content![1])) / 2;
      break;
    default:
      value = '';
  }

  return value;
}
