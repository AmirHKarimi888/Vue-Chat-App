<script setup>
import { ref } from "vue";

import { loggedUser, logOut } from "../auth"

import EditProfileView from "../components/EditProfileView.vue";
const editProfileViewView = ref(false);

setTimeout(() => {
  
}, 1000)

const drawer = ref(null);
const isLogin = ref(false);
</script>

<template>
  <header class="header">
    <v-app-bar color="grey-darken-4" density="compact">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>Chat App</v-app-bar-title>

      <template v-slot:append>
        
      </template>
    </v-app-bar>

    <v-navigation-drawer color="grey-darken-4" v-model="drawer" temporary>
      <div v-if="loggedUser.isLogin">
        <v-list-item class="bg-grey-darken-3 pt-5 pb-5">
          <v-avatar>
            <v-img
              :src="loggedUser.avatar"
              alt="Avatar"
            ></v-img>
          </v-avatar>
          <h4 class="mt-4">{{ loggedUser.username }}</h4>
          <h5 class="">{{ loggedUser.email }}</h5>
          <h5></h5>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item
            @click="() => editProfileViewView = !editProfileViewView"
            prepend-icon="mdi-account"
            title="Edit Profile"
            value="edit"
          ></v-list-item>

          <v-list-item v-if="editProfileViewView">
            <EditProfileView />
          </v-list-item>

          <v-list-item
            prepend-icon="mdi-forum"
            title="About"
            value="about"
          ></v-list-item>
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
  </header>
</template>
