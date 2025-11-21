<template>
  <transition name="search-fade">
    <div class="search__container" v-show="isOpen">
      <div class="searchbar">
        <input type="search" id="searchbar" :placeholder="t('nav.search-placeholder')" autocomplete="off" v-model="search"  :aria-label="t('nav.search-placeholder')">
        <label class="icon-btn" for="searchbar">
          <MagnifyingGlassIcon class="icon" />
        </label>
      </div>
      <ol class="search__results">
        <transition-group name="search-list">
          <li v-for="result in searchResults" :key="result.name">
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
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { MagnifyingGlassIcon, FaceFrownIcon } from '@heroicons/vue/24/outline';
import { useRouter } from 'vue-router';

const { t } = useI18n();
const { isOpen } = defineProps<{ isOpen: boolean }>();

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
  right: 3em;
  transform-origin: 100% 1.5em;
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

.search__results {
  list-style-type: none;
  margin-top: 1em;
  background-color: var(--color-bg);
  border-radius: 0.5em;
  box-shadow: var(--shadow-md);
  overflow: auto;
  max-height: 80vh;
  max-width: 50vw;
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

.searchbar {
  display: flex;
  align-items: center;
  background-color: var(--color-bg);
  box-shadow: var(--shadow-md);
  border-radius: 0.5em;
  overflow: hidden;
}

.searchbar input {
  flex: 1;
  padding: 0.5em;
  border: none;
  outline: none;
}

@media(max-width: 550px) {
  .search__results {
    max-width: 100%;
  }

  .search__container {
    left: 3em;
  }
}

.searchbar:has(input:focus-visible) {
  outline: 2px solid var(--color-border-strong);
}

.search-fade-enter-from,
.search-fade-leave-to {
  scale: 0;
  opacity: 0;
}

.search-fade-enter-active,
.search-fade-leave-active,
.search-list-enter-active,
.search-list-leave-active {
  transition: all 0.3s;
}

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
