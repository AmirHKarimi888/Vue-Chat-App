<script setup>
import { ref } from "vue";
import { loggedUser } from "../auth";
import { useRouter } from "vue-router";

import { get, ref as REF, child } from "firebase/database";
import { database } from "../firebase";

const showUsers = ref(false);
const loaded = ref(false);
const loading = ref(false);

const credential = ref("");

const users = ref([]);
const dbRef = REF(database);

const onClick = () => {
  get(child(dbRef, `/users/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        users.value = snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .then(() => {
      users.value = users.value.filter((user) => {
        if (user.id !== loggedUser.value.id && user.id !== 0) {
          return user;
        }
      });

      if (credential.value === "") {
        users.value = [];
      } else {
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
    });

  loading.value = true;

  setTimeout(() => {
    loading.value = false;
    loaded.value = true;
    showUsers.value = true;
  }, 1000);
};

const router = useRouter();

const goToPath = (chatId) => {
  router.push({ name: "chat-page", params: { chatId: chatId } }).then(() => {
    setTimeout(() => {
      window.location.reload();
    }, 100);
  });
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
      @keyup.enter="onClick"
    ></v-text-field>

    <v-card
      v-if="showUsers"
      color="grey-darken-2"
      class="mx-auto px-1 py-1 mt-1"
      max-width="344"
    >
      <v-list density="compact" nav>
        <v-list-item v-for="user in users" :key="user.username" value="edit">
          <a
            @click="() => goToPath(user.chatId)"
            class="text-decoration-none text-white"
          >
            <v-avatar>
              <v-img :src="user.avatar"></v-img>
            </v-avatar>
            <a class="ms-12">{{ user.username }}</a>
          </a>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>
