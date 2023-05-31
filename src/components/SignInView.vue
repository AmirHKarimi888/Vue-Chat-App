<script>
import { ref } from "vue";
import { useField, useForm } from "vee-validate";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default {
  setup() {
    const { handleSubmit, handleReset } = useForm({
      validationSchema: {
        email(value) {
          if (/^[a-z.0-9.]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;
          return "Must be a valid e-mail.";
        },
        password(value) {
          if (value?.length > 9 && /[0-9-]+/.test(value)) return true;

          return "Password needs to be at least 9 digits.";
        },
        checkbox(value) {
          if (value === "1") return true;

          return "Must be checked.";
        },
      },
    });
    const email = useField("email");
    const password = useField("password");
    const checkbox = useField("checkbox");

    const submit = handleSubmit(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const uid = user.uid;
          console.log(user);
          // ...
        } else {
          // User is signed out
          // ...
        }
      });
    });

    return {
      password,
      email,
      checkbox,
      submit,
      handleReset,
    };
  },
};
</script>

<template>
  <div class="signIn">
    <v-card
      color="grey-darken-1"
      class="userRegister mx-auto"
      max-width="344"
      title="Sign In"
    >
      <form @submit.prevent="submit" class="mx-5 my-5">
        <v-text-field
          v-model="email.value.value"
          :error-messages="email.errorMessage.value"
          label="E-mail"
        ></v-text-field>

        <v-text-field
          v-model="password.value.value"
          :counter="7"
          :error-messages="password.errorMessage.value"
          label="Password"
          type="password"
        ></v-text-field>

        <v-checkbox
          v-model="checkbox.value.value"
          :error-messages="checkbox.errorMessage.value"
          value="1"
          label="I am not a bot"
          type="checkbox"
        ></v-checkbox>

        <v-btn class="me-4" type="submit"> Login </v-btn>

        <v-btn @click="handleReset"> Clear Form </v-btn>

      </form>
    </v-card>
  </div>
</template>
