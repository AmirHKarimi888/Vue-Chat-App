<script setup>
import { ref } from "vue";
import { Action } from "../httpService";
import { url } from "../api";

const showUsers = ref(false);
const loaded = ref(false);
const loading = ref(false);

const credential = ref("");
const users = ref([]);

const onClick = () => {
  Action.get(url + "/users", (response) => (users.value = response.data)).then(
    () => {
      users.value = users.value.filter((user) => {
        if (
          user.username.includes(credential.value) ||
          user.username
            .toLowerCase()
            .includes(credential.value.toLowerCase()) ||
          user.username
            .toUpperCase()
            .includes(credential.value.toUpperCase()) ||
          user.email.includes(credential.value)
        ) {
          return user;
        }
      });
    }
  );
  loading.value = true;

  setTimeout(() => {
    loading.value = false;
    loaded.value = true;
    showUsers.value = true;
  }, 1000);
};
</script>

<template>
  <div>
    <v-text-field
      v-model="credential"
      :loading="loading"
      density="compact"
      variant="solo"
      label="Find Users"
      append-inner-icon="mdi-magnify"
      single-line
      hide-details
      @click:append-inner="onClick"
    ></v-text-field>

    <v-card
      v-if="showUsers"
      color="grey-darken-2"
      class="mx-auto px-1 py-1 mt-1"
      max-width="344"
    >
      <v-list density="compact" nav>
        <v-list-item v-for="user in users" :key="user.username" value="edit">
          <v-avatar>
            <v-img :src="user.avatar"></v-img>
          </v-avatar>
          <v-title class="ms-12">{{ user.username }}</v-title>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>
