<template>
  <header :class="isScrolled ? 'shadow' : ''">
    <button @click="isNavbarOpen = true" class="icon-btn" title="Navigation öffnen" aria-label="Navigation öffnen">
      <Bars3Icon class="icon" />
    </button>
    <span>Meine App</span>
    <button class="icon-btn">
      <MagnifyingGlassIcon class="icon" />
    </button>
  </header>

  <nav :class="isNavbarOpen ? 'open' : ''">
    <button class="icon-btn close-icon" @click="isNavbarOpen = false" title="Navigation schließen"
      aria-label="Navigation schließen">
      <XMarkIcon class="icon" />
    </button>

    <ul role="menubar" @click="isNavbarOpen = false">
      <li v-for="link in links" :key="link.link" role="none">
        <router-link :to="link.link" role="menuitem">
          <component :is="link.icon" class="icon" />
          <span>{{ link.name }}</span>
        </router-link>
      </li>
    </ul>

    <p class="navbar-copyright">&copy;2025-{{ new Date().getFullYear() }} Felix Wrba. Alle Rechte vorbehalten.</p>
  </nav>

  <button :class="`navbar-shadow ${isNavbarOpen ? 'open' : ''}`" @click="isNavbarOpen = false"
    aria-label="Navigation schließen"></button>
</template>

<script lang="ts" setup>
import { ref, type FunctionalComponent } from 'vue';
import { Bars3Icon, MagnifyingGlassIcon, XMarkIcon, HomeIcon, InformationCircleIcon } from '@heroicons/vue/24/outline';

const isNavbarOpen = ref(false);
const isScrolled = ref(false);

interface Link {
  name: string,
  link: string,
  icon: FunctionalComponent,
}

const links: Link[] = [
  { name: 'Home', link: '/', icon: HomeIcon },
  { name: 'About', link: '/about', icon: InformationCircleIcon }
];

window.addEventListener('scroll', () => {
  isScrolled.value = window.pageYOffset !== 0;
})
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

nav ul {
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
}

.icon {
  height: 1.25rem;
}

.icon-btn {
  display: flex;
  justify-content: center;
  border: none;
  background-color: transparent;
  padding: 0.5rem;
  cursor: pointer;
  color: inherit;
  border-radius: 99px;
  transition: background-color 0.2s;
}

.icon-btn:hover {
  background-color: var(--color-border);
}

.close-icon {
  margin-left: auto;
  padding: 1rem;
}
</style>
