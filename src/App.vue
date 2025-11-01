<template>
  <Toaster />

  <Navbar :links />

  <RouterView />

  <Footer />
</template>

<script setup lang="ts">
import Toaster from './components/Toaster.vue';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import { HomeIcon, InformationCircleIcon, Cog6ToothIcon } from '@heroicons/vue/24/outline';

const links = [
  { name: 'home', link: '/', icon: HomeIcon },
  { name: 'about', link: '/about', icon: InformationCircleIcon },
  { name: 'preferences', link: '/preferences', icon: Cog6ToothIcon }
];
</script>
