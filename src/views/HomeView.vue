<script setup>
import RegistrationFormsView from "../components/RegistrationFormsView.vue";
import { loggedUser } from "../auth";
</script>

<template>
  <main class="main">
    <div class="container">
      <div v-if="!loggedUser.isLogin">
        <RegistrationFormsView />
      </div>

      <div v-else class="mt-15">Is logged</div>
    </div>
  </main>
</template>
