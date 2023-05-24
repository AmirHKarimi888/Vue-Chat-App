<script>
import { url } from "../api";
import { loggedUser, id } from "../auth";
import { Action } from "../httpService";

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
      Action.delete(url + "/users/" + id)
        .then(() => {
          Action.post(url + "/users", {
            id: loggedUser.value.id,
            username: this.username,
            email: this.email,
            password: this.password,
            avatar: loggedUser.value.avatar,
            contacts: loggedUser.value.contacts,
            isAdmin: loggedUser.value.isAdmin,
            isLogin: loggedUser.value.isLogin,
          });
        })
        .then(() => {
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
