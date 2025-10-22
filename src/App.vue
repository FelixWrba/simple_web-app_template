<template>
  <Toaster />

  <Navbar />

  <RouterView />

  <Footer />
</template>

<script setup lang="ts">
import Toaster from './components/Toaster.vue';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
</script>
