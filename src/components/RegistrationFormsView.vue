<script setup>
import { ref } from "vue";

import SignInView from "./SignInView.vue";
import SignUpView from "./SignUpView.vue";

const signUpViewView = ref(true);

const goToSignIn = () => {
  signUpViewView.value = !signUpViewView.value;
};
</script>

<template>
  <div>
    <div v-if="signUpViewView">
      <SignUpView />
      <p class="mt-5 text-center">
        Do you have an account?
        <v-btn @click="goToSignIn" color="grey-darken-3" size="x-small"
          >Sign In</v-btn
        >
      </p>
    </div>
    <div v-else>
      <SignInView />
      <p class="mt-5 text-center">
        You don't have any account?
        <v-btn @click="goToSignIn" color="grey-darken-3" size="x-small"
          >Sign Up</v-btn
        >
      </p>
    </div>
  </div>
</template>
