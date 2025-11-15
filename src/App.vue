<template>
  <Toaster />

  <Navbar :links />

  <RouterView />

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

const links = [
  { name: 'home', link: '/', icon: HomeIcon },
  { name: 'about', link: '/about', icon: ChatBubbleLeftEllipsisIcon },
  { name: 'preferences', link: '/preferences', icon: Cog6ToothIcon }
];

const preferenceStore = usePreferenceStore();

preferenceStore.init();
</script>
