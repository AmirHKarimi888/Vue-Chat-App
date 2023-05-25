<script setup>
import { ref } from "vue";
import { loggedUser, logOut } from "../auth";

import EditProfileView from "./EditProfileView.vue";
import FindUsersView from "./FindUsersView.vue";

const editProfileViewView = ref(false);
const findUsersViewView = ref(false);
</script>

<template>
  <v-navigation-drawer color="grey-darken-4">
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
      </v-list>
    </div>

    <div v-else>
      <div class="text-center mt-15">
        <v-btn color="primary" append-icon="mdi-account-circle">
          Sign In
          <template v-slot:append>
            <v-icon color="white"></v-icon>
          </template>
        </v-btn>
      </div>
    </div>

    <template v-slot:append>
      <div v-if="loggedUser.isLogin" class="pa-2">
        <v-btn @click="logOut" class="bg-orange" block> Logout </v-btn>
      </div>
      <!-- <div class="pa-2">
            <v-btn class="bg-red" block> Delete Account </v-btn>
          </div> -->
    </template>
  </v-navigation-drawer>
</template>
