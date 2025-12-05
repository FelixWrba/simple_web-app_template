<template>
  <Toaster />

  <Navbar :links />

  <router-view v-slot="{ Component }">
    <transition :name="transistionName">
      <component :is="Component" />
    </transition>
  </router-view>

  <Confirm />

  <Footer />
</template>

<script setup lang="ts">
import Toaster from './components/Toaster.vue';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import { HomeIcon, ChatBubbleLeftEllipsisIcon, Cog6ToothIcon } from '@heroicons/vue/24/solid';
import { usePreferenceStore } from './stores/preferenceStore';
import Confirm from './components/Confirm.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const links = [
  { name: 'home', link: '/', icon: HomeIcon },
  { name: 'about', link: '/about', icon: ChatBubbleLeftEllipsisIcon },
  { name: 'preferences', link: '/preferences', icon: Cog6ToothIcon }
];

const preferenceStore = usePreferenceStore();

preferenceStore.init();

const route = useRoute();

const transistionName = computed(() => {
  const toDepth = route.meta?.depth || 0;
  const fromDepth = route.meta?.prevDepth || 0;

  if (toDepth > fromDepth) return 'slide-left';
  if (toDepth < fromDepth) return 'slide-right';
  return 'fade';
});
</script>

<style>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease-out;
}

body:has(.slide-left-enter-active),
body:has(.slide-left-leave-active),
body:has(.slide-right-enter-active),
body:has(.slide-right-leave-active) {
  overflow-x: hidden;
}

.slide-left-enter-active,
.slide-right-leave-active {
  z-index: 2;
}

.slide-left-enter-to,
.slide-left-enter-from,
.slide-left-leave-to,
.slide-left-leave-from,
.slide-right-enter-to,
.slide-right-enter-from,
.slide-right-leave-to,
.slide-right-leave-from {
  position: absolute;
  width: 100vw;
  background-color: var(--color-bg);
}

.slide-left-enter-from,
.slide-right-leave-to {
  transform: translateX(100vw);
}

.slide-left-enter-to,
.slide-right-leave-from {
  transform: translateX(0vw);
}

.slide-left-leave-to,
.slide-right-enter-from {
  transform: translateX(-10vw);
  filter: brightness(0.5);
}

.slide-left-leave-from,
.slide-right-enter-to {
  transform: translateX(0);
}

@media (min-width: 1000px) {

  .slide-left-enter-from,
  .slide-left-enter-to,
  .slide-left-leave-from,
  .slide-left-leave-to,
  .slide-right-enter-from,
  .slide-right-enter-to,
  .slide-right-leave-from,
  .slide-right-leave-to {
    box-shadow: 0px 0px 0px calc((100vw - 1000px) / 2) var(--color-bg);
    left: calc((100vw - 1000px) / 2);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-right-enter-active,
  .slide-right-leave-active,
  .fade-enter-active,
  .fade-leave-active {
    transition: none;
  }
}
</style>
