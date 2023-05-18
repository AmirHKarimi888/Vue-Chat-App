<script setup>
import { RouterView } from 'vue-router'
import  HeaderView  from './components/HeaderView.vue'
</script>

<template>
  <v-app>
    <HeaderView />
    <RouterView />
  </v-app>
</template>

