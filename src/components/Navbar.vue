<template>
  <header :class="isScrolled ? 'shadow' : ''">
    <button @click="isNavbarOpen = true" class="icon-btn" :title="t('nav.open-label')"
      :aria-label="t('nav.open-label')">
      <Bars3Icon class="icon" />
    </button>
    <span>APP_NAME</span>
    <button class="icon-btn">
      <MagnifyingGlassIcon class="icon" />
    </button>
  </header>

  <nav :class="isNavbarOpen ? 'open' : ''">
    <button class="icon-btn close-icon" @click="isNavbarOpen = false" :title="t('nav.close-label')"
      :aria-label="t('nav.close-label')">
      <XMarkIcon class="icon" />
    </button>

    <ul role="menubar" @click="isNavbarOpen = false">
      <li v-for="link in links" :key="link.link" role="none">
        <router-link :to="link.link" role="menuitem" :class="route.name === link.name ? 'highlight' : ''">
          <component :is="link.icon" :class="`icon fill ${route.name === link.name ? 'highlight' : ''}`" />
          <span>{{ t(`${i18nPrefix}.${link.name}`) }}</span>
        </router-link>
      </li>
    </ul>

    <p class="navbar-copyright">&copy;2025-{{ new Date().getFullYear() }} Felix Wrba. {{ t('nav.copy-text') }}</p>
  </nav>

  <button :class="`navbar-shadow ${isNavbarOpen ? 'open' : ''}`" @click="isNavbarOpen = false"
    :aria-label="t('nav.close-label')"></button>
</template>

<script lang="ts" setup>
import { ref, type FunctionalComponent } from 'vue';
import { Bars3Icon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

const { t } = useI18n();
const route = useRoute();

const { links, i18nPrefix = 'links' } = defineProps<{
  links: Link[];
  i18nPrefix?: string
}>();

const isNavbarOpen = ref(false);
const isScrolled = ref(false);

interface Link {
  name: string,
  link: string,
  icon: FunctionalComponent,
}

window.addEventListener('scroll', () => {
  isScrolled.value = window.pageYOffset !== 0;
});
</script>

<style>
header {
  z-index: 5;
  display: flex;
  position: sticky;
  left: 0;
  top: 0;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-bg-primary);
  color: var(--color-text);
  padding: 12px 8px;
  font-size: 1.125rem;
  transition: all 0.3s;
}

header.shadow {
  box-shadow: 0px -2px 20px var(--color-shadow);
}

nav {
  z-index: 11;
  position: fixed;
  border-right: 1px solid var(--color-border);
  border-radius: 0px 1.5em 1.5em 0px;
  width: 80vw;
  max-width: 380px;
  top: 0;
  left: -380px;
  height: 100vh;
  height: 100dvh;
  background-color: var(--color-bg);
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

nav.open {
  left: 0;
}

.navbar-shadow {
  border: none;
  z-index: 10;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  right: 100vw;
  background-color: transparent;
  transition: background-color 0.3s, right 0s 0.3s;
}

.navbar-shadow.open {
  background-color: var(--color-shadow);
  right: 0;
  transition: background-color 0.3s;
}

nav li a {
  padding: 6px 16px;
  display: flex;
  align-items: center;
  gap: 4px;
}

nav li a:hover {
  background-color: var(--color-bg-mute);
}

nav li a.highlight {
  background-color: var(--color-bg-primary);
  color: var(--color-primary-hover);
}

nav li span {
  flex: 1;
}

.navbar-copyright {
  color: var(--color-text-mute);
  padding: 0px 16px;
  font-size: 0.875rem;
  margin-top: 32px;
  flex: 1;
  display: flex;
  align-items: end;
  justify-content: center;
  text-align: center;
}

.close-icon {
  margin-left: auto;
  padding: 1rem;
}
</style>
