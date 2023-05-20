<script setup>
import SignUpView from '../components/SignUpView.vue';
import { loggedUser } from '../auth';
</script>

<template>
  <main class="main">
    <div class="container">
      <div v-if="!loggedUser.isLogin">
        <SignUpView />
      </div>

      <div v-else class="mt-15">
        Is logged
      </div>
    </div>
  </main>
</template>
