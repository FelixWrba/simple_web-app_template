<template>
  <!-- HEADER -->
  <header :class="isScrolled ? 'shadow' : ''">
    <!-- BACK BUTTON -->
    <router-link :to="route.path.split('/').slice(0, -1).join('/')" v-if="isBackBar" class="icon-btn">
      <ArrowLeftIcon class="icon" />
    </router-link>
    <!-- MENU BUTTON -->
    <button @click="isNavbarOpen = true" :title="t('nav.open-label')" class="icon-btn" :aria-label="t('nav.open-label')"
      v-else>
      <Bars3Icon class="icon" />
    </button>
    <!-- APP LOGO -->
    <span>{{ 'APP_NAME' }}</span>
    <!-- SEARCH BUTTON -->
    <button class="icon-btn" @click="isSearchBarOpen = !isSearchBarOpen" :title="t('nav.search-label')"
      :aria-label="t('nav.search-label')">
      <MagnifyingGlassIcon class="icon" />
    </button>
    <Search :isOpen="isSearchBarOpen" @close="isSearchBarOpen = false" />
  </header>

  <!-- NAVIGATION -->
  <nav :class="isNavbarOpen ? 'open' : ''" @touchstart="setLastTouch" @touchend="applyTouch">
    <!-- CLOSE BUTTON -->
    <button class="icon-btn close-icon" @click="isNavbarOpen = false" :title="t('nav.close-label')"
      :aria-label="t('nav.close-label')">
      <XMarkIcon class="icon" />
    </button>
    <!-- LINKS -->
    <ul role="menubar" @click="isNavbarOpen = false">
      <li v-for="link in links" :key="link.link" role="none">
        <router-link :to="link.link" role="menuitem" :class="route.name === link.name ? 'highlight' : ''">
          <component :is="link.icon" :class="`icon fill ${route.name === link.name ? 'highlight' : ''}`" />
          <span>{{ t(`${i18nPrefix}.${link.name}`) }}</span>
        </router-link>
      </li>
    </ul>
    <!-- COPYRIGHT -->
    <p class="navbar-copyright">&copy;2025-{{ new Date().getFullYear() }} Felix Wrba. {{ t('nav.copy-text') }}</p>
  </nav>

  <!-- NAVIGATION SHADOW -->
  <button :class="`navbar-shadow ${isNavbarOpen ? 'open' : ''}`" @click="isNavbarOpen = false"
    :aria-label="t('nav.close-label')"></button>
</template>

<script lang="ts" setup>
import { ref, type FunctionalComponent, computed } from 'vue';
import { Bars3Icon, MagnifyingGlassIcon, XMarkIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import Search from './Search.vue';

const { t } = useI18n();
const route = useRoute();

const { links, i18nPrefix = 'links' } = defineProps<{
  links: Link[];
  i18nPrefix?: string
}>();

interface Link {
  name: string,
  link: string,
  icon: FunctionalComponent,
}

const isNavbarOpen = ref(false);
const isScrolled = ref(false);
const isBackBar = computed(() => (route.path.match(/\//g)?.length || 1) > 1);
const isSearchBarOpen = ref(false);

window.addEventListener('scroll', () => {
  isScrolled.value = window.pageYOffset !== 0;
});

const lastTouchPosition = ref({ x: 0, y: 0 });

function setLastTouch(event: TouchEvent) {
  lastTouchPosition.value = { x: event.touches[0]?.clientX || 0, y: event.touches[0]?.clientY || 0 };
}

function applyTouch(event: TouchEvent) {
  const distanceX = (event.changedTouches[0]?.clientX || 0) - lastTouchPosition.value.x;
  const distanceY = (event.changedTouches[0]?.clientY || 0) - lastTouchPosition.value.y;

  if (distanceX < -50 && Math.abs(distanceY) * -3 > distanceX) {
    isNavbarOpen.value = false;
  }
}
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
  padding: 0.75em 0.5em;
  font-size: 1.125em;
  transition: all 0.3s;
}

header.shadow {
  box-shadow: var(--shadow-md);
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

body:has(nav.open) {
  overflow: hidden;
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
