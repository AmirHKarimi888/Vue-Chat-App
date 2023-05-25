<script setup>
import { ref } from "vue";
import { loggedUser, logOut } from "../auth";

import EditProfileView from "./EditProfileView.vue";
import FindUsersView from "./FindUsersView.vue";

const editProfileViewView = ref(false);
const findUsersViewView = ref(false);
</script>

<template>
  <div v-if="loggedUser.isLogin">
    <v-list-item class="bg-grey-darken-3 pt-5 pb-5">
      <v-avatar>
        <v-img :src="loggedUser.avatar" alt="Avatar"></v-img>
      </v-avatar>
      <h4 class="mt-4">{{ loggedUser.username }}</h4>
      <h5 class="">{{ loggedUser.email }}</h5>
      <h5></h5>
    </v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        @click="() => (editProfileViewView = !editProfileViewView)"
        prepend-icon="mdi-account"
        title="Edit Profile"
        value="edit"
      ></v-list-item>

      <v-list-item v-if="editProfileViewView">
        <EditProfileView />
      </v-list-item>

      <v-list-item
        @click="() => (findUsersViewView = !findUsersViewView)"
        prepend-icon="mdi-magnify"
        title="Find Users"
        value="find"
      ></v-list-item>

      <v-list-item v-if="findUsersViewView">
        <FindUsersView />
      </v-list-item>

      <v-list-item
      @click="logOut"
        prepend-icon="mdi-door"
        title="Sign Out"
        value="signout"
      ></v-list-item>
    </v-list>
  </div>

</template>
