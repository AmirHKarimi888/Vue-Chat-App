<script setup></script>

<template>
  <v-sheet
    class="bg-grey-darken-3 d-flex align-center justify-center flex-wrap text-center mx-auto"
    elevation="4"
    rounded
    width="70%"
    style="margin-top: 240px"
  >
    <div class="mx-5 my-5">
      <h2 class="font-weight-black text-orange">Welcome!</h2>

      <div class="text-h5 font-weight-medium mb-2">
        You are signed in to my chat app.
      </div>

      <p class="text-body-2 mb-4">
        Find friend through the left side hide bar,<br />
        then your new conversation will be added to the list of your
        conversation in the right side hide bar.
      </p>

      <v-btn variant="text" color="orange">Go to Login</v-btn>
    </div>
  </v-sheet>
</template>
