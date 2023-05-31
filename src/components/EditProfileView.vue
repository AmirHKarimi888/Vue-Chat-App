<script>
import { url } from "../api";
import { loggedUser, accessId } from "../auth";

import { set, get, ref as REF, child } from "firebase/database";
import { database } from "../firebase";

export default {
  data: () => ({
    form: false,
    username: loggedUser.value.username,
    email: loggedUser.value.email,
    password: loggedUser.value.password,
    loading: false,
    user: {},
  }),

  methods: {
    onSubmit() {
      set(REF(database, "/users/" + accessId.value), {
        id: loggedUser.value.id,
        chatId: loggedUser.value.chatId,
        username: this.username,
        email: this.email,
        password: this.password,
        avatar: loggedUser.value.avatar,
        isAdmin: loggedUser.value.isAdmin,
        isLogin: loggedUser.value.isLogin,
      }).then(() => {
        window.location.reload();
      });
    },
    required(v) {
      return !!v || "Field is required";
    },
  },
};
</script>

<template>
  <v-card color="grey-darken-2" class="mx-auto px-6 py-8" max-width="344">
    <v-form v-model="form" @submit.prevent="onSubmit">
      <v-text-field
        v-model="username"
        :readonly="loading"
        :rules="[required]"
        class="mb-2"
        clearable
        label="Username"
      ></v-text-field>

      <v-text-field
        v-model="email"
        :readonly="loading"
        :rules="[required]"
        class="mb-2"
        clearable
        label="Email"
      ></v-text-field>

      <v-text-field
        v-model="password"
        :readonly="loading"
        :rules="[required]"
        clearable
        label="Password"
        placeholder="Enter your password"
      ></v-text-field>

      <br />

      <v-btn
        block
        color="success"
        size="large"
        type="submit"
        variant="elevated"
      >
        Edit Done
      </v-btn>
    </v-form>
  </v-card>
</template>
