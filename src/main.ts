import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import router from './router'

import de from '@/locales/de.json'
import en from '@/locales/en.json'

const app = createApp(App)
const pinia = createPinia()

const locale = localStorage.getItem('locale') || 'detect';

const i18n = createI18n({
  locale: locale === 'detect' ? navigator.language.split('-')[0] : locale,
  fallbackLocale: 'en',
  legacy: false,
  messages: { en, de }
});

app.use(router)
app.use(pinia)
app.use(i18n)

app.mount('#app')
