<script setup>
import { ref } from "vue";

import { loggedUser } from "../auth";

const drawer = ref(false);
const contactsDrawer = ref(false);
</script>

<template>
  <header class="header">
    <v-app-bar color="grey-darken-4" density="compact">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>Chat App</v-app-bar-title>

      <template v-slot:append>
        <v-avatar @click.stop="contactsDrawer = !contactsDrawer">
            <v-img :src="loggedUser.avatar" alt="Avatar"></v-img>
        </v-avatar>
      </template>
    </v-app-bar>

  </header>
</template>
