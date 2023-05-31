<script>
import { ref, onMounted } from "vue";
import { useField, useForm } from "vee-validate";
import { v4 as uuidv4 } from "uuid";

import { set, get, ref as REF, child } from "firebase/database";
import { database } from "../firebase";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default {
  setup() {
    const { handleSubmit, handleReset } = useForm({
      validationSchema: {
        name(value) {
          if (value?.length >= 2) return true;

          return "Name needs to be at least 2 characters.";
        },
        email(value) {
          if (/^[a-z.0-9.]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;

          return "Must be a valid e-mail.";
        },
        password(value) {
          if (value?.length > 9 && /[0-9-]+/.test(value)) return true;

          return "Password needs to be at least 9 digits.";
        },
        passwordConfirm(value) {
          if (
            value?.length > 9 &&
            /[0-9-]+/.test(value) &&
            password.value.value == value
          ) {
            return true;
          } else if (value?.length < 9) {
            return "Password needs to be at least 9 digits.";
          } else if (password.value.value != value) {
            return "Password and password confirm must be the same.";
          }
        },
        checkbox(value) {
          if (value === "1") return true;

          return "Must be checked.";
        },
      },
    });
    const name = useField("name");
    const email = useField("email");
    const password = useField("password");
    const passwordConfirm = useField("passwordConfirm");
    const checkbox = useField("checkbox");

    const users = ref([]);

    const dbRef = REF(database);

    onMounted(() => {
      get(child(dbRef, `/users`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            users.value = snapshot.val();
          } else {
            console.log("No data available");
          }
        })
        .then(() => {
          console.log(users.value);
        });
    });

    //   (values) => {
    //   //alert(JSON.stringify(values, null, 2))
    // }

    const submit = handleSubmit(() => {
      const userId = uuidv4();

      const newUser = {
        uid: userId,
        chatId: Math.floor(100000000000 + Math.random() * 900000000000),
        username: name.value.value,
        email: email.value.value,
        password: password.value.value,
        avatar: `https://xsgames.co/randomusers/assets/avatars/pixel/${
          users.value.length + 1
        }.jpg`,
        contacts: [],
        isAdmin: false,
        isLogin: true,
      };

      createUserWithEmailAndPassword(auth, email.value.value, password.value.value)
        .then(() => {
          // Signed in
          const user = newUser;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    });

    return {
      name,
      password,
      passwordConfirm,
      email,
      checkbox,
      submit,
      handleReset,
    };
  },
};
</script>

<template>
  <div class="signUp">
    <v-card
      color="grey-darken-1"
      class="userRegister mx-auto"
      max-width="344"
      title="Sign Up"
    >
      <form @submit.prevent="submit" class="mx-5 my-5">
        <v-text-field
          v-model="name.value.value"
          :counter="10"
          :error-messages="name.errorMessage.value"
          label="Name"
        ></v-text-field>

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
        ></v-text-field>

        <v-text-field
          v-model="passwordConfirm.value.value"
          :counter="7"
          :error-messages="passwordConfirm.errorMessage.value"
          label="Confirm Password"
        ></v-text-field>

        <v-checkbox
          v-model="checkbox.value.value"
          :error-messages="checkbox.errorMessage.value"
          value="1"
          label="I am not a bot"
          type="checkbox"
        ></v-checkbox>

        <v-btn class="me-4" type="submit"> Signup </v-btn>

        <v-btn @click="handleReset"> Clear Form </v-btn>
      </form>
    </v-card>
  </div>
</template>
