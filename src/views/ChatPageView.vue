<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";


import { set, get, ref as REF, child } from "firebase/database";
import { database } from "../firebase";

import { drawer, contactsDrawer, contactProfileDrawer } from "../script/index";
import SideBarView from "../components/SidebarView.vue";
import ContactsBarView from "../components/ContactsBarView.vue";



const x = ref(false);

const newMessage = ref("");

const addNewMessage = () => {
  messages.value.push(
    ...[
      {
        message: newMessage.value,
        date: new Date().getHours() + ":" + new Date().getMinutes(),
        author: loggedUser.value.chatId,
      },
    ]
  );
  set(REF(database, "/chats/" + unitedId + "/messages"), messages.value);
};
</script>

<template>
  <header class="header">
    <v-app-bar color="grey-darken-4" density="compact">
      <template v-slot:prepend>
        <v-app-bar-nav-icon
          v-if="loggedUser.isLogin"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title
        style="cursor: pointer"
        @click="contactProfileDrawer = !contactProfileDrawer"
      >
        <v-avatar>
          <v-img :src="secondPersonAvatar" alt="Avatar"></v-img>
        </v-avatar>
        {{ secondPersonUsername }}
      </v-app-bar-title>

      <template v-slot:append>
        <v-btn
          icon
          v-if="loggedUser.isLogin"
          @click.stop="contactsDrawer = !contactsDrawer"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
    </v-app-bar>

    <v-navigation-drawer color="grey-darken-4" v-model="drawer" temporary>
      <SideBarView />
    </v-navigation-drawer>

    <v-navigation-drawer
      color="grey-darken-4"
      v-model="contactsDrawer"
      temporary
      location="right"
    >
      <ContactsBarView />
    </v-navigation-drawer>

    <v-navigation-drawer
      color="grey-darken-4"
      v-model="contactProfileDrawer"
      temporary
      location="top"
    >
      <v-list-item class="bg-grey-darken-3 pt-5 pb-5">
        <v-avatar>
          <v-img :src="secondPersonAvatar" alt="Avatar"></v-img>
        </v-avatar>
        <h4 class="mt-4">{{ secondPersonUsername }}</h4>
        <h5 class="">{{ secondPersonEmail }}</h5>
        <h5></h5>
      </v-list-item>

      <v-list density="compact" nav>
        <v-list-item
          @click="addContact"
          prepend-icon="mdi-magnify"
          title="Add To Your Contacts"
          value=""
        ></v-list-item>

        <v-list-item
          @click="deleteContact"
          prepend-icon="mdi-door"
          title="Block This User"
          value=""
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
  </header>

  <div class="mx-9">
    <v-list style="max-height: 500px" class="overflow-y-auto mt-15">
      <template v-slot>
        <v-list-item v-for="message in messages" :key="message"
          min-height="100"
          :class="
          message.author === loggedUser.chatId
              ? 'bg-indigo-darken-3 mt-3 mx-auto me-5 rounded-xl'
              : 'bg-grey-darken-3 mt-3 rounded-xl' 
          "
          width="60%"
        >
          <v-list-tile>
            <v-list-tile-content>
              <br />
              {{ message.message }}
              <br /><br />
            </v-list-tile-content>
            <v-list-tile-footer> 6:08 PM </v-list-tile-footer>
          </v-list-tile>
        </v-list-item>
      </template>
    </v-list>

    <v-responsive class="mx-auto" max-width="344">
      <v-text-field
        label="First name"
        hide-details="auto"
        v-model="newMessage"
        @keyup.enter="addNewMessage"
      ></v-text-field>
    </v-responsive>
  </div>
</template>

<style>
.chatPosts {
  overflow-y: scroll;
}
.chatPost {
  width: 60%;
  min-height: 150px;
  display: grid;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}
.chatPost p {
  margin: 15px;
}
</style>
