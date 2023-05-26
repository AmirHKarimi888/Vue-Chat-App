<script setup>
import { loggedUser } from "../auth";

import RegistrationFormsView from "../components/RegistrationFormsView.vue";

import { drawer, contactsDrawer } from "../script/index";

import SideBarView from "../components/SidebarView.vue";
import ContactsBarView from "../components/ContactsBarView.vue";

import DefaultHomeView from "../components/DefaultHomeView.vue";
</script>

<template>
  <header class="header">
    <v-app-bar color="grey-darken-4" density="compact">
      <template v-slot:prepend>
        <v-app-bar-nav-icon
          v-if="loggedUser.isLogin"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>Chat App</v-app-bar-title>

      <template v-slot:append>
        <v-btn
          icon
          v-if="loggedUser.isLogin"
          @click.stop="contactsDrawer = !contactsDrawer"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
    </v-app-bar>

    <v-navigation-drawer color="grey-darken-4" v-model="drawer" temporary>
      <SideBarView />
    </v-navigation-drawer>

    <v-navigation-drawer
      color="grey-darken-4"
      v-model="contactsDrawer"
      temporary
      location="right"
    >
      <ContactsBarView />
    </v-navigation-drawer>
  </header>
  <main class="main">
    <div class="container">
      <div v-if="!loggedUser.isLogin">
        <RegistrationFormsView />
      </div>

      <div v-else class="mt-15">
        <DefaultHomeView />
      </div>
    </div>
  </main>
</template>
