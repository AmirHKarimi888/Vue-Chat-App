<script setup>
import HeaderView from "../components/HeaderView.vue";
import RegistrationFormsView from "../components/RegistrationFormsView.vue";
import { loggedUser } from "../auth";

import DefaultHomeView from "../components/DefaultHomeView.vue";
</script>

<template>
  <HeaderView />
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
