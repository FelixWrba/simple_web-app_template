<template>
  <transition name="search-fade">
    <div class="search__container" v-show="isOpen">
      <!-- INPUT -->
      <div class="searchbar">
        <label class="icon-btn" for="searchbar">
          <MagnifyingGlassIcon class="icon" />
        </label>
        <input type="search" id="searchbar" :placeholder="t('nav.search-placeholder')" autocomplete="off"
          v-model="search" :aria-label="t('nav.search-placeholder')">
        <button class="icon-btn" @click="emit('close')">
          <XMarkIcon class="icon" />
        </button>
      </div>
      <!-- RESULTS -->
      <ol class="search__results">
        <transition-group name="search-list">
          <li v-for="result in searchResults" :key="result.name" @click="emit('close')">
            <router-link :to="result.link" tabindex="0">{{ t('links.' + result.name) }}</router-link>
          </li>
          <li v-show="searchResults.length === 0" key="error-no-results" class="search__error">
            <FaceFrownIcon class="icon" />
            <p>No results found for <code>{{ search }}</code></p>
          </li>
        </transition-group>
      </ol>
    </div>
  </transition>
  <!-- SHADOW -->
  <transition name="shadow-fade">
    <div class="search__shadow" @click="emit('close')" v-if="isOpen"></div>
  </transition>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { MagnifyingGlassIcon, XMarkIcon, FaceFrownIcon } from '@heroicons/vue/24/outline';
import { useRouter } from 'vue-router';

const { t } = useI18n();
const { isOpen } = defineProps<{ isOpen: boolean }>();
const emit = defineEmits<{ close: [] }>();

interface SearchResult {
  name: string;
  link: string;
}

const router = useRouter();

const routes: SearchResult[] = router
  .getRoutes()
  .map(route => { return { name: route.name!.toString(), link: route.path } });

const search = ref('');
const searchResults = computed(() => routes.filter(
  route => sanitizeInput(t('links.' + route.name)).includes(sanitizeInput(search.value)))
);

function sanitizeInput(input: string): string {
  return input.trim().toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
</script>

<style>
.search__container {
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  max-width: 80vw;
  max-height: 80vh;
  z-index: 10;
}

.searchbar {
  display: flex;
  align-items: center;
  background-color: var(--color-bg);
  overflow: hidden;
  border-radius: 0.5em 0.5em 0 0;
  box-shadow: var(--shadow-md);
  padding: 0.75em;
}

.searchbar input {
  flex: 1;
  border: none;
  outline: none;
  background-color: transparent;
  min-width: 2em;
}

.searchbar input::-webkit-search-cancel-button {
  display: none;
}

.searchbar:has(input:focus-visible) {
  outline: 2px solid var(--color-border-strong);
}

.search__results {
  list-style-type: none;
  margin-top: 0.5em;
  background-color: var(--color-bg);
  border-radius: 0 0 0.5em 0.5em;
  box-shadow: var(--shadow-md);
  overflow: auto;
  max-height: 80vh;
}

.search__results a {
  display: block;
  padding: 0.25em 0.5em;
  border-bottom: 1px solid var(--color-border);
}

.search__results a:hover {
  background-color: var(--color-bg-mute);
}

.search__results a:focus {
  background-color: var(--color-bg-mute);
  outline: 1px solid var(--color-border);
  outline-offset: -1px;
}

.search__error {
  display: flex;
  flex-direction: column;
  gap: 0.25em;
  align-items: center;
  padding: 0.5em;
}

.search__error p {
  margin: 0;
}

.search__error svg {
  height: 2em;
}

.search__shadow {
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--color-shadow);
  height: 100vh;
  width: 100vw;
  z-index: 9;
}

@media(max-width: 550px) {
  .search__results {
    max-width: 100%;
  }

  .search__container {
    top: 0;
    left: 0;
    right: 0;
    max-width: 100%;
    width: 100%;
  }

  .searchbar {
    border-radius: 0em;
  }

  .search__results {
    border-top: 2px solid var(--color-border);
    margin-top: 0em;
  }
}

/* CONTAINER */
.search-fade-enter-from,
.search-fade-leave-to {
  scale: 0;
  opacity: 0;
  transform-origin: 100% 0%;
}

.shadow-fade-enter-from,
.shadow-fade-leave-to {
  opacity: 0;
}

.search-fade-enter-active,
.search-fade-leave-active,
.search-list-enter-active,
.search-list-leave-active,
.shadow-fade-enter-active,
.shadow-fade-leave-active {
  transition: all 0.3s;
}

/* LIST */
.search-list-enter-from,
.search-list-leave-to {
  opacity: 0;
  margin-top: -2.15em;
}

.search-list-enter-from:has(svg),
.search-list-leave-to:has(svg) {
  margin-top: -4.75em;
}
</style>
